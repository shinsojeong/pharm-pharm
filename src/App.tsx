import * as React from 'react';
import { Route, Routes } from 'react-router-dom';
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
      <Routes>
        <Route path="/" element={<Login/>}/>
        <Route path="/user/*" element={<User/>}/>
      </Routes>
      { loading && <Loading/> }
    </div>
  );
}