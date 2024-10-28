import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { SelectBudgetOption } from '@/constants/option';
import { SelectTravelList } from '@/constants/option';
import React,{ useEffect, useState } from 'react';
import GooglePlacesAutocomplete from 'react-google-places-autocomplete';
import { toast } from 'sonner';
import { AI_PROMPT, chatSession } from '@/services/AIModal';
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
import { doc, setDoc } from "firebase/firestore";
import { db } from '@/services/firebaseConfig'; 
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { useNavigate } from 'react-router-dom';




function CreateTrip() {
  const [place,setplace]=useState();
  const [formdata,setformdata]=useState([]);
  const [openDialog,setopenDialog]=useState(false);
  const [loading,setloading]=useState(false);
  const navigate=useNavigate();
  const handleInputChange=(name,value)=>{

    setformdata({
      ...formdata,
      [name]:value
    })
  }

  useEffect(()=>{
    console.log(formdata);
  },[formdata])




  const login=useGoogleLogin({
    onSuccess:(codeResp)=>GetUserProfile(codeResp),
    onError:(codeResp)=>console.log(codeResp)
  })
   const onGenerateTrip=async()=>{

    const user=localStorage.getItem('user');
    if(!user)
    {
      setopenDialog(true);
      return;
    }
    if(formdata?.noofDays>5 && !formdata?.location || !formdata?.traveler || !formdata?.budget)
    {
      toast('Please fill the entire details')
      return;
    }
    setloading(true)
    const FINAL_PROMPT=AI_PROMPT
    .replace('{location}',formdata?.location?.label)
    .replace('{totaldays}',formdata?.noofDays)
    .replace('{traveler}',formdata?.traveler)
    .replace('{budget}',formdata?.budget)
    .replace('{totaldays}',formdata?.noofDays)
    
    console.log(FINAL_PROMPT)
    const result=await chatSession.sendMessage(FINAL_PROMPT);

    console.log(result?.response?.text());
    setloading(false)
    SaveAiTrip(result?.response?.text());
  }


  const SaveAiTrip=async(TripData)=>{
    setloading(true)
    const user=JSON.parse(localStorage.getItem('user'))
    const docId=Date.now().toString()
    await setDoc(doc(db, "AItrips", docId), {
      userSelection:formdata,
      tripdata:JSON.parse(TripData),
      userEmail:user?.email,
      id:docId

    })
    setloading(false)
    navigate('/view-trip/'+docId)
  }


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
        onGenerateTrip();
      })
     
    

  }

  return (
    <div className='sm:px-10 md:px-32 lg:px-56 xl:px-10 px-5 mt-10'>
      <h2 className='font-bold text-3xl'>Tell us Your Travel Preferences</h2>
      <p className='mt-3 text-gray-500 text-xl'>
        Just provide some basic information, and our trip planner will generate a customized itinerary based on your preferences.✈️
      </p>

      <div className='mt-20 flex flex-col gap-10'>
        <div>
          <h2 className="text-xl my-6 font-medium">What is the destination that you want to choose?</h2>
          <GooglePlacesAutocomplete apiKey={import.meta.env.VITE_GOOGLE_API_KEY} selectProps={{
            place,onChange:(v)=>{setplace(v); handleInputChange('location',v)}
          }}/>
        </div>
      </div>

      <div>
      <h2 className="text-xl my-6 font-medium">How many days you wants to enjoy</h2>
      
      <Input placeholder={'EX.3'} type='number' onChange={(e)=>handleInputChange('noofDays',e.target.value)}/>
      </div>

      <div>
      <h2 className="text-xl my-6 font-medium">What is your budget </h2>
      
      <div className='grid grid-cols-3 gap-6 mt-5'>
        {SelectBudgetOption.map((item,index)=>(
          <div key={index} onClick={()=>handleInputChange('budget',item.title)} className={`p-4 border rounded-lg hover:shadow-large cursor-pointer ${formdata?.budget==item.title &&'shadow-lg border-black' }`}  >
            <h2 className='font-bold text-lg'>{item.title}</h2>
            <h2 className='text-sm text-gray-600'>{item.desc}</h2>
            
            
          </div>
        ))
       }  
       </div>
      </div>
      <div>
      <h2 className="text-xl my-6 font-medium">How do you want to travel </h2>
      
      <div className='grid grid-cols-3 gap-6 mt-5'>
        {SelectTravelList.map((item,index)=>(
          <div key={index} onClick={()=>handleInputChange('traveler',item.people)} className={`p-4 border rounded-lg hover:shadow-large cursor-pointer ${formdata?.traveler==item.people &&'shadow-lg border-black' }`}>
            <h2 className='font-bold text-lg'>{item.title}</h2>
            <h2 className='text-sm text-gray-600'>{item.desc}</h2>
            
            
          </div>
        ))
       }  
       </div>
      </div>
      <div className='my-10 justify-end flex'>

      <Button disabled={loading} onClick={onGenerateTrip} >{loading? <AiOutlineLoading3Quarters className='w-7 h-7 animate-spin'/>:'Generate Trip'}</Button>
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
  );
}

export default CreateTrip;