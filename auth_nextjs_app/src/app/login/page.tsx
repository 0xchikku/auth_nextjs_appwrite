"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast, { Toaster } from 'react-hot-toast';

export default function LoginPage(){

  const router = useRouter();
  const [user, setUser] = useState({
    email: "",
    password: ""
  });
  const [isDisabled, setIsDisabled] = useState(true);
  const [isLoading, setIsLoading] = useState(false);


  const onLogin = async () => {
    try {
      setIsLoading(true);
      // throw new Error("Manual: Client side Error");
      const response = await axios.post("/api/users/login", user);
      console.log('Login Successfull', response);
      toast.success(response?.data?.message || "Login Successfull");
      router.push("/profile/" + response.data.user.username);
    } catch (err:any) {
      console.log("Error while login: ", err);
      if(err?.response?.status === 400){
        toast.error(err.response.data.message)
      }else{
        toast.error(err.message || "Something went wrong");
      }
    }finally{
      setIsLoading(false);
    }
  }

  useEffect(() => {
    if(user.email.length > 0 && user.password.length > 0){
      setIsDisabled(false);
    }else{
      setIsDisabled(true);
    }
  }, [user]);

  const handleChange = (e:any) => {
    const field = e.target.id;
    const value = e.target.value;

    setUser({
      ...user,
      [field]: value,
    });
  }

  return(
    <div className="flex flex-col items-center
      justify-center min-h-screen py-2">
      <header><h1>Login</h1></header>
      <br />

      <label htmlFor="email">email</label>
      <input 
        className="p-2 border border-gray-300 rounded-lg
                  mb-4 focus:outline-none focus:border-gray-600 text-black"
        id="email"
        type="email"
        placeholder="email"
        value={user.email}
        onChange={(e) => handleChange(e)}
      />

      <label htmlFor="password">password</label>
      <input 
        className="p-2 border border-gray-300 rounded-lg
                  mb-4 focus:outline-none focus:border-gray-600 text-black"
        id="password"
        type="password"
        placeholder="password"
        value={user.password}
        onChange={(e) => handleChange(e)}
      />

      <button 
        className="p-2 border border-gray-300 rounded-lg
                  mb-4 focus:outline-none focus:border-gray-600"
        onClick={() => onLogin()}
        disabled={isDisabled}
        >
        {isLoading ? "Processing" : "Login"}
      </button>

      <Link href="/signup">SignUp</Link>
      <Toaster/>
    </div>
  );

}