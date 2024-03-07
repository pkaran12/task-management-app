import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <div className='h-[50px] bg-slate-400 flex justify-between px-5 items-center '>
        <h1 className='text-3xl font-medium'>Task Management App</h1>
        <span className='flex justify-center gap-5'>
            <Link to="/login" className=" hover:underline">
        <h2 className='text-xl'>login</h2>
      </Link>
      <Link to="/register" className=" hover:underline">
      <h3 className='text-xl'>register</h3>
      </Link>
      </span>
    </div>
  )
}

export default Navbar