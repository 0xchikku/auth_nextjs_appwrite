'use client'

import toast, { Toaster } from "react-hot-toast";
import axios from "axios";
import { useEffect, useState } from "react";
import Link from "next/link";


export default function ProfilePage() {

  const [userDetails, setUserDetails] = useState<any>(null);


  const onLoad = async () => {
    try{
      const response: any = await axios.get('/api/users/details');
      console.log("🚀 ~ file: page.tsx:16 ~ onLoad ~ response:", response)
      setUserDetails(response.data.user);
    }catch(err){
      console.log("Error while fetching user details, ", err);
      toast.error("Something went wrong");
    }

  }

  useEffect(() => {
    if(!userDetails){
      onLoad();
    }
  }, [userDetails])

  const userProfile = async (username:any) => {
    <Link href={`/profile/${username}`}></Link>
  }

  return (
    <div className="flex flex-col items-center
    justify-center min-h-screen py-2">
      <header>
        <h1>Profile Page</h1>
      </header>
      <hr />
      {userDetails 
        && <div className="p-4 m-4 border border-gray-400 rounded-lg bg-white text-black"
        >
            <Link href={`/profile/${userDetails.username}`}>
              <h2 className="text-lg text-center">{userDetails.username || "No Data"}</h2>
              <h4 className="text-sm text-center">{userDetails.email || "No Data"}</h4>
            </Link>
          </div>
      }
      <Toaster />
    </div>
  );
}