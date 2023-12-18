import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import axios from 'axios';

type CompanyType = {
  id: string;
  name: string;
};

type AccountingProviderType = {
  id: string;
  name: string;
};

interface FormData {
  companyId: string;
  dateFounded: Date | null;
  amount: number;
  accontingProvider: string;
}

interface Balance {
  year: number;
  month: number;
  profitOrLoss: number;
  assetsValue: number;
}

interface ApprovalData {
  approvalStatus?: string;
  approvedAmount?: number;
  approvalScore?: number;
}

interface PreAssesmentData {
  score: number;
  age: number;
}

export interface LoanApplicationFormProps {
  companies: [{ id: string; name: string; founded: string }];
  accountingProviders: [{ id: string; name: string }];
}

const LoanApplicationForm = () => {
  const [formData, setFormData] = useState<FormData>({
    companyId: '',
    dateFounded: new Date(new Date().getTime() - 31556926000), // default is 1 years before today
    amount: 2000,
    accontingProvider: '',
  });
  const [companies, setCompanies] = useState([]);
  const [accountingProviders, setAccountingProviders] = useState([]);
  const [balanceSheet, setBalanceSheet] = useState([]);
  const [approvalData, setApprovalData] = useState<ApprovalData | null>(null);
  const [preAssesmentData, setPreAssesmentData] =
    useState<PreAssesmentData | null>(null);

  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        const response = await axios.get(
          //'http://gateway:3002/loan-applications/init'
          'http://localhost:3002/loan-applications/init'
        );
        const initialData = response.data;
        console.log(`initialData=${JSON.stringify(initialData)}`);
        console.log(`companies=${initialData.companies}`);
        console.log(`accountingProviders=${initialData.accountingProviders}`);
        setCompanies(initialData.data.companies);
        setAccountingProviders(initialData.data.accountingProviders);
      } catch (error: any) {
        console.error('Error fetching initial data:', error.message);
      }
    };

    fetchInitialData();
  }, []);

  useEffect(() => {
    const fetchBalanceSheet = async () => {
      if (formData.companyId && formData.accontingProvider) {
        try {
          // console.log(`useEffect selectedCompanyId=${selectedCompanyId}  selectedAccontingProvider=${selectedAccontingProvider}`);
          const response = await axios.get(
            //`http://gateway:3002/accounting-providers/${formData.accontingProvider}/${formData.companyId}`
            `http://localhost:3002/accounting-providers/${formData.accontingProvider}/${formData.companyId}/balance-sheet`
          );
          console.log(`response=${JSON.stringify(response)}`);
          setBalanceSheet(response.data.data.balanceSheet);
        } catch (error: any) {
          console.error('Error fetching account balance:', error.message);
        }
      }
    };

    fetchBalanceSheet();
  }, [formData.companyId, formData.accontingProvider]);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSelectChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
    if (approvalData) setApprovalData(null);
  };

  const handleDateChange = (date: Date | null) => {
    setFormData((prevData) => ({ ...prevData, dateFounded: date }));
  };

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    console.log(`formData=${JSON.stringify(formData)}`);
    try {
      const response = await axios.post(
        //'http://gateway:3002/loan-applications/',
        'http://localhost:3002/loan-applications/',
        formData
      );
      console.log(`response.data=${JSON.stringify(response.data)}`);
      setApprovalData(response.data.data.approval);
      setPreAssesmentData(response.data.data.preAssessment);
    } catch (error: any) {
      console.error('Error submitting form:', error.message);
    }
  }

  function resetState() {
    setFormData({
      companyId: '',
      dateFounded: new Date(new Date().getTime() - 31556926000), // default is 1 years before today
      amount: 2000,
      accontingProvider: '',
    });
    setBalanceSheet([]);
    setApprovalData(null);
    setPreAssesmentData(null);
  
  };

  function formatDate(date: Date, format: string): string {
    if (date) {
      format = format.replace('yyyy', '' + date.getFullYear());
      format = format.replace(
        'yy',
        date.getFullYear().toString().slice(-2) + ''
      );
      format = format.replace('mm', '' + (date.getMonth() + 1));
      format = format.replace(
        'dd',
        date.getDate() < 10 ? '0' + date.getDate() : '' + date.getDate()
      );
      return format;
    }
    return '';
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className='row'>
          <div className='cell'>
            <label>Pick the name of your business:</label>
          </div>
          <div className='cell'>
            <select
              className='input'
              name='companyId'
              value={formData.companyId}
              onChange={handleSelectChange}
              required
            >
              <option value='' disabled>
                Select...
              </option>
              {companies.map((item: CompanyType) => (
                <option key={item.id} value={item.id}>
                  {item.name}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className='row'>
          <div className='cell'>
            <label>Enter the date that the buisiness was started:</label>
          </div>
          <div className='cell'>
            <DatePicker
              selected={formData.dateFounded}
              onChange={handleDateChange}
              dateFormat='dd/MM/yyyy'
              isClearable
              showYearDropdown
              required
              className='input'
            />
          </div>
        </div>
        <div className='row'>
          <div className='cell'>
            <label>Enter your desired loan ammount ($):</label>
          </div>
          <div className='cell'>
            <input
              type='number'
              name='amount'
              value={formData.amount}
              onChange={handleChange}
              required
              className='input'
            />
          </div>
        </div>
        <div className='row'>
          <div className='cell'>
            <label>Pick your desired accounitng provider:</label>
          </div>
          <div className='cell'>
            <select
              name='accontingProvider'
              value={formData.accontingProvider}
              onChange={handleSelectChange}
              className='input'
              required
            >
              <option value='' disabled>
                Select...
              </option>
              {accountingProviders.map((item: AccountingProviderType) => (
                <option key={item.id} value={item.id}>
                  {item.name}
                </option>
              ))}
            </select>
          </div>
        </div>
        {!approvalData && formData.companyId && formData.accontingProvider && (
          <div>
            <h3>Balance Sheet</h3>
            <table>
              <thead>
                <tr>
                  <th>Year</th>
                  <th>Month</th>
                  <th>Profit or Loss</th>
                  <th>Assets Value</th>
                </tr>
              </thead>
              <tbody>
                {balanceSheet.map((item: Balance) => (
                  <tr key={item.year + '' + item.month}>
                    <td className='n'>{item.year}</td>
                    <td className='n'>{item.month}</td>
                    <td className='m'>{`$${item.profitOrLoss.toFixed(2)}`}</td>
                    <td className='m'>{`$${item.assetsValue.toFixed(2)}`}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        {approvalData && approvalData!.approvalStatus && (
          <h3>Application Status</h3>
        )}
        {approvalData && (
          <div>
            <h4>Pre Assessment Summary</h4>
            <table>
              <tbody>
              <tr>
                  <td>
                    <label>Age of the business:</label>
                  </td>
                  <td>{preAssesmentData!.age} year(s)</td>
                </tr>
                <tr>
                  <td>
                    <label>Pre-assessment score:</label>
                  </td>
                  <td>{preAssesmentData!.score}%</td>
                </tr>
              </tbody>
            </table>
          </div>
        )}
        {approvalData && approvalData!.approvalStatus === 'approved' && (
          <div>
            <h4 className='green'>
              Congratulations, your loan is Approved!
            </h4>
            <table>
              <tbody>
                <tr>
                  <td>
                    <label>Approved amount ($): </label>
                  </td>
                  <td>{(Math.round(approvalData!.approvalScore! * formData.amount / 100)).toFixed(2) }</td>
                </tr>
                <tr>
                  <td>
                    <label>Approved %:</label>
                  </td>
                  <td>{approvalData!.approvalScore}%</td>
                </tr>
              </tbody>
            </table>
          </div>
        )}
        {approvalData && approvalData!.approvalStatus === 'rejected' && (
          <div>
            <h4 className='red'>
              We are sorry, your loan is not approved.
            </h4>
          </div>
        )}
        {!approvalData && formData.companyId && formData.accontingProvider && <button type='submit'>Submit</button>}
        {approvalData && <button onClick={resetState}>Try Again</button>}
      </form>
    </div>
  );
};

export default LoanApplicationForm;
