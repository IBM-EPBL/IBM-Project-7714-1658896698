/* eslint-disable no-unused-vars */
import React, {useState,useEffect} from 'react';
import './Favorites.css';
import { Link,useNavigate } from 'react-router-dom';
import Axios from 'axios';

function Favorites() {

    const [searchValue,setSearchValue]=useState("");
    const [favoritesList,setFavoritesList]=useState([])
    const emptySearchValue=searchValue.length===0;
    let navigate=useNavigate()


    useEffect(()=>{
        Axios.get("http://localhost:3001/favoritesDisplay").then((response)=>{
            setFavoritesList(response.data)
        })
    },[favoritesList])

    const handleFavoritesClick=(idx,name)=>{
        Axios.post("http://localhost:3001/removeFavorites",{id:idx,username:name}).then((response)=>{        
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
            
            {emptySearchValue ? favoritesList.map((val)=>{        
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
                        
                    <button class="add-favorites" onClick={()=>{handleFavoritesClick(val.id,val.username)}}>Remove from favorites</button>
                    <hr></hr>
                </div>
                    
                
                }) : favoritesList.filter((favorite) => (favorite.prediction.toLowerCase()).includes(searchValue.toLowerCase())).map((filteredFavorites) => (
                <div>
                    <table class="my-table">
                        <tr>
                            <td class="my-td"><h3>{filteredFavorites.id}</h3></td>
                            <td class="my-td"><h3>{filteredFavorites.education}</h3></td>
                            <td class="my-td"><h3>{filteredFavorites.joiningYear}</h3></td>
                            <td class="my-td"><h3>{filteredFavorites.city}</h3></td>
                            <td class="my-td"><h3>{filteredFavorites.paymentTier}</h3></td>
                            <td class="my-td"><h3>{filteredFavorites.age}</h3></td>
                            <td class="my-td"><h3>{filteredFavorites.gender}</h3></td>
                            <td class="my-td"><h3>{filteredFavorites.everBenched}</h3></td>
                            <td class="my-td"><h3>{filteredFavorites.experience}</h3></td>
                            <td class="my-td"><h3>{filteredFavorites.prediction}</h3></td>
                            <td class="my-td"><h3>{filteredFavorites.algorithmUsed}</h3></td>
                            <td class="my-td"><h3>{filteredFavorites.accuracyScore}</h3></td>
                            <td class="my-td"><h3>{filteredFavorites.dateAndTime}</h3></td>
                        </tr>          
                    </table>
                        
                    <button class="add-favorites" onClick={()=>{handleFavoritesClick(filteredFavorites.id,filteredFavorites.username)}}>Remove from favorites</button>
                    <hr></hr>    
                </div>
            ))}
        </div>
    )
}

export default Favorites