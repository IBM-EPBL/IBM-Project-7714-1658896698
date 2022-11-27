/* eslint-disable no-unused-vars */
import React, {useState,useEffect} from 'react';
import './History.css';
import { Link,useNavigate } from 'react-router-dom';
import Axios from 'axios';

function History() {

    const [searchValue,setSearchValue]=useState("");
    const [predictionsList,setPredictionsList]=useState([])
    const emptySearchValue=searchValue.length===0;
    let navigate=useNavigate()


    useEffect(()=>{
        Axios.get("http://localhost:3001/historyDisplay").then((response)=>{
            setPredictionsList(response.data)
        })
    },[predictionsList])

    const handleFavoritesClick=(idx,name)=>{
        Axios.post("http://localhost:3001/addFavorites",{id:idx,username:name}).then((response)=>{        
        })  
    }


    return (
        <div class="bg-black">
            <input class="gray-background" type="text" placeholder='search' onChange={(e)=>{
                setSearchValue(e.target.value)
            }} />
            <br></br> 

            <table class="my-table">
                <tr>
                    <th class="my-th"><h2 class="green-text">ID</h2></th>
                    <th class="my-th"><h2 class="green-text">Day</h2></th>
                    <th class="my-th"><h2 class="green-text">Month</h2></th>
                    <th class="my-th"><h2 class="green-text">Year</h2></th>
                    <th class="my-th"><h2 class="green-text">Prediction</h2></th>
                    <th class="my-th"><h2 class="green-text">Algorithm used</h2></th>
                    <th class="my-th"><h2 class="green-text">Accuracy score</h2></th>
                    <th class="my-th"><h2 class="green-text">Date and time</h2></th>
                    </tr>
            </table>
            
            {emptySearchValue ? predictionsList.map((val)=>{        
                return <div>        
                    <table class="my-table">
                        <tr>
                            <td class="my-td"><h3>{val.id}</h3></td>
                            <td class="my-td"><h3>{val.day}</h3></td>
                            <td class="my-td"><h3>{val.month}</h3></td>
                            <td class="my-td"><h3>{val.year}</h3></td>
                            <td class="my-td"><h3>{val.prediction}</h3></td>
                            <td class="my-td"><h3>{val.algorithmUsed}</h3></td>
                            <td class="my-td"><h3>{val.accuracyScore}</h3></td>
                            <td class="my-td"><h3>{val.dateAndTime}</h3></td>
                        </tr>          
                    </table>
                        
                    <button class="add-favorites" onClick={()=>{handleFavoritesClick(val.id,val.username)}}>Add to favorites</button>
                    <hr></hr>
                </div>
                    
                
                }) : predictionsList.filter((history) => (history.prediction.toLowerCase()).includes(searchValue.toLowerCase())).map((filteredHistory) => (
                <div>
                    <table class="my-table">
                        <tr>
                            <td class="my-td"><h3>{filteredHistory.id}</h3></td>
                            <td class="my-td"><h3>{filteredHistory.education}</h3></td>
                            <td class="my-td"><h3>{filteredHistory.joiningYear}</h3></td>
                            <td class="my-td"><h3>{filteredHistory.city}</h3></td>
                            <td class="my-td"><h3>{filteredHistory.paymentTier}</h3></td>
                            <td class="my-td"><h3>{filteredHistory.age}</h3></td>
                            <td class="my-td"><h3>{filteredHistory.gender}</h3></td>
                            <td class="my-td"><h3>{filteredHistory.everBenched}</h3></td>
                            <td class="my-td"><h3>{filteredHistory.experience}</h3></td>
                            <td class="my-td"><h3>{filteredHistory.prediction}</h3></td>
                            <td class="my-td"><h3>{filteredHistory.algorithmUsed}</h3></td>
                            <td class="my-td"><h3>{filteredHistory.accuracyScore}</h3></td>
                            <td class="my-td"><h3>{filteredHistory.dateAndTime}</h3></td>
                        </tr>          
                    </table>
                        
                    <button class="add-favorites" onClick={()=>{handleFavoritesClick(filteredHistory.id,filteredHistory.username)}}>Add to favorites</button>
                    <hr></hr>    
                </div>
            ))}
        </div>
    )
}

export default History