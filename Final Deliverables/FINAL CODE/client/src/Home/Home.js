/* eslint-disable no-unused-vars */
import React from 'react';
import { useState,useEffect } from 'react';
import { useSelector } from "react-redux";
import { Link,useNavigate } from 'react-router-dom';
import Axios from 'axios';
import { useDispatch } from "react-redux";
import { login, logout } from '../Features/user';
import { AiFillHome,AiOutlineClose,AiOutlineSearch } from "react-icons/ai";
import { GiHamburgerMenu } from "react-icons/gi";
import './Home.css';


function Home() {
  const user = useSelector((state) => state.user.value);
  const dispatch = useDispatch();
  const [userDetails,setUserDetails]=useState([])
  const [homeList,setHomeList]=useState([])
  let navigate=useNavigate()

  useEffect(()=>{
    Axios.get("http://localhost:3001/userdetails").then((response)=>{
      setUserDetails(response.data)
    })
  },[userDetails])

  useEffect(()=>{
    Axios.get("http://localhost:3001/home").then((response)=>{
      setHomeList(response.data)
    })
  },[homeList])

  function handleClickFuture() {
    navigate("/predictFuture")
  }

  function handleClickBenched() {
    navigate("/predictBenched")
  }

  const handleLogOut=()=>{
    Axios.delete("http://localhost:3001/logout")
    dispatch(logout());
  }
  
  return (
    <div>
      <div class="bg-img-crudes">
        <div className='title-bar-body'>
          <span className="home-icon" title="Home Page" alt="Home Page"><AiFillHome /></span>
          <span className="crude-title">Crude 7 Predictor</span>
          <Link to="/history" className='links products-link'>History</Link>
          <Link to="/favorites" className=' links favorites-link'>Favorites</Link>
          <Link to="/feedback" className=' links feedback-link'>Review</Link>
          <Link to="/rating" className='links rating-link'>Rating</Link>
          <Link to="/account" className='links account-link'>Account</Link>
        </div>
        <div className="hamburger-surrounding-area">
          <button className="hamburger-button">
              <span className="hamburger-icon"><GiHamburgerMenu /></span>
          </button>
          <ul type="None" className="pop-out-menu">
            <li class="side-links"><Link class="white-text" to="/history">History</Link></li>
            <li class="side-links"><Link class="white-text" to="/favorites">Favorites</Link></li>
            <li class="side-links"><Link class="white-text" to="/feedback">Review</Link></li>
            <li class="side-links"><Link class="white-text" to="/rating">Rating</Link></li>
            <li class="side-links"><Link class="white-text" to="/account">Account</Link></li>
          </ul>
        </div>  
        <br></br><br></br><br></br><br></br><br></br>
        <div class="wrap">
          <button class="predict-button white-text" onClick={handleClickFuture}>Predict crude oil<br></br>value</button>
        </div> 
      </div> 
    </div>
    
  )
}

export default Home