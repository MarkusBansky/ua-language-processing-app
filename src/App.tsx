import React from "react"
import Homepage from "./pages/homepage/Homepage"
import { Provider as ReduxProvider } from "react-redux"
import configureStore from "./modules/store"

// Import for ANTD design system.
import 'antd/dist/antd.css';
import 'antd/dist/antd';

// Import main styles file.
import './styles/main.scss'

// Configure the redux store.
const reduxStore = configureStore((window as any).REDUX_INITIAL_DATA)

/**
 * An API url pointing at port 8080 and dedicated
 * for Ukrainian ductionary calls for sentences.
 */
export const DICTIONARY_API = 'http://localhost:8080/api/v1'

/**
 * And API url pointing at port 8081 and redicated
 * for neural network predictions for Grammar Case tags in Ukr.
 */
export const NEURAL_API = 'http://localhost:8081/api/v1'

/**
 * Main component of the application that is added into the root
 * element of the website.
 */
class App extends React.Component {
  /**
   * Renders the main UI component with redux provider and
   * in future could be added a Router for multiple pages
   * TODO: Can add router for multipage
   */
  render() {
    return (
      <ReduxProvider store={reduxStore}>
          <Homepage />
      </ReduxProvider>
    );
  }
}

// Exports the App component class as default
export default App;
