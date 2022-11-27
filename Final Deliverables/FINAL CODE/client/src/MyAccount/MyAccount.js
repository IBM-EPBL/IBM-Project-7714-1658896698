/* eslint-disable no-unused-vars */
import React from 'react';
import { useState,useEffect } from 'react';
import Axios from 'axios';
import { useSelector } from "react-redux";
import { Link,Navigate,useNavigate } from 'react-router-dom';
import { useDispatch } from "react-redux";
import { login, logout } from '../Features/user';
import './MyAccount.css';

function MyAccount() {
  const user = useSelector((state) => state.user.value);
  const dispatch = useDispatch();
  const[accountList,setAccountList]=useState([])
  let navigate=useNavigate()


  useEffect(()=>{
    Axios.get("http://localhost:3001/accountDisplay").then((response)=>{
      setAccountList(response.data)
    })
  },[accountList])

  const handleLogOut=()=>{
    Axios.delete("http://localhost:3001/logout")
    dispatch(logout());
    navigate("/")
  }

  const deleteAccount=()=> {
    Axios.post("http://localhost:3001/accountDelete")
    navigate("/")
    alert("Account deleted successfully")
  }

  return (
    <div class="App bg-black">
      <div class="yellow-green-color"><h1>MY&nbsp;ACCOUNT</h1></div>
      {accountList.map((val)=>{        
        return <div>         
          <h1><span class="gray-text">Username: </span>{val.username}</h1>
          <h1><span class="gray-text">Password: </span>*******</h1>
          <h1><span class="gray-text">First time login: </span>{val.first_time_login===0 ? <span>No</span> : <span>Yes</span>}</h1>
          <br></br>
          <div><br></br></div>
          <div><br></br></div>   
          <button class="logout" onClick={handleLogOut}>Logout</button>
          <div><br></br></div>
          <div><br></br></div>
          <button class="delete-account" onClick={deleteAccount}>Delete account</button>
        </div>
      
      })}

    </div>
  )
}

export default MyAccount