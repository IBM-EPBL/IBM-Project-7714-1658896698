import { useState } from 'react';
import { Link,useNavigate } from 'react-router-dom';

function SearchBar() {
  let navigate=useNavigate();
  const [searchedText, setSearchedText] = useState("");
  

  const onSearch = () => {
    fetch('/abc',{
      method: 'POST',
      body: JSON.stringify([searchedText,searchedText])
    }).then(response => response.json()
      .then(data => ({ data, response })))
      .then(({ data, response }) =>  {
        console.log(data)
    })
    navigate("/test")
  };
  return (
    <div>
      <form>
        <input
          name="nm" placeholder="Enter keyword..."
          onChange={(e) => {
            setSearchedText(e.target.value);
          }}></input>
        <input type="submit" onClick={onSearch}/>
      </form>
    </div>  
  );
  
}
export default SearchBar;
