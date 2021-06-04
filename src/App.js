import './App.css';

import { Provider } from 'react-redux';
import {BrowserRouter as Router} from 'react-router-dom';
import Routers from './router';
import Header from './views/Header'
import store from './store';
import {connect} from 'react-redux';
import { useEffect } from 'react';
import Consumer from './Consumer';

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Consumer />
        <Header />
        <Routers />
      </Router>
    </Provider>
  );
}

export default App;
