import LoanApplicationForm from './LoanApplicationForm';

const App = () => {
  return (
    <div className='app'>
      <header className='header'>
        <h1>Simple Business Loans</h1>
      </header>
      <main className='main'>
        <section>
          <h2>Application Form</h2>
          <LoanApplicationForm />
        </section>
      </main>
    </div>
  );
};

export default App;
