import React from 'react'
import  { Button } from '../ui/button';
import {Link}  from 'react-router-dom'

function Hero() {
  return (
    <div className="flex flex-col items-center mx-56 gap-9">
        <h1 className=" font-extrabold text-[50px] text-center mt-16">
          <span className="text-[#921a82]" > Discover your Next Travel Plan with AI :</span><br/>  Personalised your Trip at Your Fingertips
        </h1>
          <p className="text-xl text-gray-500 text-center">Your personal trip plan curator creating custom iternaries tailore at your interest and budget </p>

          <Link to={'/create-trip'}>
         <Button>Get Started it's Free</Button>

          </Link>
    </div>
  )
}

export default Hero