import React,{} from 'react'
import Carousel from '../components/Carousel'
import Menuitems from '../components/Menuitems'
import DisplayFoods from '../components/DisplayFoods';
import Contactus from '../components/Contactus';
import MobileApp from '../components/MobileApp';

export default function Home() {
  return (
    <>
          <Carousel/>
          <Menuitems />
          <DisplayFoods />
          <Contactus/>
          <MobileApp/>
    </>
  )
}