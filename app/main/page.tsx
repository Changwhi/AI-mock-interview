import AddNewInterview from '@/components/main/AddNewInterview'
import { UserButton } from '@clerk/nextjs'
import React from'react'

const Main = () => {

  return (
    <div className='p-10'>
      <h2 className='font-bold text-2xl'>Main</h2>
      <h2 className='text-gray-500'>Start your Mockup Interview with AI!</h2>
      <div className='grid grid-cols-1 md:grid-cols-3 my-5'>
        <AddNewInterview />
      </div>
    </div>

  )
}

export default Main