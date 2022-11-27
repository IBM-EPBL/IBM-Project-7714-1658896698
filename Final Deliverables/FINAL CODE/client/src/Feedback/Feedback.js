/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import { useState,useEffect } from 'react';
import Axios from 'axios';
import './Feedback.css';

function Feedback() {
  const [feedback,setFeedback]=useState("")
  const [feedbackList,setFeedbackList]=useState([])
  const [searchValue,setSearchValue]=useState("")
  const [username,setUsername]=useState("")
  const [userDetails,setUserDetails]=useState([])

  useEffect(()=>{
    Axios.get("http://localhost:3001/userdetails").then((response)=>{
      setUserDetails(response.data)
    })
  },[userDetails])
 

  useEffect(()=>{
    Axios.get("http://localhost:3001/feedbackDisplay").then((response)=>{
      setFeedbackList(response.data)
    })
    userDetails.map((val)=>{
      setUsername(val.username)
    })
  },[feedbackList])

  const deleteFeedback=(id)=>{
    Axios.post(`http://localhost:3001/feedbackDelete/${id}`);
  };

 

  function handleSubmit() {
    Axios.post("http://localhost:3001/feedback",{feedback:feedback})   
  }

  const emptySearchValue=searchValue.length===0;

 

  return (
    <div class="bg-black">
      <h1 class="green-text App">REVIEWS</h1>
      <h2 class="orange-text"><i>ADD REVIEW</i></h2>
      <h4>Maximum 190 characters</h4>
      <input class="gray-background review" type="text" placeholder='Enter review' onChange={(e)=>{
        setFeedback(e.target.value)
      }}/>
      <span>&nbsp;&nbsp;&nbsp;&nbsp;</span>
      <button class="green-button" disabled={feedback.length<1 || feedback.length>190} onClick={handleSubmit}>Submit</button>
      <br></br>
      <br></br>
      <input class="gray-background" type="text" placeholder='search by review' onChange={(e)=>{
          setSearchValue(e.target.value)
        }} />
      <br></br>
      <h3><i class="orange-text">Sorted by latest</i></h3>
      {emptySearchValue ? feedbackList.map((val)=>{        
        return <div style={{border:"1px solid black",borderRadius:"15px"}}>
          <hr></hr>         
          <h1><span class="gray-text">Name: </span>{val.username}</h1>
          <h1><span class="gray-text">Review: </span>{val.given_feedback}</h1>
          {username===val.username && <button class="add-favorites" onClick={()=>{deleteFeedback(val.id)}}>Delete</button>}
          <br></br>
          <br></br>         
        </div>
      
        }) : feedbackList.filter((products) => (products.given_feedback.toLowerCase()).includes(searchValue.toLowerCase())).map((value) => (
        <div style={{border:"1px solid black",borderRadius:"15px"}}>
          <h1><span class="gray-text">Name: </span>{value.username}</h1>
          <h1><span class="gray-text">Review: </span>{value.given_feedback}</h1>
          {username===value.username && <button class="add-favorites" onClick={()=>{deleteFeedback(value.id)}}>Delete</button>}
          <br></br>
          <br></br>
        </div>
      ))}
    </div>
  )
}

export default Feedback