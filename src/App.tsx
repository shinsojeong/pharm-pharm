import * as React from 'react';
import { Route, Switch } from 'react-router-dom';

import Landing from './component/start/Landing';
import Login from './component/start/Login';
import User from './component/User';

import './style/App.scss';

export default function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/" component={Landing}/>
        <Route exact path="/login" component={Login}/>
        <Route path="/user" component={User}/>
      </Switch>
    </div>
  );
}