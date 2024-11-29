import React from 'react'
import { MdOutlineTask } from "react-icons/md";
import { MdOutlineLabelImportant } from "react-icons/md";
import { MdDoneAll } from "react-icons/md";
import { MdSpeakerNotesOff } from "react-icons/md";
import { Link } from 'react-router-dom';



const Sidebar = () => {
    const data=[{
        title:"All Task",
        icons:<MdOutlineTask/>,
        link:"/"
    },{
        title:"Important Task",
        icons:<MdOutlineLabelImportant />,
        link:"/importantask"

    },{
        title:"Completd Task",
        icons:<MdDoneAll />,
        link:"/completetask"

    },{
        title:"InCompletd Task",
        icons:<MdSpeakerNotesOff />,
        link:"/incompletetask"

    }];
     
  return (
    <>
        <div>
            <h1 className='text-xl font-semibold'>Seema Sandip Patil</h1>
            <h4 className='mb-3'>seemapatil@gmail.com</h4>
            <hr />
        </div>
        <div>
            {data.map((item,i)=>{
                return<>
                <Link to={item.link} className='my-2 flex items-center hover:bg-gray-500 p-2' key={i}>{item.icons}&nbsp;  {item.title} </Link></>
            })}
        </div>
        <div>
            <button className='bg-gray-400 p-2 rounded w-full'>Logout</button>
        </div>
    </>
  )
}

export default Sidebar