import React from 'react'
import HeroSlider from './HeroSlider'
import AboutTeaser from './AboutTeaser'
import FeaturedProperties from './FeaturedProperties'
import InstallmentCalculator from './InstallmentCalculator'
import Testimonials from './Testimonials'
import CtaBanner from './CtaBanner'

const Home = () => {
  return (
    <>
    <HeroSlider/>
    <AboutTeaser/>
    <FeaturedProperties/>
    <InstallmentCalculator/>
    <Testimonials/>
    <CtaBanner/>
    </>
  )
}

export default Home