import * as React from "react";
import { Route, Switch } from 'react-router-dom';

//import components

import './style/App.scss';

export default function App() {
  return (
    <div className="App">
      <Switch>
        {/* <Route exact path="/" component={Landing}/> */}
      </Switch>
    </div>
  );
}