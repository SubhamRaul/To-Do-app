import React, { useEffect, useState } from 'react'
import axios from 'axios'

function Home() {

    const [todos , setTodos] = useState([]);    
    const [error , setError] = useState(null);
    const [loading , setLoading] = useState(false);

    useEffect(() => {
        const fetchTodos = async () => {
            try {
                setLoading(true);
                const response = await axios.get("http://localhost:3000/todo/fetch",{
                    withCredentials: true,
                    headers:{
                        "Content-Type": "application/json",
                    }
                });
                console.log(response.data);
                
                setTodos(response.data);
                setError(null);
            } catch (error) {
                setError("failed to fetch todos");
            } finally{
                setLoading(false);
            }
        }

        fetchTodos();
    } , [])

    // const todoCreate

  return (
    <div>Home</div>
  )
}

export default Home