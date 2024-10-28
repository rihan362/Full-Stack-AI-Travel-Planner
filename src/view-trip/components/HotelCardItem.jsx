import { GetPlaceDetails, PHOTO_REF_URL } from '@/services/GlobalApi';
import React ,{ useEffect , useState } from 'react'
import { Link } from 'react-router-dom';

function HotelCardItem({hotel}) {

    const [photoUrl,setphotoUrl]=useState();
  useEffect(()=>{
    hotel&GetPlacePhoto();
  },[hotel])

  const GetPlacePhoto=async()=>{
    const data={
          textQuery:hotel?.name
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
         <Link to={"https://google.com/maps/search/?api=1&query="+ hotel.name+","+hotel.address} target='blank'>   
                <div className='hover:scale-105 transition-all cursor-pointer'>
                    <img src={photoUrl} className='rounded-xl h-[200px] w-full object-cover'/>
                    <div className='my-2 flex flex-col gap-2'>
                        <h2 className='font-medium'>{hotel.name}</h2>
                        <h2 className='text-xs text-gray-500'>📍{hotel.address}</h2>
                        <h2 className='text-sm'>💰 {hotel.price}</h2>
                        <h2 className='text-sm'>⭐ {hotel.ratings}</h2>
                    </div>
                </div>
             </Link>
    </div>
  )
}

export default HotelCardItem