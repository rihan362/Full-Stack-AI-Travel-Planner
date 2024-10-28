import React from 'react'
import PlaceCard from './PlaceCard'


function PlacestoVisit({trip}) {
  return (
    <div>
        <h2 className='font-bold text-lg' >Places to Visit</h2>
        
        <div>
        {Object.entries(trip?.tripdata?.itinerary || {}).map(([day, activities], index) => (
          <div key={index} className='mt-5' >
            <h2 className='font-medium text-lg'>{day}</h2>
            <div className='grid md:grid-cols-2'>
            {Object.entries(activities).map(([timeOfDay, place], index) => (
              <div key={index}>
                
                <h2 className='font-medium text-sm text-orange-500'>Time: {place.timeTravel}</h2>
                <PlaceCard place={place}/>
                {/* <p>{place.placeDetails}</p> */}
                {/* <p>Rating: {place.rating}</p> */}
              </div>
            ))}
            </div>
          </div>
        ))}
      </div>

    </div>
  )
}

export default PlacestoVisit