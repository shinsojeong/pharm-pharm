import * as React from 'react';
import { Route, Switch } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { RootState } from './module/store';

import Login from './component/start/Login';
import User from './component/User';
import Loading from './component/utill/Loading';

import './style/App.scss';

export default function App() {
  const { loading } = useSelector((state: RootState) => state.schedule.states);

  return (
    <div className="App">
      <Switch>
        <Route exact path="/" component={Login}/>
        <Route path="/user" component={User}/>
      </Switch>
      { loading && <Loading/> }
    </div>
  );
}