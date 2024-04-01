import React from 'react'
import HomePageCarousel from '../components/HomePageCarousel'
import HomePageCards from '../components/HomePageCards'
import HomePageContactUs from '../components/HomePageContactUs'

export default function Home() {
  return (
    <div>
        <HomePageCarousel/>
        <HomePageCards/>
        <HomePageContactUs/>
    </div>
  )
}
