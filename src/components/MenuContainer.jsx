import React from 'react'
import { useState } from 'react'
import { MdFastfood } from 'react-icons/md'
import { categories } from '../utils/data'
import { motion } from 'framer-motion'
import RowContainer from './RowContainer'
import { useSelector } from 'react-redux'


const MenuContainer = () => {
    const [filter, setFilter] = useState("fruits")
    const { foodItems } = useSelector(state => state.food)

    return (
        <section className='w-full my-6' id='menu'>
            <div className='w-full flex items-center justify-between flex-col'>
                <p className='text-2xl font-semibold capitalize relative before:absolute  before:rounded-lg before:w-32 before:h-1 before:-bottom-2 before:left-0 before:bg-gradient-to-tr from-orange-300 to-orange-800 transition-all ease-in-out duration-100 mr-auto'>
                    Our hot dishes
                </p>

                <div className='w-full flex items-center justify-start lg:justify-center gap-8 py-6 overflow-x-scroll scrollbar-none'>
                    {categories && categories.map(items => (
                        <motion.div
                            whileTap={{ scale: .75 }}
                            key={items.id} className={`group ${filter === items.urlParam ? 'bg-red-500' : 'bg-card'} w-24 min-w-[94px] h-28 cursor-pointer rounded-lg drop-shadow-xl flex flex-col gap-3 items-center justify-center hover:bg-red-500 `}
                            onClick={() => setFilter(items.urlParam)}>
                            <div className={`w-10 h-10 rounded-full  ${filter === items.urlParam ? 'bg-card' : 'bg-red-600'}  group-hover:bg-card flex items-center justify-center`}>

                                <MdFastfood className={`text-xl group-hover:text-textColor
                            ${filter === items.urlParam ? 'text-textColor' : 'text-card'} `} />

                            </div>
                            <p className={`text-sm  group-hover:text-white 
                        ${filter === items.urlParam ? 'text-white' : 'text-textColor'}`}>
                                {items.name}
                            </p>
                        </motion.div>
                    ))}

                </div>
                <div className='w-full'>
                    <RowContainer flag={false} data={foodItems?.filter(item => item.category === filter)} />
                </div>
            </div>

        </section>
    )
}

export default MenuContainer