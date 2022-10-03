import React from 'react'
import { MdOutlineKeyboardBackspace } from 'react-icons/md'
import { RiRefreshFill } from "react-icons/ri"
import { BiMinus, BiPlus } from "react-icons/bi"
import { motion } from 'framer-motion'
import { useDispatch, useSelector } from 'react-redux'
import { handleShowCart } from '../features/cartShowSlice'
import { removeAllItems } from '../features/cartSlice'
import CartItem from './CartItem'

const CartContainer = () => {
    const dispatch = useDispatch()
    const { cartItems } = useSelector(state => state.cart)

    return (
        <motion.div
            initial={{ right: -60, opacity: 0 }}
            animate={{ right: 0, opacity: 1 }}
            transition={{ duration: .3 }}
            className='fixed top-0 -right-0 w-full  md:w-375 h-screen drop-shadow-lg flex flex-col z-[101] bg-white '>

            <div className='w-full flex items-center justify-between p-4'>
                <motion.div whileTap={{ scale: .75 }}
                    onClick={() => dispatch(handleShowCart(false))}>
                    <MdOutlineKeyboardBackspace className='text-3xl text-semibold cursor-pointer' />
                </motion.div>

                <p className='text-xl font-semibold '> Cart</p>

                <motion.div whileTap={{ scale: .75 }} className='bg-gray-100 p-1 px-2 flex items-center justify-center gap-2 rounded-md text-textColor hover:bg-gray-50 hover:shadow-lg cursor-pointer'
                    onClick={() => dispatch(removeAllItems())}>
                    <p>Clear</p>
                    <RiRefreshFill />
                </motion.div>
            </div>



            {/* Bottom section */}
            {(cartItems && cartItems.length > 0) ? (
                <CartItem />
            )
                :
                <div className='bg-gray-800 h-full flex items-center justify-center rounded-[2rem]'>

                    <h2 className='text-slate-300 text-xl'>Cart is empty</h2>
                    {console.log(cartItems)}
                </div >
            }


        </motion.div >

    )
}

export default CartContainer