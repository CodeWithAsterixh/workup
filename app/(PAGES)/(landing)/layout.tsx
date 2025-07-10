import Footer from '@/components/footer'
import Header from '@/components/header'
import { Slot } from '@/types'
import React from 'react'


export default function layout({children}: Slot) {
  return (
    <>
    <Header/>
    {children}
    <Footer/>
    </>
  )
}