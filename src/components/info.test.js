import React from "react";
import App from "./App";
import { cleanup, fireEvent, render } from "@testing-library/react";
import renderer from "react-test-renderer";
import Info from "../components/pages/Info";
import NotFound from "./pages/NotFound";
import { createStore, applyMiddleware, compose } from "redux";
import rootReducer from "../store/reducers/rootReducer";
import { Provider } from "react-redux";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { exportAllDeclaration } from "@babel/types";
import dailyReducer from "../store/reducers/dailyReducer";
import authReducer from "../store/reducers/authReducer";
import { firebaseReducer } from "react-redux-firebase";
import { combineReducers } from "redux";

test("Test NotFound and Info", () => {
  let store = createStore(rootReducer);

  const infoWithRudex = renderer
    .create(
      <Provider store={store}>
        <BrowserRouter>
          <Info />
        </BrowserRouter>
      </Provider>
    )
    .toJSON();
  expect(infoWithRudex).toMatchSnapshot();

  store = createStore(
    combineReducers({
      auth: "",
      daily: dailyReducer,
      firebase: firebaseReducer
    })
  );

  const infoWithWrongRudex = renderer
    .create(
      <Provider store={store}>
        <BrowserRouter>
          <Info />
        </BrowserRouter>
      </Provider>
    )
    .toJSON();
  expect(infoWithWrongRudex).toMatchSnapshot();
});
