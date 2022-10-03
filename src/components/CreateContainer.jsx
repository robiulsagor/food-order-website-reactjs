import React from 'react'
import { useState } from 'react'

import { deleteObject, getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";

import { MdCloudUpload, MdFastfood, MdDelete, MdFoodBank, MdAttachMoney } from 'react-icons/md'
import { motion } from 'framer-motion'

import { categories } from '../utils/data'
import Loader from './Loader'
import { storage } from '../firebaseConfig';
import { getAllFoodItems, saveItem } from '../utils/firebaseFunctions';
import { set_food } from '../features/foodSlice';
import { useDispatch } from 'react-redux';

const CreateContainer = () => {
    const dispatch = useDispatch()
    const [title, setTitle] = useState("")
    const [calories, setCalories] = useState("")
    const [price, setPrice] = useState("")
    const [category, setCategory] = useState(null)
    const [image, setImage] = useState(null)
    const [fields, setFields] = useState(false)
    const [alertStatus, setAlertStatus] = useState("")
    const [msg, setMsg] = useState("Sucess")
    const [isLoading, setIsLoading] = useState(false)

    const uploadImage = (e) => {
        setIsLoading(true)
        const imageFile = e.target.files[0]
        console.log(imageFile);

        const storageRef = ref(storage, `images/${Date.now()}-${imageFile.name}`)
        console.log(storageRef);

        const uploadTask = uploadBytesResumable(storageRef, imageFile);

        uploadTask.on('state_changed',
            (snapshot) => {
                const progress = Math.floor((snapshot.bytesTransferred / snapshot.totalBytes) * 100)
                console.log("Upload is " + progress + "% done!");
                switch (snapshot.state) {
                    case 'paused':
                        console.log("Upload is paused!");
                        break;

                    case 'running':
                        console.log("Upload is running!");
                        break;

                    default:
                        console.log("Getting upload state...");
                        break;
                }
            },
            (error) => {
                setFields(true)
                setIsLoading(false)
                setMsg("Error while uploading. Try again!")
                setAlertStatus("danger")
                console.log(error);

                setTimeout(() => {
                    setFields(false)
                    setIsLoading(false)
                }, 4000);
            },
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    setImage(downloadURL)
                    setIsLoading(false)
                    setFields(true)
                    setMsg("Image uploaded successfully!")
                    setAlertStatus("success")

                    setTimeout(() => {
                        setIsLoading(false)
                        setFields(false)
                        setMsg("")
                    }, 4000);
                })
            })

    }

    const deleteImage = () => {
        setIsLoading(true)

        const imgRef = ref(storage, image)
        deleteObject(imgRef).then(() => {

            setImage(null)
            setFields(true)
            setMsg("Image deleted successfully!")
            setAlertStatus("success")
            setIsLoading(false)

            setTimeout(() => {
                setFields(false)
                setMsg("")
            }, 4000);
        }).catch(error => {
            console.log("can't delete image, " + error);
            setFields(true)
            setMsg("Image can't be deleted! ", error)
            setAlertStatus("danger")

            setTimeout(() => {
                setFields(false)
                setMsg("")
            }, 4000);
        })
    }
    const saveDetails = () => {
        try {
            if (!title || !category || !image || !calories || !price) {
                setFields(true)
                setIsLoading(false)
                setMsg("All fields are required!")
                setAlertStatus("danger")

                setTimeout(() => {
                    setFields(false)
                    setIsLoading(false)
                }, 4000);
            } else {
                const data = {
                    id: `${Date.now()}`,
                    title,
                    imageURL: image,
                    calories,
                    category,
                    qty: 1,
                    price
                }
                if (saveItem(data)) {
                    setFields(true)
                    setIsLoading(false)
                    setMsg("Documents saved!")
                    setAlertStatus("success")
                    clearItems()
                    fetchData()

                    setTimeout(() => {
                        setFields(false)
                        setIsLoading(false)
                    }, 4000);
                }

            }

        } catch (error) {
            setFields(true)
            setIsLoading(false)
            setMsg("Error while saving data. Please try again!")
            setAlertStatus("danger")
            console.log(error);

            setTimeout(() => {
                setFields(false)
                setIsLoading(false)
            }, 4000);
        }
    }

    const clearItems = () => {
        setTitle("")
        setImage(null)
        setCalories("")
        setPrice("")
        setCategory("Select Category")
    }


    const fetchData = async () => {
        await getAllFoodItems().then(data => {
            console.log(data);
            dispatch(set_food(data))
        })
    }
    return (
        <form className='w-full min-h-[calc(100vh-7rem)] flex items-center justify-center '>
            <div className='w-[90%] md:w-[75%] border border-gray-400 rounded-lg p-4 flex flex-col items-center justify-center gap-4' onSubmit={saveDetails}>

                {fields && (
                    <motion.div initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 1 }}
                        className={`w-5/12 fixed top-14 l-50 z-50 text-center p-2 mb-5 rounded-lg ${alertStatus === 'danger' ? 'bg-red-200 text-red-600' : 'bg-emerald-200 text-emerald-500'} `}>
                        <p>
                            {msg}
                        </p>
                    </motion.div>
                )}

                <div className='flex items-center w-full py-2 border-b border-gray-200 gap-4'>
                    <MdFastfood className='text-xl text-gray-700' />
                    <input type="text" value={title}
                        onChange={e => setTitle(e.target.value)} className='w-full h-full bg-transparent outline-none border-b border-gray-300 text-xl font-semibold placeholder:text-gray-400'
                        placeholder='Give me a title' />
                </div>

                <div className='w-full'>
                    <select onChange={e => setCategory(e.target.value)}
                        className="w-full border-b border-gray-300 p-2 rounded-md text-base cursor-pointer outline-none">
                        <option value="other">Select Category</option>
                        {categories && categories.map((item) => {
                            return (
                                <option value={item.urlParam} key={item.id}
                                    className="bg-slate-100 text-textColor">
                                    {item.name}
                                </option>
                            )
                        })}
                    </select>
                </div>

                <div className='group w-full h-225 md:h-420 flex flex-col items-center justify-center border-2 border-dotted border-gray-400 rounded-lg'>
                    {isLoading ? <Loader /> : <>
                        {!image ? <>
                            <label className='w-full h-full flex flex-col items-center justify-center cursor-pointer'>
                                <div className='w-full h-full flex flex-col items-center justify-center text-gray-400 hover:text-gray-700 duration-200'
                                >
                                    <MdCloudUpload className='text-3xl' />
                                    <p className=''>Click here to upload</p>
                                </div>
                                <input type="file" accept='image/*' name="uploadImage" onChange={uploadImage}
                                    className="w-0 h-0" />
                            </label>
                        </> : <>
                            <div className='relative h-full  '>
                                <img src={image} alt="uploaded img" className='w-full h-full object-cover' />
                                <button type='button' className='absolute  bottom-3 right-3 bg-red-500 hover:bg-red-400 p-3 rounded-full  cursor-pointer outline-none text-2xl hover:shadow-md duration-500 transition-all ease-in-out text-slate-50'
                                    onClick={deleteImage}>
                                    <MdDelete className='w-full h-full object-cover' />
                                </button>
                            </div>
                        </>}
                    </>}
                </div>

                <div className='w-full flex flex-col md:flex-row items-center gap-3'>
                    <div className='flex items-center w-full py-2 border-b border-gray-200 gap-4'>
                        <MdFoodBank className='text-xl text-gray-700' />
                        <input type="text" value={calories}
                            onChange={e => setCalories(e.target.value)} className='w-full h-full bg-transparent outline-none border-b border-gray-300 text-xl font-semibold placeholder:text-gray-400'
                            placeholder='Calories' />
                    </div>

                    <div className='flex items-center w-full py-2 border-b border-gray-200 gap-4'>
                        <MdAttachMoney className='text-xl text-gray-700' />
                        <input type="text" value={price}
                            onChange={e => setPrice(e.target.value)} className='w-full h-full bg-transparent outline-none border-b border-gray-300 text-xl font-semibold placeholder:text-gray-400'
                            placeholder='Price' />
                    </div>
                </div>

                <div className='flex items-center w-full'>
                    <button type='button' className='bg-emerald-400 hover:bg-emerald-300 px-12 py-2 text-xl rounded-lg w-full md:w-auto md:ml-auto border-none outline-none text-white font-semibold duration-200' onClick={saveDetails}>Save</button>
                </div>
            </div>
        </form>
    )
}

export default CreateContainer