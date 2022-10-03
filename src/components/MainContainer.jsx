import React from 'react'
import HomeContainer from './HomeConainer'
import { motion } from 'framer-motion'
import { MdChevronLeft, MdChevronRight } from "react-icons/md"
import RowContainer from './RowContainer'
import { useSelector } from 'react-redux'
import { useState } from 'react'
import MenuContainer from './MenuContainer'

const MainContainer = () => {
    const { foodItems } = useSelector(state => state.food)
    const [scrollValue, setScrollValue] = useState(0)

    return (
        <div className='w-full h-auto flex flex-col items-center justify-center'>
            <HomeContainer />

            <section className='w-full my-6'
            >
                <div className='w-full flex items-center justify-between'>
                    <p className='text-2xl font-semibold capitalize relative before:absolute  before:rounded-lg before:w-32 before:h-1 before:-bottom-2 before:left-0 before:bg-gradient-to-tr from-orange-300 to-orange-800 transition-all ease-in-out duration-100'>
                        Our fresh &amp; healthy fruits
                    </p>
                    <div className='hidden md:flex items-center gap-3'>
                        <motion.div whileTap={{ scale: .7 }}
                            className='w-8 h-8 rounded-lg bg-orange-300 hover:bg-orange-600 transition-all ease-in-out  cursor-pointer hover:shadow-lg flex items-center justify-center'>
                            <MdChevronLeft className='text-white text-2xl '
                                onClick={() => setScrollValue(-200)} />
                        </motion.div>
                        <motion.div whileTap={{ scale: .7 }}
                            className='w-8 h-8 rounded-lg bg-orange-300 hover:bg-orange-600 transition-all ease-in-out  cursor-pointer hover:shadow-lg flex items-center justify-center'>
                            <MdChevronRight className='text-white text-2xl '
                                onClick={() => setScrollValue(+500)} />
                        </motion.div>
                    </div>
                </div>
                <RowContainer scrollValue={scrollValue} flag={true} data={foodItems?.filter(n => n.category === "fruits")} />
            </section>

            <MenuContainer />

            {/* {isCartOpen && <CartContainer />} */}

        </div>
    )
}

export default MainContainer