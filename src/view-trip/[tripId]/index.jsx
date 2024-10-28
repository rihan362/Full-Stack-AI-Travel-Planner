import { doc, getDoc } from 'firebase/firestore';
import React ,{ useEffect,useState }from 'react'
import { useParams } from 'react-router-dom'
import { db } from '@/services/firebaseConfig';
import { toast } from 'sonner';
import Infosection from '../components/infosection';
import Hotel from '../components/Hotel';
import PlacestoVisit from '../components/PlacestoVisit';
import Footer from '../components/Footer';


function Viewtrip() {
    const {tripId}=useParams();

    const [trip,settrip]=useState([]);
    useEffect(()=>{
        tripId&&getTripData();

    },[tripId])

    const getTripData=async()=>{
        const docRef=doc(db,'AItrips',tripId);
        const docSnap=await getDoc(docRef);

        if(docSnap.exists())
        {
            console.log("Documents",docSnap.data());
            settrip(docSnap.data());
        }
        else{
            console.log("No such document");;
            toast("No trip Found")
        }


    }

  return (
    <div className='p-10 md:px-20 lg:px-44 xl:px-56'>
      <Infosection trip={trip}/>

      <Hotel trip={trip}/>

      <PlacestoVisit trip={trip}/>

      <Footer trip={trip}/>
    </div>
  )
}

export default Viewtrip