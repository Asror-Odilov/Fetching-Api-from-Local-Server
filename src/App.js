import React, {useState, useEffect} from 'react';
import './App.css';

function App() {

  const [items, setItems] = useState([])
  const [fetchError, setFetchError] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const API = 'http://localhost:3500/items';

  useEffect(() => {
    const fetchData = async () => {
      try{
        const response = await fetch(API)
        if(!response.ok) throw Error('Did not receive data')
        const data = await response.json();
        setItems(data)
        setFetchError(null)
      }catch(err){
        setFetchError(err.message)
      }finally{
        setIsLoading(false)
      }
    }

    setTimeout(()=>{
      (async () => await fetchData())();
    }, 1500)
  }, [])


  return (
    <div className="App">
      <div className="container">
        <h2>Shopping List</h2>
        <ul>
          {isLoading && <p>Loading items...</p>}
          {fetchError && <p>{`Error: ${fetchError}`}</p>}
          {items.map((item) => (
            <li key={item.id}>{item.id}. {item.item}</li>
          ))
          }
        </ul>
      </div>
    </div>
  );
}

export default App;
