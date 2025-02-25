import React from 'react'

const EventTicketBanner = ({ banner, description }) => {
  return (
    <div className='w-full h-[200px] my-5 relative group'>
        <div className='absolute bg-black/40 h-full w-full hover:cursor-pointer rounded-lg transition duration-custom'/>
        <img src={banner} alt="Banner Image" className='w-full h-full object-cover rounded-lg hover:cursor-pointer'/>
        <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-customBlue/90 p-4 rounded-full transition duration-custom hover:cursor-pointer'>
            <p className='text-xl italic text-gray-700'>{description}</p>
        </div>
    </div>
  )
}

export default EventTicketBanner;