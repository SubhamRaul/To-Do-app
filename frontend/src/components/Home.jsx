import React, { useEffect, useState } from 'react'
import axios from 'axios'
import toast from 'react-hot-toast';
import { Navigate } from 'react-router-dom';

function Home() {

    const [todos , setTodos] = useState([]);    
    const [error , setError] = useState(null);
    const [loading , setLoading] = useState(false);

    

    useEffect(() => {
        const fetchTodos = async () => {
            setLoading(true);
            try {
                const response = await axios.get("http://localhost:3000/todo/fetch",{
                    withCredentials: true,
                    headers:{
                        "Content-Type": "application/json",
                    }
                });
                console.log(response.data.todos);
                
                setTodos(response.data.todos);
                setError(null);
            } catch (error) {
                setError("failed to fetch todos");
            } finally{
                setLoading(false);
            }
        }
        
        fetchTodos();
    } , [])

    const [newtodo , setNewTodo] = useState("");

    const todoCreate = async () => {
        if(!newtodo) return;
        try {
            const response = await axios.post("http://localhost:3000/todo/create",
            {
                text:newtodo,
                completed:false,
            },
            {
                withCredentials: true,
            });
            console.log((response.data.newtodo));

            if (response.data.newtodo) {
                setTodos([...todos, response.data.newtodo]);
            }
            setNewTodo("");
        } catch (error) {
            setError("failed to create todo");
        }

    }

    const todoStatus = async (id)=>{
        const todo = todos.find((todo) => todo._id === id);
        try {
            const response = await axios.put(`http://localhost:3000/todo/update/${id}`,{
                ...todo,
                completed: !todo.completed,
            },{
                withCredentials:true,
            });
            setTodos(todos.map((t)=>(t._id === id ? response.data.todo : t)));

        } catch (error) {
            setError("failed to update todo status"); 
        }
    }

    const todoDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:3000/todo/delete/${id}`,{
                withCredentials:true,
            });
            setTodos(todos.filter((todo) => todo._id !== id));
        } catch (error) {
            setError("failed to delete todo");
        }
    }
    const remainingTodo = todos.filter((todo)=>( todo && !todo.completed)).length;


    const logout = async ()=>{
        try {
            await axios.get("http://localhost:3000/user/logout");
            toast.success("Logged out successfully");
            <Navigate to = {"/login"}/>
            localStorage.removeItem("jwt");
            
        } catch (error) {
            toast.error("Error logging out");
        }
    }








  return (
    <div className=' my-10 bg-gray-100 max-w-lg lg:max-w-xl rounded-lg shadow-lg mx-8 sm:mx-auto p-6 '>
        <h1 className='text-2xl font-semibold text-center'>Todo App</h1>
        <div className='flex mb-4'>
            <input type="text" placeholder='Add a new todo'
            value={newtodo} 
            onChange={(e)=>{setNewTodo(e.target.value)}}
            onKeyDown={(e) => e.key === "Enter" && todoCreate()}
            className='flex-grow bg-white rounded-l-md p-2 focus:outline-none'
            />
            <button className='bg-blue-500 rounded-r-md text-white px-4 py-2 hover:bg-blue-900 duration-200' onClick={todoCreate}>Add</button>
        </div>

        {
            loading?( <div className="text-center justify-center"><span className="textgray-500">Loading...</span></div>):error?( <div className="text-center text-red-600 font-semibold">{error}</div> ):(
                <ul className='space-y-2'>
            {todos.map((todo,index) => (
                <li key={todo._id || index} className='flex items-center justify-between p-3 bg-gray-100 rounded-md'>

                <div className='flex items-center'>
                    <input type="checkbox" checked={todo.completed} onChange={()=>{todoStatus(todo._id)}} className='mr-2' />

                    <span className={`${todo.completed ? "line-through text-gray-500" : " text-gray-800 font-medium"}`}>{todo.text}</span>
                </div>

                <button onClick={()=>{todoDelete(todo._id)}} className='text-red-500 hover:text-red-900 duration-150'>delete</button>
                </li>
            ))
            }
                </ul>
            )
        }

        


        <p className='text-center text-sm text-gray-700'>{remainingTodo} remaining todos</p>

        <button onClick={()=>logout()} className='mt-6 px-4 py-2 bg-red-500 rounded-md text-white hover:bg-red-800 duration-200 mx-auto block'>Logout</button>
    </div>


  )
}

export default Home