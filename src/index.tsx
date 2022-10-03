import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { QueryClient, QueryClientProvider } from 'react-query';
import { store } from './store';
import { Provider } from 'react-redux';

// commenting out the use of react query to use redux toolkit instead
// const queryClient = new QueryClient();

// const root = ReactDOM.createRoot(
//   document.getElementById('root') as HTMLElement
// );
// root.render(
//   <React.StrictMode>
//     <QueryClientProvider client={queryClient}>
//         <App />
//     </QueryClientProvider>
//   </React.StrictMode>
// );

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);