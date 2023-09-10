// no use of ' use client '
"use client"

import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function UserProfile({params}: any){

  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const onLogout = async () => {
    try{
      setIsLoading(true);
      const response = await axios.get('/api/users/logout');
      toast.success(response?.data?.message || "Logged Out Succesfully");
      router.push("/login");
    }catch(err:any){
      console.log("Error while logging out", err);
      toast.error("Something went wrong");
    }finally{
      setIsLoading(false);
    }
  }


  return(
    <div className="flex flex-col items-center
    justify-center min-h-screen py-2">

      <header>
        <h1>User Profile</h1>
      </header>
      <hr />

      <div
      className="border rounded-lg border-gray-300 
        focus:outline-none focus:border-gray-800 p-2 m-2">
        <p className="flex flex-col items-center justify-center text-4xl p-2">
          User Profile: { }
          <span className="p-2 rounded bg-green-300 text-black">
            {params.id}
          </span>
        </p>
      </div>
      <hr />

      <button 
        className="p-2 border border-gray-300 rounded-lg
        mb-4 focus:outline-none focus:border-gray-600"
        onClick={() => onLogout()} 
      >
        {isLoading ? "Processing" : "Logout"}
      </button>

      <Toaster />
    </div>
  );
}