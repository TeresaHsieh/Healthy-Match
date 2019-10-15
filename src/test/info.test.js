import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { firebaseReducer } from "react-redux-firebase";
import { combineReducers } from "redux";
import { cleanup, fireEvent, render } from "@testing-library/react";
import renderer from "react-test-renderer";
import { createStore, applyMiddleware, compose } from "redux";
import { Provider } from "react-redux";
import { exportAllDeclaration } from "@babel/types";
import rootReducer from "../store/reducers/rootReducer";
import dailyReducer from "../store/reducers/dailyReducer";
import authReducer from "../store/reducers/authReducer";
import Info from "../components/pages/Info";
import NotFound from "../components/pages/NotFound";

import ReactDOM from "react-dom";
import thunk from "redux-thunk";
import { reduxFirestore, getFirestore } from "redux-firestore";
import { reactReduxFirebase, getFirebase } from "react-redux-firebase";
import firebaseConfig from "../config/firebaseConfig";

test("Test Info", () => {
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
});

test("Test Info with UID", () => {
  const initState = {
    // store: { auth: { uid: "r097WikN8kfJbZkWlZItqw7wMx73" } },
    // auth: { uid: "r097WikN8kfJbZkWlZItqw7wMx73" },
    firebase: {
      auth: {
        isLoaded: false,
        isEmpty: true,
        uid: "r097WikN8kfJbZkWlZItqw7wMx73"
      },
      userInfo: { isLoaded: false, isEmpty: true },
      profile: { 456: "$56" }
      //uid: "r097WikN8kfJbZkWlZItqw7wMx73"
    },
    auth: {
      contributionDetails: { food: "foodName" }
    }
    // {"date":"2019-10-15","auth":{"isLoaded":false,"isEmpty":true},"userInfo":{"isLoaded":false,"isEmpty":true}}
  };
  const testReducer = (state = initState, action) => {
    return state;
  };

  let store = createStore(testReducer);
  const infoWithRudexAuth = renderer
    .create(
      <Provider
        // store={store}
        store={store}
      >
        <BrowserRouter>
          <Info />
        </BrowserRouter>
      </Provider>
    )
    .toJSON();
  expect(infoWithRudexAuth).toMatchSnapshot();
});
