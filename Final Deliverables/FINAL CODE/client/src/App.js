/* eslint-disable no-unused-vars */
import React from 'react';
import Axios from 'axios';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import './App.css';
import ProtectedRoutes from './ProtectedRoutes/ProtectedRoutes';
import Login from './Login/Login';
import Register from './Login/Register';
import Home from './Home/Home';
import MyAccount from './MyAccount/MyAccount';
import Test from './Test/Test';
import PredictFuture from './Prediction/PredictFuture';
import FuturePrediction from './Prediction/FuturePrediction';
import Form from './Components/Form';
import History from './History/History';
import Favorites from './History/Favorites';
import Feedback from './Feedback/Feedback';
import Rating from './Rating/Rating';




function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" exact element={<Login />} />
          <Route path="register" exact element={<Register />} />
          <Route element={<ProtectedRoutes />} >
            <Route path="home" exact element={<Home />} />    
            <Route path="account" exact element={<MyAccount />} />    
            <Route path="test" exact element={<Test />} />
            <Route path="predictFuture" exact element={<PredictFuture />} />       
            <Route path="futurePrediction" exact element={<FuturePrediction />} />   
            <Route path="form" exact element={<Form />} />
            <Route path="history" exact element={<History />} /> 
            <Route path="favorites" exact element={<Favorites />} />
            <Route path="feedback" exact element={<Feedback />} />
            <Route path="rating" exact element={<Rating />} />
          </Route>
        </Routes>
      </div>
    </Router>

  );
}

export default App;
