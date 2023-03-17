import React from 'react';
import { Link } from 'react-router-dom';
import WomanImage from '../../../img/woman_hero.png';

const Hero = () => {
  return (
    <section className="h-[800px] bg-hero bg-no-repeat bg-cover bg-center py-24">
      <div className="container mx-auto flex justify-around h-full">
        {/* text */}
        <div className="flex flex-col justify-center p-4">
          {/* pre-title */}
          <div className="font-semibold flex items-center uppercase ">
            <div className="w-10 h-[2px] bg-red-500 mr-3"></div>New Trend
          </div>
          <h1 className="text-[45px] lg:text-[70px] leading-[1.1] font-light mb-4">
            AUTUMUN SALE STYLISH <br />
            <span className="font-semibold">WOMANS</span>
          </h1>
          <Link to={"/"} className="self-start uppercase font-semibold border-b-2 border-primary">Discover More</Link>
        </div>
        {/* Image */}
        <div className="hidden lg:block">
          <img src={WomanImage} alt={"Woman Hero"} />
        </div>
      </div>
    </section>
  );
};

export default Hero;
