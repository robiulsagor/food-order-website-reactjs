
import { BiMinus, BiPlus } from "react-icons/bi"
import { motion } from 'framer-motion'
import { useDispatch, useSelector } from 'react-redux'
import { GoogleAuthProvider, getAuth, signInWithPopup, } from "firebase/auth";
import { app } from '../firebaseConfig'
import { set_user } from '../features/authSlice'
import { addNotification } from '../features/notificationSlice'
// import { useState } from "react";
import { addItem, } from "../features/cartSlice";
import { useState } from "react";
import { useEffect } from "react";

const CartItem = () => {
    const dispatch = useDispatch()
    const { cartItems } = useSelector(state => state.cart)
    const { user } = useSelector(state => state.auth)
    const auth = getAuth(app)
    const provider = new GoogleAuthProvider()

    // to login
    const login = async () => {
        // user ? setUserModal(modal => !modal) :
        signInWithPopup(auth, provider)
            .then((result) => {
                const { providerData } = result.user;
                const pData = providerData[0]

                dispatch(set_user(pData))
                dispatch(addNotification({ msg: "Successfully logged in!", type: "success" }))

                localStorage.setItem('user', JSON.stringify(pData))
            }).catch((error) => {
                dispatch(addNotification({ msg: "Can't sign in!", type: "warning" }))
            });
    }

    // const [qty, setQty] = useState(1)
    // const [items, setItems] = useState([])

    const [prices, setPrices] = useState([])

    return (
        <div className='w-full h-full bg-slate-800 rounded-t-[2rem] flex flex-col select-none'>
            <div className='w-full h-420 md:h-340 px-6 py-10 flex flex-col gap-3 overflow-y-scroll scrollbar-none'>

                {/* cart list */}
                {cartItems.map(item => (
                    <div key={item.id} className='bg-slate-700  w-full flex rounded-md'>
                        <div className=' p-1 px-2 rounded-lg  flex items-center gap-2'>
                            <img src={item.imageURL} alt="cart img" className='w-20 h-20 max-h-[60px] rounded-full object-contain' />
                        </div>

                        <div className='flex flex-col gap-2 justify-center'>
                            <p className='text-base text-slate-400'>
                                {item.title}
                            </p>
                            <p className='text-sm font-semibold  block text-gray-300 '>${item.price * item.qty}</p>
                        </div>


                        <div className='group flex items-center gap-2 ml-auto mr-2 cursor-pointer'>
                            <motion.div whileTap={{ scale: .75 }} >
                                <BiMinus className='text-gray-50' onClick={() => dispatch(addItem({ item, type: "decrease" }))} />
                            </motion.div>

                            <p className='w-5 h-5 bg-slate-700 text-gray-50 flex items-center justify-center rounded-md'>
                                {item.qty}
                            </p>

                            <motion.div whileTap={{ scale: .75 }} >
                                <BiPlus className='text-gray-50' onClick={() => dispatch(addItem({ item, type: "increase" }))} />
                            </motion.div>
                        </div>
                    </div>
                ))}


            </div>

            {/* cart total  */}
            <div className='w-full flex-1 bg-gray-600 rounded-t-[2rem] flex flex-col items-center justify-evenly px-8 py-2'>
                <div className='w-full flex items-center justify-between'>
                    <p className='text-lg text-gray-400'>Sub total</p>
                    <p className='text-lg text-gray-400'>$
                        {cartItems.reduce((total, i) => total + (i.price * i.qty), 0)}
                    </p>
                </div>

                <div className='w-full flex items-center justify-between'>
                    <p className='text-lg text-gray-400'>Delivery</p>
                    <p className='text-lg text-gray-400'>$2.5</p>
                </div>

                <div className='w-full border-b border-gray-500 my-2'></div>

                <div className='w-full flex items-center justify-between'>
                    <p className='text-xl font-semibold text-gray-400'>Total</p>
                    <p className='text-xl font-semibold text-gray-400'>$
                        {(cartItems.reduce((total, i) => total + (i.price * i.qty), 0)) + 2.5}
                    </p>
                </div>

                {user ? (<motion.button whileTap={{ scale: .8 }} type='button'
                    className='w-full p-2 rounded-full bg-orange-400 text-gray-50 text-lg my-2'>Check Out</motion.button>) : (
                    <motion.button whileTap={{ scale: .8 }} type='button'
                        className='w-full p-2 rounded-full bg-red-400 text-gray-50 text-lg my-2'
                        onClick={() => login()}>Login to Check Out</motion.button>
                )}

            </div>
        </div>
    )
}

export default CartItem