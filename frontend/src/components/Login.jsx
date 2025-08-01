import axios from 'axios';
import React , {useState} from 'react'
import { Link , useNavigate } from 'react-router-dom'
import toast from "react-hot-toast";

function login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const navigateTo = useNavigate();

    const Userregister = async (e) => {
        e.preventDefault();
        if (!email || !password) {
            alert("Please fill all fields");
            return;
        }
        try {
            const {data} = await axios.post(`${import.meta.env.VITE_BACKEND_URI}/user/login`, {
                email,
                password
            },{
                withCredentials: true,
                headers: {
                    "Content-Type": "application/json",
                }
            }
        );
        //console.log(data);
        toast.success(data.message || "User logged in successfully");
        navigateTo("/");
        localStorage.setItem("jwt", data.user.token);
        
        setEmail("");
        setPassword("");
        
        
        } catch (error) {
            console.log("Error while logging user:", error);
            toast.error(error.response.data.error || "Failed to login user");
        }
    }







  return (
    <div className='flex h-screen items-center justify-center bg-gray-400'>
        <div className='w-full max-w-md p-8 bg-gray-200 rounded-lg shadow-lg'>
            <h1 className='text-2xl font-semibold mb-5 text-center'>login Page</h1>
            <form onSubmit={Userregister} className='space-y-4'> 

                <div className='mb-4'>
                    <label className='block mb-2 font-semibold' htmlFor="">Email</label>
                    <input className='w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400' type="text" placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    /> 
                </div> 

                <div className='mb-4'> 
                    <label className='block mb-2 font-semibold' htmlFor="">Password</label>
                    <input className='w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400' type="password" placeholder="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    /> 
                </div> 

                <button type='submit' className='w-full bg-blue-500 text-white hover:bg-blue-900 hover:cursor-pointer duration-200 rounded-lg font-semibold p-3'>login</button>
                <p className='mt-4 text-center text-gray-600'>
                    New user? <Link to="/signup" className='text-blue-500 hover:underline'>Signup</Link></p>
            </form>
        </div>
    </div>
  )
}

export default login