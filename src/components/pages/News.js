import React from "react";
import axios from "axios";

// App Components
import Header from "../common/Header";

//GET https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=https%3A%2F%2Fwww.youtube.com%2Fplaylist%3Flist%3DPLKLVl0LnnSQw9r3ajnJKBQrq8K9kY0pY8&channelType=any&order=date&safeSearch=moderate&videoCaption=closedCaption&videoDefinition=standard&videoDuration=medium&videoEmbeddable=true&videoLicense=youtube&videoType=episode&key=[YOUR_API_KEY] HTTP/1.1

// Authorization: Bearer [YOUR_ACCESS_TOKEN]
// Accept: application/json

class News extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      news: []
    };
  }

  componentDidMount() {
    // fetch(
    //   "https://www.fda.gov.tw/DataAction?keyword=" + encodeURIComponent("食物")
    // )
    //   .then(response => response.json())
    //   .then(responseData => {
    //     console.log(responseData);
    //     // this.setState({ news: responseData });
    //   })
    //   .catch(error => {
    //     console.log("沒有 fetch 成功", error);
    //   });

    axios
      .get(
        "https://www.fda.gov.tw/DataAction?keyword=" +
          encodeURIComponent("食物")
      )
      .then(response => {
        console.log("andy", response);
        this.setState({
          news: response.data
        });
      })
      .catch(error => {
        console.log("Error fetching and parsing data", error);
      });
  }

  render() {
    const results = this.state.news;

    return (
      <div>
        <Header />
        <div className="">
          <div>
            <h2> News </h2>
            {results.map(newsReport => (
              <div>
                {newsReport.標題}
                {newsReport.內容}
                {newsReport.發布日期}
                <iframe
                  width="560"
                  height="315"
                  src="https://www.youtube.com/embed/videoseries?list=PLKLVl0LnnSQw9r3ajnJKBQrq8K9kY0pY8"
                  frameBorder="0"
                  allow="autoplay; encrypted-media"
                  allowFullScreen
                ></iframe>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }
}

export default News;
