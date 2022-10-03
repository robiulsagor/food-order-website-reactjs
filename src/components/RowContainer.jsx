import React from 'react'
import { MdShoppingBasket } from 'react-icons/md'
import { motion } from 'framer-motion'
import { useRef } from 'react'
import { useEffect } from 'react'
import NotFound from '../img/NotFound.svg'
import { useDispatch } from 'react-redux'
import { addItem, } from '../features/cartSlice'

const RowContainer = ({ flag, data, scrollValue }) => {
    const rowContainer = useRef()
    const dispatch = useDispatch()
    // const { cartItems } = useSelector(state => state.cart)




    useEffect(() => {
        rowContainer.current.scrollLeft += scrollValue
    }, [scrollValue])


    return (
        <div
            ref={rowContainer} className={`w-full flex items-center justify-center gap-4 my-12 scroll-smooth ${flag ? 'overflow-x-scroll scrollbar-none' : 'overflow-x-hidden flex-wrap'}`}>

            {data && data.length > 0 ? (data.map(item => (
                <div key={item.id} className='w-300 min-w-[300px] md:w-340 md:min-w-[340px] h-[225px] my-12 bg-cardOverlay p-2 hover:shadow-xl rounded-lg flex flex-col items-center justify-center'>
                    <div className='w-full flex items-center justify-between' title='Add to cart'>
                        <motion.div whileHover={{ scale: 1.2 }} className='w-40 h-40'>
                            <img src={item.imageURL} alt="" className='w-full h-full -mt-10' />
                        </motion.div>

                        <motion.div
                            whileTap={{ scale: 1.2 }}
                            className='w-8 h-8  rounded-full bg-red-600   flex items-center justify-center cursor-pointer'
                            onClick={() => dispatch(addItem({ item, type: "increase" }))}>
                            <MdShoppingBasket className='text-white text-xl' />
                        </motion.div>
                    </div>

                    <div className='w-full flex flex-col items-end justify-end gap-1'>
                        <p className='text-textColor font-semibold md:text-lg'>
                            {item.title}
                        </p>
                        <p className='text-gray-500 text-sm'>45 Calories</p>
                        <p className='text-lg text-headingColor font-semibold'>
                            <span className='text-sm text-red-600'>$</span> {item.price}
                        </p>

                    </div>
                </div>
            )
            )) : (
                <div className='flex flex-col gap-8 items-center justify-center'>
                    <div>
                        <img src={NotFound} alt="not found" className='w-full h-300 object-cover' />
                    </div>
                    <h2 className='text-xl font-semibold'>No Data Found!</h2>
                </div>
            )}

        </div >
    )
}

export default RowContainer