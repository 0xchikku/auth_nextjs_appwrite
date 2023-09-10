"use client"; // to make it client side component
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import Link from "next/link";
import toast, { Toaster } from 'react-hot-toast';

export default function SignupPage(){

  const router = useRouter();
  const [user, setUser] = useState({
    email: "",
    username: "",
    password: "",
  });
  const [isDisabled, setIsDisabled] = useState(true);
  const [loading, setLoading] = useState(false);

  const onSignUp = async () => {
    try{
      setLoading(true);
      // throw new Error("Maunal")
      const response = await axios.post("/api/users/signup", user);
      console.log("🚀 ~ file: page.tsx:24 ~ onSignUp ~ response:", response)
      switch(response.data.status){
        case 201:{
          console.log("Sign up response", response);
          router.push("/login");
          toast.success(response.data.message);
          break;
        }
        case 400:{
          console.log("Bad Request", response);
          toast.error(response?.data?.message);
          break;
        }
        default:{
          console.log("Something went wrong");
          toast.error("Something went wrong");
        }
      }
      
    }catch(err:any){
      console.log("Error while signup: ", err);
      if(err?.response?.status === 400){
        toast.error(err.response?.data?.message);
      }else{
        toast.error("Something went wrong");
      }
    }finally{
      setLoading(false);
    }
  }

  // not a good practice to use 'any' type
  const handleChange = (e:any) => {
    const field = e.target.id;
    const value = e.target.value.trim().toLowerCase();
    setUser({
      ...user,
      [field]: value
    })
  }

  useEffect(() => {
    if(user.email.length > 0 && user.password.length > 0 && user.username.length > 0){
      setIsDisabled(false);
    }else{
      setIsDisabled(true);
    }
  }, [user]);

  return(
    <div className="flex flex-col items-center
    justify-center min-h-screen py-2">
      <header><h1>{loading ? "Processing" : "SignUp"}</h1></header>
      <br/>

      <label htmlFor="username">username</label>
      <input 
        className="p-2 border border-gray-300 rounded-lg
                  mb-4 focus:outline-none focus:border-gray-600 text-black"   
        type="text" 
        id="username"
        value={user.username}
        onChange={(e) => handleChange(e)}
        placeholder="username"
        />
      
      <label htmlFor="email">email</label>
      <input 
          className="p-2 border border-gray-300 rounded-lg
                    mb-4 focus:outline-none focus:border-gray-600 text-black"
          type="email"
          id="email"
          value={user.email}
          onChange={(e) => handleChange(e)}
          placeholder="email"
        />

      <label htmlFor="password">password</label>
      <input 
          className="p-2 border border-gray-300 rounded-lg
                    mb-4 focus:outline-none focus:border-gray-600 text-black"
          type="password"
          id="password"
          value={user.password}
          onChange={(e) => handleChange(e)}
          placeholder="password"
        />

      <button 
        className="p-2 border border-gray-300 rounded-lg
                  mb-4 focus:outline-none focus:border-gray-600"
        onClick={() => onSignUp()}  
        disabled={isDisabled} 
      >SignUp</button>
      
      <Link href="/login">Login</Link>
      <Toaster/>
    </div>
  );
}