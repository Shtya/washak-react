import ReactDOM from 'react-dom/client';
import App from './App';
import './globals.css';
import { AppProvider } from './AppContext';
import Meta from './components/atoms/Meta';
import '@fortawesome/fontawesome-free/css/all.min.css';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <AppProvider> 
        <Meta />
        <App /> 
    </AppProvider>
);
