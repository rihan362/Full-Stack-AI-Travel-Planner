import React ,{ useState ,useEffect } from 'react'
import { FaMapLocation } from "react-icons/fa6";
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { GetPlaceDetails, PHOTO_REF_URL } from '@/services/GlobalApi';

function PlaceCard({place}) {
  const [photoUrl,setphotoUrl]=useState();
  useEffect(()=>{
    place&GetPlacePhoto();
  },[place])

  const GetPlacePhoto=async()=>{
    const data={
          textQuery:place?.placeName
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
    <Link to={"https://google.com/maps/search/?api=1&query="+ place.placeName+","+place?.Hoteladdress} target='blank'>
    <div className='border rounded-xl p-3 mt-2 flex gap-5 hover:scale-105 transition-all hover:shadow-md cursor-pointer'>
      <img src={photoUrl} className='w-[100px] h-[100px] rounded-lg object-cover'/>
      <div>
        <h2 className='font-bold text-lg'>{place.placeName}</h2>
        <p className='text-sm text-gray-400'>{place.placeDetails}</p>

        <h2 className='mt-2'>{place.timeToTravel}</h2>
        <Button><FaMapLocation /></Button>
      </div>
    </div>
    </Link>
  )
}

export default PlaceCard