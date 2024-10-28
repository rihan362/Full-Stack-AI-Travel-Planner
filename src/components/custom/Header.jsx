
import { Button } from '../ui/button'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import React,{ useEffect, useState } from 'react';
import GooglePlacesAutocomplete from 'react-google-places-autocomplete';
import { useNavigation } from 'react-router-dom';
import { googleLogout } from '@react-oauth/google';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { FcGoogle } from 'react-icons/fc';
import { useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';


function Header() {
  const user=JSON.parse(localStorage.getItem('user'));
  const [openDialog,setopenDialog]=useState(false);
  const login=useGoogleLogin({
    onSuccess:(codeResp)=>GetUserProfile(codeResp),
    onError:(codeResp)=>console.log(codeResp)
  })

  const GetUserProfile=(tokenInfo)=>{
    axios.get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${tokenInfo?.access_token}`,{
      headers:{
        Authorization:`Bearer ${tokenInfo?.access_token}`,
        Accept:'Application/json'
      }
    }).then((resp)=>{
      console.log(resp);
      localStorage.setItem('user',JSON.stringify(resp.data))
      setopenDialog(false)
      window.location.reload();S
    })
   
  

}


  return (
    <div className='p-2 shadow-sm flex justify-between items-center px-5' >
        <img src="/logo.svg"/>
        <div>
        {user?<div className='flex items-center gap-3'>
          <a href="/my-trip">
          <Button variant="outline"className='rounded-full'>My trips</Button>
          </a>
          <Popover>
            <PopoverTrigger><img src={user?.picture}  className='h-[35px] w-[35px] rounded-full'/></PopoverTrigger>
            <PopoverContent><h2 className="cursor-pointer" onClick={()=>{
              googleLogout();
              localStorage.clear();
              window.location.reload();
            }}>Logout</h2></PopoverContent>
          </Popover>

        </div>:<Button onClick={()=>setopenDialog(true)}>Sign in</Button>
        }
        </div>
        <Dialog open={openDialog}>
  <DialogContent>
    <DialogHeader>
      
      <DialogDescription>
        <img src='/logo.svg'/>
        <h2 className='font-bold text-lg mt-7'>Sign in with Google</h2>
        <p>Sign in to App with Google Authentication securly</p>

        <Button onClick={login} className='w-full mt-5 flex gap-4 items-center'>
           <FcGoogle className='w-7 h-7'/>Sign in with Google</Button>
      </DialogDescription>
    </DialogHeader>
  </DialogContent>
</Dialog>

    </div>
  )
}

export default Header