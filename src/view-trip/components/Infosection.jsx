import React ,{useEffect , useState} from 'react'
import { IoIosSend } from "react-icons/io";
import { Button } from '@/components/ui/button';
import { GetPlaceDetails, PHOTO_REF_URL } from '@/services/GlobalApi';


function Infosection({trip}) {

  const [photoUrl,setphotoUrl]=useState();
  useEffect(()=>{
    trip&GetPlacePhoto();
  },[trip])

  const GetPlacePhoto=async()=>{
    const data={
          textQuery:trip?.userSelection?.location?.label,
    }

    try {
      const result = await GetPlaceDetails(data); // Pass `data` as an argument if required
      console.log(result.data.places[0].photos[3].name); // Log the result data
      // return result.data; // Return the data if needed
      const PHOTO_URL=PHOTO_REF_URL.replace('{NAME}',result.data.places[0].photos[3].name);
      setphotoUrl(PHOTO_URL);
    } catch (error) {
      console.error("Error fetching place details:", error);
    }
  }
  

  return (
    <div>
        <img src={photoUrl} className='h-[340px] w-full object-cover rounded'/>
      <div className='flex justify-between items-center'>
        <div className='my-5 flex flex-col gap-2'>
            <h2 className='font-bold text-2xl'>{trip?.userSelection?.location?.label}</h2>
            <div className='flex gap-5'>
                <h2 className='p-1 px-3 bg-gray-200 rounded-full text-gray-500 text-xs md:text-md'> 📅{trip.userSelection?.noofDays} days</h2>
                <h2 className='p-1 px-3 bg-gray-200 rounded-full text-gray-500 text-xs md:text-md'> 💰 {trip.userSelection?.budget} budget</h2>
                <h2 className='p-1 px-3 bg-gray-200 rounded-full text-gray-500 text-xs md:text-md'>  🍾No of Traveler : {trip.userSelection?.traveler} days</h2>

            </div>
            
         </div>
         <Button><IoIosSend /></Button>
     </div>  
    </div>
  )
}

export default Infosection;