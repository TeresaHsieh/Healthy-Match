import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

// App Components
import Home from "./Home";
import DailyRecord from "./DailyRecord";
import History from "./History";
import MatchStatus from "./MatchStatus";
import Member from "./Member";
import NotFound from "./NotFound";


const App = () => (
  <BrowserRouter>
    <div>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/daily-record" component={DailyRecord} />
        <Route path="/history" component={History} />
        <Route path="/match-status" component={MatchStatus} />
        <Route path="/member" component={Member} />
        <Route component={NotFound} />
      </Switch>
    </div>
  </BrowserRouter>
);

export default App;
