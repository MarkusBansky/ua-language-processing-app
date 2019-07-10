import React from "react"
import Homepage from "./pages/homepage/Homepage"
import { Provider as ReduxProvider } from "react-redux"
import configureStore from "./modules/store"

import 'antd/dist/antd.css';
import 'antd/dist/antd';

import './styles/main.scss'

const reduxStore = configureStore((window as any).REDUX_INITIAL_DATA)

class App extends React.Component {
  render() {
    return (
      <ReduxProvider store={reduxStore}>
          <Homepage />
      </ReduxProvider>
    );
  }
}

export default App;
