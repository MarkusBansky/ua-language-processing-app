import { createStore, applyMiddleware } from "redux";

// Logger with default options
// import logger from "redux-logger"
import reducer from "./reducer"
import Axios from "axios"
import axiosMiddleware from 'redux-axios-middleware'

const client = Axios.create({
  responseType: 'json'
})

export default function configureStore(initialState: any) {
  const store = createStore(
    reducer,
    initialState,
    applyMiddleware(
      // logger,
      axiosMiddleware(client)
    )
  )
  return store
}
