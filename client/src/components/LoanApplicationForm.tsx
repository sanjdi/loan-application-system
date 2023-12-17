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
  founded: Date | null;
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

export interface LoanApplicationFormProps {
  companies: [{ id: string; name: string; founded: string }];
  accountingProviders: [{ id: string; name: string }];
}

const LoanApplicationForm = () => {
  const [formData, setFormData] = useState<FormData>({
    companyId: '',
    founded: null,
    amount: 2000,
    accontingProvider: '',
  });
  const [companies, setCompanies] = useState([]);
  const [accountingProviders, setAccountingProviders] = useState([]);
  const [balanceSheet, setBalanceSheet] = useState([]);
  const [selectedCompanyId, setSelectedCompanyId] = useState<string>();
  const [selectedAccontingProvider, setSelectedAccontingProvider] =
    useState<string>();
  const [approvalData, setApprovalData] = useState<ApprovalData | null>(null);

  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        const response = await axios.get(
          'http://localhost:3002/loan-applications/init'
        );
        const initialData = response.data;
        console.log(`initialData=${JSON.stringify(initialData)}`);
        console.log(`companies=${initialData.companies}`);
        console.log(`accountingProviders=${initialData.accountingProviders}`);
        setCompanies(initialData.data.companies);
        setAccountingProviders(initialData.data.accountingProviders);
        setSelectedCompanyId(initialData.data.companies[0]);
      } catch (error: any) {
        console.error('Error fetching initial data:', error.message);
      }
    };

    fetchInitialData();     
  }, []);

  useEffect(() => {
    const fetchBalanceSheet = async () => {
      if (selectedCompanyId && selectedAccontingProvider) {
        try {
          console.log(`useEffect selectedCompanyId=${selectedCompanyId}  selectedAccontingProvider=${selectedAccontingProvider}`);
          const response = await axios.get(
            `http://localhost:3002/accounting-providers/${formData.accontingProvider}/${formData.companyId}`
          );
          console.log(`response.data=${JSON.stringify(response.data)}`);
          setBalanceSheet(response.data.data.balanceSheet.sheet);
        } catch (error: any) {
          console.error('Error fetching account balance:', error.message);
        }
      }
    };

    fetchBalanceSheet();
  // }, [selectedCompanyId, selectedAccontingProvider]);
  }, [formData.companyId, formData.accontingProvider]);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSelectChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    if (name === 'companyId') setSelectedCompanyId(value);
    if (name === 'accontingProvider') setSelectedAccontingProvider(value);
    setFormData((prevData) => ({ ...prevData, [name]: value }));
    if (approvalData) setApprovalData(null);
    // console.log(`handleChange formData=${JSON.stringify(formData)}`);
    // console.log(`handleChange name=${name}  value=${value}  selectedCompanyId=${selectedCompanyId}  selectedAccontingProvider=${selectedAccontingProvider}`);
    // console.log(`handleChange formData=${JSON.stringify(formData)}`);
  };

  const handleDateChange = (date: Date | null) => {
    setFormData((prevData) => ({ ...prevData, founded: date }));
  };

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    console.log(`formData=${JSON.stringify(formData)}`);
    try {
      const response = await axios.post(
        'http://localhost:3002/loan-applications/',
        formData
      );
      console.log(`response.data=${JSON.stringify(response.data)}`);
      setApprovalData(response.data.data.approval);
    } catch (error: any) {
      console.error('Error submitting form:', error.message);
    }
  }

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
              selected={formData.founded ? formData.founded : new Date()}
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
            <label>Enter your desired loan ammount:</label>
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
        {!approvalData && balanceSheet && (
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
                  <tr key={item.year + "" + item.month}>
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
        {approvalData && approvalData!.approvalStatus && <h3>Application Status</h3>}
        {approvalData && approvalData!.approvalStatus === 'approved' && (
          <div>
            <h4 className='green'>
              Congratulations, your loan application is approved!
            </h4>
            <table>
              <tr>
                <td>
                  <label>Approved amount: </label>
                </td>
                <td>{approvalData!.approvalScore! * formData.amount}</td>
              </tr>
              <tr>
                <td>
                  <label>Pre-assessment score:</label>
                </td>
                <td>{approvalData!.approvalScore}%</td>
              </tr>
            </table>
          </div>
        )}
        {approvalData && approvalData!.approvalStatus === 'rejected' && (
          <div>
            <h4 className='red'>
              We are sorry, your loan application is not approved.
            </h4>
          </div>
        )}
        <button type='submit'>Submit</button>
      </form>
    </div>
  );
};

export default LoanApplicationForm;
