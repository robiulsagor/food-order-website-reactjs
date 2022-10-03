import React from 'react'
import Delivery from "../img/delivery.png"
import HeroImg from "../img/heroBg.png"
import { heroData } from "../utils/data"

const HomeContainer = () => {
    return (
        <section className="grid grid-cols-1 md:grid-cols-2 gap-2 ">
            <div className="py-2  flex flex-col items-start gap-5">
                <div className='flex items-center gap-4 px-2 w-auto bg-orange-100 rounded'>
                    <p className="text-lg text-orange-500">Bike Delivery</p>
                    <div className="w-8 h-8 overflow-hidden">
                        <img src={Delivery} alt="Bike Delivery" className="w-full h-full bg-white rounded-full object-contain" />
                    </div>
                </div>

                <p className='text-[3rem] font-bold leading-snug'>The Fastest Delivery in <span className='text-orange-500 text-[3.5rem]'>Your City</span></p>

                <p className='text-slate-500 text-center md:text-left md:w-[80%]'>Lorem ipsum dolor, sit amet consectetur adipisicing elit.Voluptatibus explicabo ab laborum dolorum optio, officiis, sunt possimus, rerum praesentium ratione odit natus laboriosam!Omnis dolor ea quasi, labore error aspernatur sunt possimus, rerum praesentium ratione odit natus laboriosam!Omnis dolor ea quasi, labore error aspernatur.</p>

                <a href="/somthing" className='uppercase bg-orange-500 w-full md:w-auto text-center md:text-left py-2 px-4 rounded font-bold text-slate-900 hover:bg-orange-300 transition-all duration-200'>order now</a>

            </div>
            <div className='flex-1 py-2 relative flex '>
                <img src={HeroImg} alt="hero" className=' ml-auto h-420 w-full md:w-auto md:h-600 object-contain' />

                <div className=' w-full lg:w-[80%] h-420 md:h-[370px] lg:h-[50%] absolute top-0 md:top-[15%] lg:top-50 right-0 flex items-center justify-center py-4 flex-wrap gap-4 lg:gap-16 lg:right-0 '>
                    {heroData && heroData.map((data) => {
                        return (
                            <div key={data.id} className='w-150 lg:w-190 p-4 bg-cardOverlay rounded-3xl flex flex-col items-center justify-center '>
                                <img src={data.img} alt="" className='w-20 lg:w-32  overflow-hidden -mt-10 md:-mt-20 object-contain ' />

                                <p className='font-semibold text-textColor text-base lg:text-sm'>{data.title}</p>
                                <p className='text-slate-500 '>
                                    <span className='text-red-300 text-xs '>$</span> {data.price}
                                </p>
                            </div>
                        )
                    })}

                </div>

            </div>

        </section>
    )
}

export default HomeContainer