import React from "react";
import Info from "../components/pages/Info";
import renderer from "react-test-renderer";

test("Info changes the state when enter with no info", () => {
  const component = renderer.create(
    <Info page="http://www.facebook.com">Facebook</Info>
  );
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();

  // manually trigger the callback
  tree.props.onMouseEnter();
  // re-rendering
  tree = component.toJSON();
  expect(tree).toMatchSnapshot();

  // manually trigger the callback
  tree.props.onMouseLeave();
  // re-rendering
  tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
