const EventTicketBanner = ({ banner } : { banner: string }) => {
  return (
    <div className='w-full h-[200px] my-5 relative group'>
        <div className='absolute bg-black/40 h-full w-full rounded-lg transition duration-custom'/>
        <img src={banner} alt="Banner Image" className='w-full h-full object-cover rounded-lg hover:cursor-pointer'/>
        <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-customYellow p-4 rounded-xl transition duration-custom hover:cursor-pointer'>
            <p className='text-xl text-gray-700'>Get Ticket</p>
        </div>
    </div>
  )
}

export default EventTicketBanner;