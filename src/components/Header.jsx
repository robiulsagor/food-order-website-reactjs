import Logo from "../img/logo.png"
import { MdShoppingBasket, MdAdd, MdLogout } from 'react-icons/md'
import Avatar from '../img/avatar.png'
import { motion } from "framer-motion"
import { Link } from "react-router-dom"
import { GoogleAuthProvider, getAuth, signInWithPopup, signOut } from "firebase/auth";
import { app } from "../firebaseConfig"
import { useDispatch, useSelector } from "react-redux"
import { logout_user, set_user } from "../features/authSlice"
import "../utils/fetchLocalStorageData"
import { useState } from "react"
import { addNotification } from "../features/notificationSlice"
import { handleShowCart } from "../features/cartShowSlice"

const Header = () => {
    const dispatch = useDispatch()
    const { user } = useSelector(state => state.auth)
    const { cartItems } = useSelector(state => state.cart)
    const [userModal, setUserModal] = useState(false)

    const auth = getAuth(app)
    const provider = new GoogleAuthProvider()

    // to login
    const login = async () => {
        user ? setUserModal(modal => !modal) :
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

    // to logout
    const logout = async () => {
        signOut(auth).then(() => {
            console.log("successfully signed out!");
            dispatch(logout_user())
            localStorage.removeItem('user')
            setUserModal(false)
            dispatch(addNotification({ msg: "Successfully signed out", type: "success" }))
        }).catch((error) => {
            console.log("couldn't sign you out!, ", error);
            dispatch(addNotification({ msg: "Can't sign you out!", type: "warning" }))
        });
    }

    return (
        <div className='fixed z-40 w-screen p-3 px-4 md:p-6 md:px-16 bg-primary'>

            {/* desktop view */}
            <div className="hidden md:flex w-full items-center">
                <Link to="/">
                    <motion.div className='flex items-center gap-2'
                        whileTap={{ scale: 0.8 }}>
                        <img src={Logo} alt="logo" className="w-8 object-cover" />
                        <p className="text-headingColor text-xl font-bold">City</p>
                    </motion.div>
                </Link>

                <div className="ml-auto flex items-center gap-8 ">
                    <ul className="flex gap-8">
                        <li onClick={() => setUserModal(false)}><Link to="/">Home</Link></li>
                        <li onClick={() => setUserModal(false)}><Link to="/menu">Menu</Link></li>
                        <li onClick={() => setUserModal(false)}><Link to="/about">About Us</Link></li>
                        <li onClick={() => setUserModal(false)}><Link to="/services">Services</Link></li>
                    </ul>

                    <motion.div className="relative flex items-center cursor-pointer"
                        onClick={() => dispatch(handleShowCart(true))} >
                        <MdShoppingBasket className="text-headingColor text-2xl "
                        />
                        {cartItems && cartItems.length > 0 && (
                            <div className="absolute -top-3 -right-2 w-5 h-5 rounded-full bg-curtNumBg flex items-center justify-center">
                                <p className=" text-white text-xs">
                                    {cartItems.length}
                                </p>
                            </div>
                        )}
                    </motion.div>

                    <div>
                        <div className="relative">
                            <motion.img src={user ? user.photoURL : Avatar} alt="avatar img" className="w-10 h-10 rounded-full cursor-pointer drop-shadow-2xl"
                                whileTap={{ scale: 0.6 }}
                                onClick={login}
                            />

                            {userModal && (
                                <motion.div className="absolute top-12 right-0 bg-gray-200 w-44 rounded"
                                    initial={{ scale: 0.5, opacity: 0 }}
                                    animate={{ scale: 1, opacity: 1 }}
                                >
                                    {user && (
                                        user.email === "ksagor086@gmail.com" &&
                                        (
                                            <Link to="/createItem">
                                                <p className="px-4 py-2 cursor-pointer flex items-center gap-2  hover:bg-slate-300" onClick={() => setUserModal(false)}>
                                                    Add New Item <MdAdd />
                                                </p></Link>
                                        )
                                    )}

                                    <p className="px-4 py-2 cursor-pointer flex items-center gap-2 hover:bg-slate-300"
                                        onClick={logout}>
                                        Logout <MdLogout />
                                    </p>
                                </motion.div>
                            )}


                        </div>
                    </div>
                </div>
            </div>

            {/* mobile view */}
            <div className="flex justify-between items-center md:hidden w-full">
                <Link to="/">
                    <motion.div className='flex items-center gap-2'
                        whileTap={{ scale: 0.8 }}>
                        <img src={Logo} alt="logo" className="w-8 object-cover" />
                        <p className="text-headingColor text-xl font-bold">City</p>
                    </motion.div>
                </Link>

                <div className="flex items-center justify-center gap-6">
                    <div className="relative flex items-center cursor-pointer">
                        <MdShoppingBasket className="text-headingColor text-2xl "
                            onClick={() => dispatch(handleShowCart(true))} />
                        <div className="absolute -top-3 -right-2 w-5 h-5 rounded-full bg-curtNumBg flex items-center justify-center">
                            <p className="text-sm text-white">2</p>
                        </div>
                    </div>

                    <div className="relative">
                        <motion.img src={user ? user.photoURL : Avatar} alt="avatar img" className="w-10 h-10 rounded-full cursor-pointer drop-shadow-2xl"
                            whileTap={{ scale: 0.6 }}
                            onClick={login}
                        />

                        {userModal && (
                            <motion.div className="absolute top-12 right-0 bg-gray-200 w-44 rounded"
                                initial={{ scale: 0.5, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                            >
                                {user && (
                                    user.email === "ksagor086@gmail.com" &&
                                    (
                                        <Link to="/createItem" onClick={() => setUserModal(false)} className="px-4 py-2 cursor-pointer flex items-center gap-2  hover:bg-slate-300">
                                            Add New Item <MdAdd />
                                        </Link>
                                    )
                                )}

                                <ul className="flex flex-col">
                                    <li><Link className="px-4 py-2 hover:bg-slate-300 cursor-pointer block" to="/" onClick={() => setUserModal(false)}>Home</Link></li>
                                    <li><Link className="px-4 py-2 hover:bg-slate-300 cursor-pointer block" to="/menu" onClick={() => setUserModal(false)}>Menu</Link></li>
                                    <li><a className="px-4 py-2 hover:bg-slate-300 cursor-pointer block" href="/about" onClick={() => setUserModal(false)}>About Us</a></li>
                                    <li><a className="px-4 py-2 hover:bg-slate-300 cursor-pointer block" href="/services" onClick={() => setUserModal(false)}>Services</a></li>
                                </ul>

                                <p className="px-4 py-2 cursor-pointer flex items-center gap-2 bg-slate-300 hover:bg-slate-400"
                                    onClick={logout}>
                                    Logout <MdLogout />
                                </p>
                            </motion.div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Header