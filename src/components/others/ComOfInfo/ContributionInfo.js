import React from "react";
import { connect } from "react-redux";
import "../../../css/info.css";
import ChefMatch from "../../../imgs/chef-match.png";

import { checkUserInfo } from "../../../store/actions/authAction";
import { updateInfoToFirestore } from "../../../store/actions/authAction";

import { getContributionDetails } from "../../../store/actions/authAction";

class ContributionInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      openDetails: false
    };
  }

  showContributionDetails = e => {
    this.props.getContributionDetails(
      this.props.auth.uid,
      e.currentTarget.innerText
    );
    this.setState({ openDetails: true });
  };

  closeDetails = () => {
    this.setState({ openDetails: false });
  };

  render() {
    const contributeData = this.props.userInfo.foodContribute;

    const contributionDetails = this.props.contributionDetails;
    const openDetails = this.state.openDetails;
    let details;
    let mobileDetails;
    let keyArray = [];
    let valueArray = [];

    if (contributionDetails && this.state.openDetails == true) {
      delete contributionDetails["搜尋關鍵字"];
      delete contributionDetails["食品名稱"];
      let remainContributionDetails = Object.keys(contributionDetails).map(
        // must use arrow function for the close button function using "this"
        key => {
          keyArray.push(key);
          valueArray.push(contributionDetails[key]);
          details = (
            <div className="contributionEachFoodDetails">
              <div className="contributionEachNutritionName">
                {keyArray.map(detailsName => (
                  <p>{detailsName}</p>
                ))}
              </div>
              <div className="contributionEachNutritionNumber">
                {valueArray.map(detailsName => (
                  <p>{detailsName}</p>
                ))}
              </div>
              <div onClick={this.closeDetails} className="detailsCloseButton">
                X
              </div>
            </div>
          );
          mobileDetails = (
            <div className="mobileContributionEachFoodDetails">
              <div className="mobileContributionEachNutritionName">
                {keyArray.map(detailsName => (
                  <p>{detailsName}</p>
                ))}
              </div>
              <div className="mobileContributionEachNutritionNumber">
                {valueArray.map(detailsName => (
                  <p>{detailsName}</p>
                ))}
              </div>
              <div onClick={this.closeDetails} className="detailsCloseButton">
                X
              </div>
            </div>
          );
        }
      );
    }

    if (this.props.userInfo.foodContribute) {
      return (
        <div className="more-info-match">
          <div className="titleTitle">
            <div className="titlewords">營養素貢獻紀錄</div>

            <div className="divideLine"></div>
          </div>
          <div className="userContribution">
            <div className="contributionEachFoodName">
              {contributeData.map(data => (
                <p
                  className="contributionEachFood"
                  onClick={this.showContributionDetails}
                >
                  {data}
                </p>
              ))}
              {mobileDetails}
            </div>
            {details}
          </div>
        </div>
      );
    } else {
      return (
        <div className="more-info-match">
          <div className="more-info-match">
            <div className="titleTitle">
              <div className="titlewords">營養素貢獻紀錄</div>

              <div className="divideLine"></div>
            </div>
            <div className="userMatchName">
              <div>目前尚未有紀錄</div>
            </div>
          </div>
        </div>
      );
    }
  }
}

const mapStateToProps = state => {
  return {
    date: new Date().toLocaleDateString(),
    auth: state.firebase.auth,
    userInfo: state.firebase.profile,
    contributionDetails: state.auth.contributionDetails
  };
};

const mapDispatchToProps = dispatch => {
  return {
    checkUserInfo: userUID => {
      dispatch(checkUserInfo(userUID));
    },
    getContributionDetails: (userUID, contributionFoodName) => {
      dispatch(getContributionDetails(userUID, contributionFoodName));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ContributionInfo);
