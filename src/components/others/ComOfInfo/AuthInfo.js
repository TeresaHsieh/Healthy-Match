import React from "react";
import { connect } from "react-redux";
import "../../../css/info.css";
import Edit from "../../../imgs/edit.png";
import Cancel from "../../../imgs/cancel.png";
import check from "../../../imgs/check.png";
import ChefMatch from "../../../imgs/chef-match.png";
import { storage } from "../../../config/firebaseConfig";

import { checkUserInfo } from "../../../store/actions/authAction";
import { updateInfoToFirestore } from "../../../store/actions/authAction";

class AuthInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      image: null,
      url: ""
    };
  }

  componentDidMount = () => {
    // this.props.checkUserInfo(this.props.auth.uid);
    if (this.props.userInfo.Photo) {
      this.setState(this.props.userInfo);
    }
  };

  componentDidUpdate = (prevProps, prevState) => {
    if (!prevState.Photo) {
      this.setState(this.props.userInfo);
    }
  };

  handleSelectPic = e => {
    if (e.target.files[0]) {
      const image = e.target.files[0];
      this.setState(() => ({ image }));
    }
  };

  handleUpload = () => {
    const { image } = this.state;
    const uploadTask = storage.ref(`images/${image.name}`).put(image);
    uploadTask.on(
      "state_changed",
      snapshot => {
        // progress function
      },
      error => {
        // error function
        //console.log(error);
      },
      () => {
        // complete function
        storage
          .ref("images")
          .child(image.name)
          .getDownloadURL()
          .then(url => {
            this.setState({ url });
          })
          .then(() => {
            let Photo = this.state.url;
            let userUID = this.props.auth.uid;
            let wholeState = { Photo: Photo };
            this.props.updateInfoToFirestore(userUID, wholeState);
          });
      }
    );
  };
  render() {
    // if (!this.state.Photo) {
    //   return <div> Loading (｡･ω･｡)ﾉ </div>;
    // }
    return (
      <div className="userPhotoAndID">
        <div className="userPic">
          <img
            src={this.state.Photo}
            className="userPhoto"
            width="50px"
            height="50px"
          />
        </div>

        <label className="uploadPicture">
          <input
            type="file"
            onChange={this.handleSelectPic}
            // style="display:none;"
          />
        </label>

        {/* <input type="file" onChange={this.handleSelectPic} /> */}
        <button onClick={this.handleUpload}>上傳個人照片</button>
        <div className="userID">
          <input name="ID" value={this.props.auth.email} />
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    date: new Date().toLocaleDateString(),
    auth: state.firebase.auth,
    userInfo: state.firebase.profile
  };
};

const mapDispatchToProps = dispatch => {
  return {
    // create a method
    checkUserInfo: userUID => {
      dispatch(checkUserInfo(userUID));
    },
    updateInfoToFirestore: (userUID, wholeState) => {
      dispatch(updateInfoToFirestore(userUID, wholeState));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AuthInfo);
