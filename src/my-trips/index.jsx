import React,{useEffect,useState} from 'react'
import { useNavigation } from 'react-router-dom';
import { db } from '@/services/firebaseConfig';
import { collection, getDoc, getDocs, query,where } from 'firebase/firestore';
import Usercarditem from './components/Usercarditem';

function Mytrip() {
  const navigation=useNavigation();
  const [usertrips,setusertrips]=useState([]);
  useEffect(()=>{
    GetUsertrips();
  },[])

  const GetUsertrips=async()=>{
    const user=JSON.parse(localStorage.getItem('user'))
    if(!user)
    {
      navigation('/')
      return ;

    }
    setusertrips([])
    const q=query(collection(db,'AItrips'),where('userEmail','==',user?.email))
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      console.log(doc.id, " => ", doc.data());
      setusertrips(prevVal=>[...prevVal,doc.data()])
    });
  }

  return (
    <div className='sm:px-10 md:px-32 lg:px-56 xl:px-72 px-5 mt-10'>

      <h2 className='font-bold text-3xl'>My Trips</h2>
      <div className='grid grid-cols-2 md:grid-cols-3 mt-10 gap-5'>
        {usertrips.map((trip,index)=>(
           <Usercarditem trip={trip}/>
        ))}
      </div>
    </div>
  )
}

export default Mytrip