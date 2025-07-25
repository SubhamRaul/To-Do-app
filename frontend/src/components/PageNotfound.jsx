import React from 'react'

function PageNotfound() {
  return (
    <div className='flex h-screen items-center justify-center flex-col'>
        <span className='text-2xl text-red-800'>404</span>
        <div className='text-xl font-bold text-red-600'>Page Not Found</div>
    </div>
  )
}

export default PageNotfound