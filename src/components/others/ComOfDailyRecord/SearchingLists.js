import React from "react";
import { connect } from "react-redux";

class SearchingLists extends React.Component {
  render() {
    return <div className="keywords"></div>;
  }
}

const mapStateToProps = state => {
  return {
    date: new Date().toLocaleDateString(),
    meals: state.daily.meals,
    record: state.daily.record,
    recordName: state.daily.recordName,
    recordServe: state.daily.recordServe,
    keywords: state.daily.keywords
  };
};

export default connect(mapStateToProps)(SearchingLists);
