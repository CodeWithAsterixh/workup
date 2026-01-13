import React from 'react'

type Props = {
    children?:React.ReactNode
}

export default function Loading({children="loading"}: Readonly<Props>) {
  return (
    <div className='w-full h-screen flex gap-2 items-center justify-center'>
        <i className='pi animate-spin pi-spinner'></i>
        {children}
    </div>
  )
}