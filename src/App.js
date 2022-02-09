import Home from './components/HomeComponent'
import './App.css';
import React from "react";
import {Provider} from 'react-redux';
import { configureStore } from './store/configureStore';

const store = configureStore();

function App() {
  return (
      <Provider store={store}>
        <Home/>
      </Provider>
  );
}

export default App;
