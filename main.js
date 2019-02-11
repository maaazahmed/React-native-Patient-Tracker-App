import React from 'react';
import AppNavigator from "./src/index";
import { Provider } from "react-redux";
import store from "./src/store/index";




export default Main = () => (
  <Provider store={store} >
    <AppNavigator />
  </Provider>
)

