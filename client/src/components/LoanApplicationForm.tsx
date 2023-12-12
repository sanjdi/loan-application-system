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
  companyName: string;
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

export interface LoanApplicationFormProps {
  companies: [{ id: string; name: string; founded: string }];
  accountingProviders: [{ id: string; name: string }];
}

const LoanApplicationForm = () => {
  const [formData, setFormData] = useState<FormData>({
    companyName: '',
    founded: null,
    amount: 2000,
    accontingProvider: '',
  });
  const [companies, setCompanies] = useState([]);
  const [accountingProviders, setAccountingProviders] = useState([]);
  const [balanceSheet, setBalanceSheet] = useState([]);
  const [selectedCompanyName, setSelectedCompanyName] = useState<string>();
  const [selectedAccontingProvider, setSelectedAccontingProvider] = useState<string>();

  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        const response = await axios.get(
          'http://localhost:8020/loans/init-application/'
        );
        const initialData = response.data;
        // console.log(`initialData=${JSON.stringify(initialData)}`);
        // console.log(`companies=${initialData.companies}`);
        // console.log(`accountingProviders=${initialData.accountingProviders}`);
        setCompanies(initialData.companies);
        setAccountingProviders(initialData.accountingProviders);
      } catch (error: any) {
        console.error('Error fetching initial data:', error.message);
      }
    };

    fetchInitialData();
  }, []);

  useEffect(() => {
    const fetchBalanceSheet = async () => {
      if (formData.companyName && formData.accontingProvider) {
        try {
          const response = await axios.get(
            `http://localhost:8020/accounting-providers/${formData.accontingProvider}/${formData.companyName}/2010/03`
          );
          console.log(`response.data=${JSON.stringify(response.data)}`);
          setBalanceSheet(response.data.sheet);
        } catch (error: any) {
          console.error('Error fetching account balance:', error.message);
        }
      }
    };

    fetchBalanceSheet();
  }, [formData.companyName, formData.accontingProvider]);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));

    if (name === 'companyName') setSelectedCompanyName(value);

    if (name === 'accontingProvider') setSelectedAccontingProvider(value);
  };

  const handleAccontingProviderChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleDateChange = (date: Date | null) => {
    setFormData((prevData) => ({ ...prevData, founded: date }));
  };

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    console.log(`formData=${JSON.stringify(formData)}`);
    // fetch('/some-api', { method: form.method, body: formData });
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
      <form method='post' onSubmit={handleSubmit}>
        <div className='row'>
          <div className='cell'>
            <label>Pick the name of your business:</label>
          </div>
          <div className='cell'>
            <select
              className='input'
              name='companyName'
              value={formData.companyName}
              onChange={handleChange}
              required
            >
              <option value='' disabled>
                Select...
              </option>
              {companies.map((item: CompanyType) => (
                <option key={item.id} value={item.name}>
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
              selected={formData.founded}
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
              onChange={handleAccontingProviderChange}
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
        {balanceSheet && 
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
              <tr key={item.year + item.month}>
                <td className="n">{item.year}</td>
                <td className="n">{item.month}</td>
                <td className="m">{`$${item.profitOrLoss.toFixed(2)}`}</td>
                <td className="m">{`$${item.assetsValue.toFixed(2)}`}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
        }
        <button type='submit'>Submit</button>
      </form>
    </div>
  );
};

export default LoanApplicationForm;
