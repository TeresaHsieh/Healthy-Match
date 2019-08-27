import React from "react";
import ReactDOM from "react-dom";

class NavBar extends React.Component {
  render() {
    return (
      <header>
        <div className="NavBar">
          <button onClick={() => this.props.changeStatusType("All")}>
            All
          </button>
          <button onClick={() => this.props.changeStatusType("NotDoneYet")}>
            Not Done Yet
          </button>
          <button onClick={() => this.props.changeStatusType("Done")}>
            Done
          </button>
        </div>
      </header>
    );
  }
}

function Lists(props) {
  return (
    <div className="Lists">
      <div className="List-name">
        <button
          className="remove-list"
          onClick={() => {
            props.changeStatus(props.id);
            // props.removeList(props.id);
          }}
        >
          ✖
        </button>
        {props.name}
      </div>
    </div>
  );
}

class NewList extends React.Component {
  constructor() {
    super();
    this.state = {
      value: ""
    };
  }

  handleValueChange = e => {
    this.setState({ value: e.target.value });
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.addList(this.state.value);
    this.setState({ value: "" });
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <input
          type="text"
          placeholder="Add Some To-Do"
          value={this.state.value}
          onChange={this.handleValueChange}
        />
        <input type="submit" placeholder="Add" />
      </form>
    );
  }
}
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      todoLists: [
        {
          name: "Having Breakfast",
          status: "NotDoneYet",
          id: 1
        },
        {
          name: "Going to School",
          status: "NotDoneYet",
          id: 2
        },
        {
          name: "Doing Homework",
          status: "NotDoneYet",
          id: 3
        }
      ],
      statusType: "All"
    };
    this.handleStatusType = this.handleStatusType.bind(this);
  }

  handleStatusType = type => {
    console.log(this);

    if (type == "Done") {
      this.setState({
        statusType: "Done"
      });
    } else if (type == "NotDoneYet") {
      this.setState({
        statusType: "NotDoneYet"
      });
    } else {
      this.setState({
        statusType: "All"
      });
    }
  };

  handleRemoveList = id => {
    this.setState(prevState => {
      return {
        todoLists: prevState.todoLists.filter(l => l.id !== id)
      };
    });
  };

  handleListStatus = id => {
    console.log(this);
    this.state.todoLists[id - 1].status = "Done";
    this.setState(prevState => {
      return {
        todoLists: [...prevState.todoLists]
      };
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.addList(this.state.value);
    this.setState({ value: "" });
  };

  prevListID = 3;

  handleAddList = name => {
    this.setState(prevState => {
      return {
        todoLists: [
          ...prevState.todoLists,
          {
            name,
            id: (this.prevListID += 1),
            status: "NotDoneYet"
          }
        ]
      };
    });
  };

  render() {
    let newTodoList = this.state.todoLists;

    if (this.state.statusType == "Done") {
      newTodoList = newTodoList.filter(l => l.status !== "NotDoneYet");
    } else if (this.state.statusType == "NotDoneYet") {
      newTodoList = newTodoList.filter(l => l.status !== "Done");
    } else {
      newTodoList = newTodoList;
    }

    return (
      <div>
        <NavBar changeStatusType={this.handleStatusType} />

        {/* ToDoLists */}
        {newTodoList.map(lists => (
          <Lists
            name={lists.name}
            id={lists.id}
            status={lists.status}
            key={lists.id.toString()}
            removeList={this.handleRemoveList}
            changeStatus={this.handleListStatus}
          />
        ))}
        <NewList addList={this.handleAddList} />
      </div>
    );
  }
}

ReactDOM.render(<App />, document.querySelector("#root"));
