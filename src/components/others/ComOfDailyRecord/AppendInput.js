import React from "react";

class AppendInput extends React.Component {
  render() {
    return (
      <form className="main-input">
        <input
          placeholder="輸入食物名稱"
          className="food-name"
          onChange={this.inputNameChange}
        ></input>
        <input
          placeholder="輸入食物份量（100g 為一份）"
          className="food-serve"
          onChange={this.inputClassChange}
        ></input>
        <img src={Delete} className="delete-button"></img>
        <p className="add-input" onClick={this.addInput}>
          {" "}
          新增欄位{" "}
        </p>
      </form>
    );
  }
}

export default AppendInput;
