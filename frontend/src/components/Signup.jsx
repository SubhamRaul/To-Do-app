import axios from 'axios';
import React , {useState} from 'react'
import { Link , useNavigate } from 'react-router-dom'
import toast from "react-hot-toast";

function Signup() {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const navigateTo = useNavigate();

    const Userregister = async (e) => {
        e.preventDefault();
        if (!username || !email || !password) {
            alert("Please fill all fields");
            return;
        }
        try {
            const {data} = await axios.post("http://localhost:3000/user/signup", {
                username,
                email,
                password
            },{
                withCredentials: true,
                headers: {
                    "Content-Type": "application/json",
                }
            }
        );
        console.log(data);
        toast.success(data.message || "User registered successfully");
        localStorage.setItem("jwt", data.token);
        
        setUsername("");
        setEmail("");
        setPassword("");
        navigateTo("/login");
        
        } catch (error) {
            console.log("Error registering user:", error);
            toast.error(error.response.data.error || "Failed to register user");
        }
    }







  return (
    <div className='flex h-screen items-center justify-center bg-gray-400'>
        <div className='w-full max-w-md p-8 bg-gray-200 rounded-lg shadow-lg'>
            <h1 className='text-2xl font-semibold mb-5 text-center'>Signup Page</h1>
            <form onSubmit={Userregister} className='space-y-4'>
                <div className='mb-4 '>
                    <label className='block mb-2 font-semibold' htmlFor="">Username</label>
                    <input className='w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400' type="text" placeholder="Username" 
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    /> 
                </div>  

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

                <button type='submit' className='w-full bg-blue-500 text-white hover:bg-blue-900 hover:cursor-pointer duration-200 rounded-lg font-semibold p-3'>Signup</button>
                <p className='mt-4 text-center text-gray-600'>
                    Already have an account? <Link to="/login" className='text-blue-500 hover:underline'>Login</Link></p>
            </form>
        </div>
    </div>
  )
}

export default Signup