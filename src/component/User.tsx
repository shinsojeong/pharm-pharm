import * as React from 'react';
import { Route, Switch } from 'react-router-dom';

import Home from './start/Home';
import Camera from './camera/Camera';
import CreateMediInfo from './camera/CreateMediInfo';
import MediSearch from './camera/MediSearch';
import ScheDetail from './schedule/ScheDetail';
import Search from './search/Search';
import SearchDetail from './search/SearchDetail';

export default function User2() {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/user/home" component={Home}/>
        <Route exact path="/user/camera" component={Camera}/>
        <Route exact path="/user/create-medi-info" component={CreateMediInfo}/>
        <Route exact path="/user/medi-search" component={MediSearch}/>
        <Route exact path="/user/sche-detail" component={ScheDetail}/>
        <Route exact path="/user/user/search" component={Search}/>
        <Route exact path="/user/search-detail" component={SearchDetail}/>
      </Switch>
    </div>
  );
}