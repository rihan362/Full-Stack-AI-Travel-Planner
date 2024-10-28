import React,{useEffect,useState} from 'react'
import { GetPlaceDetails, PHOTO_REF_URL } from '@/services/GlobalApi';
import { Link } from 'react-router-dom';

function Usercarditem({trip}) {
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
    <Link to={'/view-trip/'+trip?.id}>
     <div className='hover:scale-105 transition-all'>
        <img src={photoUrl?photoUrl:'/placeholder2.jpg'} className='object-cover rounded-xl'/>
        <div>
            <h2 className='font-bold text-lg'>{trip?.userSelection?.location?.label}</h2>
            <h2 className='text-sm text-gray-500'>{trip?.userSelection?.noofDays} days trip with {trip?.userSelection?.budget} budget</h2>
        </div>
     </div>
    </Link>
  )
}

export default Usercarditem