import * as React from 'react';
import { Route, Routes } from 'react-router-dom';

import Home from './start/Home';
import Camera from './camera/Camera';
import CreateMediInfo from './camera/CreateMediInfo';
import ScheDetail from './schedule/ScheDetail';
import Search from './search/Search';
import SearchDetail from './search/SearchDetail';
import Mypage from './mypage/Mypage';
import Nav from './utill/Nav';
import Top from './utill/Top';

export default function User() {
  return (
    <div className="User">
      <Top/>
        <Routes>
          <Route path="/home" element={<Home/>}/>
          <Route path="/camera" element={<Camera/>}/>
          <Route path="/create-medi-info" element={<CreateMediInfo/>}/>
          <Route path="/sche-detail" element={<ScheDetail/>}/>
          <Route path="/search" element={<Search/>}/>
          <Route path="/search-detail" element={<SearchDetail data="" setModalState/>}/>
          <Route path="/mypage" element={<Mypage/>}/>
        </Routes>
      <Nav/>
    </div>
  );
}