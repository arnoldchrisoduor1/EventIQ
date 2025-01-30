import profilePic from "../../assets/img/profile.jpg";

const EventRecentActivity = ({ name, ticket, time, timetag }) => {
  return (
    <div className="flex gap-5 mb-4 pb-2 hover:cursor-pointer border border-none">
        <div className="h-12 w-12 rounded-full">
            <img src={profilePic} alt="profile pic" className="h-full w-full object-cover rounded-full" />
        </div>
        <div className="flex flex-col text-start gap-3 text-black/50">
            <p><span className="text-black">{name}</span> has bought <span className="text-customOrange">{ticket}</span> <br/> tocket(s) for the Ultimate Champ event.</p>
            <p>{time} {timetag} ago</p>
        </div>
    </div>
  )
}

export default EventRecentActivity