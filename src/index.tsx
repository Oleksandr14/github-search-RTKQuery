import ReactDOM from 'react-dom/client';
import { BrowserRouter } from "react-router-dom"; // імпорт маршрутизації з react-router-dom
import App from './App';

import '../src/index.scss' // імпорт стилів
import { Provider } from 'react-redux'; // import from redux/toolkit

import { store } from './store'; // import reducers from store

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <Provider store={store}> {/**connect redux and paste store into provider */}
  <BrowserRouter> {/**Обгортаю App , щоб була маршрутизація */}
    <App />
  </BrowserRouter>
  </Provider>
);


