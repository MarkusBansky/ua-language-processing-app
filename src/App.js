import React, { Component } from "react";
import Homepage from "./pages/Homepage";
import { Provider as ReduxProvider } from "react-redux";
import configureStore from "./modules/store";

import 'antd/dist/antd.css';
import 'antd/dist/antd';

import './styles/main.scss'

const reduxStore = configureStore(window.REDUX_INITIAL_DATA);

class App extends Component {
  render() {
    return (
      <ReduxProvider store={reduxStore}>
          <Homepage />
      </ReduxProvider>
    );
  }
}

export default App;
