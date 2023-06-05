import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Homepage from './pages/Homepage';
import CoinPage from './pages/CoinPage';

const MyRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Homepage/>} exact/>
      <Route path="/coins/:id" element={<CoinPage/>} />
    </Routes>
  );
}

export default MyRoutes;