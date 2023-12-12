import ReactDOM from 'react-dom/client';
import App from './components/App';
import { StrictMode } from 'react';
import './styles.css';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <StrictMode>
      <App />
  </StrictMode>
);
