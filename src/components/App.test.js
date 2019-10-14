import React from "react";
import App from "../components/App";
import { cleanup, fireEvent, render } from "@testing-library/react";
import renderer from "react-test-renderer";
import Info from "../components/pages/Info";
import NotFound from "../components/pages/NotFound";
import { createStore, applyMiddleware, compose } from "redux";
import rootReducer from "../store/reducers/rootReducer";
import { Provider } from "react-redux";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { exportAllDeclaration } from "@babel/types";

test("Test Info", () => {
  let store = createStore(rootReducer);
  const notFoundWithRudex = renderer
    .create(
      <Provider store={store}>
        <BrowserRouter>
          <NotFound />
        </BrowserRouter>
      </Provider>
    )
    .toJSON();
  expect(notFoundWithRudex).toMatchSnapshot();

  //   const infoWithRudex = renderer
  //     .create(
  //       <Provider store={store}>
  //         <BrowserRouter>
  //           <Info />
  //         </BrowserRouter>
  //       </Provider>
  //     )
  //     .toJSON();
  //   expect(infoWithRudex).toMatchSnapshot();

  //   const notFoundWithRudex = renderer
  //     .create(
  //       <Provider store={store}>
  //         <BrowserRouter>
  //           <NotFound />
  //         </BrowserRouter>
  //       </Provider>
  //     )
  //     .toJSON();
  //   expect(notFoundWithRudex).toMatchSnapshot();
});
