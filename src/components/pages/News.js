import React from "react";

// App Components
import Header from "../common/Header";

class News extends React.Component {
  constructor() {
    super();
    this.state = {
      news: []
    };
  }

  componentDidMount() {
    fetch(
      "https://www.fda.gov.tw/DataAction?keyword=" + encodeURIComponent("食物")
    )
      .then(response => response.json())
      .then(responseData => {
        console.log(responseData);
        // this.setState({ news: responseData });
      })
      .catch(error => {
        console.log("沒有 fetch 成功", error);
      });
  }

  render() {
    return (
      <div>
        <Header />
        <div className="">
          <div>
            <h2> News </h2>
          </div>
        </div>
      </div>
    );
  }
}

export default News;
