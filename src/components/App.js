import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

// App Components
import Home from "./pages/Home";
import DailyRecord from "./pages/DailyRecord";
import History from "./pages/History";
import MatchStatus from "./pages/MatchStatus";
import Member from "./pages/Member";
import LogOut from "./pages/LogOut";
import News from "./pages/News";
import Info from "./pages/Info";
import NotFound from "./pages/NotFound";

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      loading: true
    };
  }

  componentDidMount() {
    // this simulates an async action, after which the component will render the content
    demoAsyncCall().then(() => this.setState({ loading: false }));
  }

  render() {
    const { loading } = this.state;

    if (loading) {
      // if your component doesn't have to wait for an async action, remove this block
      return null; // render null when app is not ready
    }
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Home} />

          {/* Home */}

          <Route path="/daily-record" component={DailyRecord} />
          <Route path="/history" component={History} />
          <Route path="/match-status" component={MatchStatus} />
          <Route path="/news" component={News} />
          <Route path="/member" component={Member} />
          <Route path="/info" component={Info} />
          <Route path="/log-out" component={LogOut} />

          <Route component={NotFound} />
        </Switch>
      </BrowserRouter>
    );
  }
}

function demoAsyncCall() {
  return new Promise(resolve => setTimeout(() => resolve(), 100));
}

// const mapStateToProps = state => {
//   return {
//     auth: state.firebase.auth
//   };
// };

// export default connect(
//   null,
//   mapStateToProps
// )(App);

export default App;
