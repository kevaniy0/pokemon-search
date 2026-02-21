import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router';
import './index.css';
import App from './App.tsx';
import { ThemeProvider } from './contexts/ThemeProvider.tsx';
import { Provider } from 'react-redux';
import { store } from './store/index.ts';

const root = document.getElementById('root');

if (root !== null) {
  createRoot(root).render(
    <StrictMode>
      <Provider store={store}>
        <BrowserRouter>
          <ThemeProvider>
            <App />
          </ThemeProvider>
        </BrowserRouter>
      </Provider>
    </StrictMode>
  );
}
