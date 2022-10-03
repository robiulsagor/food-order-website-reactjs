import { AnimatePresence, motion } from "framer-motion";
import { Route, Routes } from "react-router-dom";
import CreateContainer from "./components/CreateContainer";
import Header from "./components/Header";
import MainContainer from "./components/MainContainer";
import { MdCheck } from "react-icons/md"
import { HiOutlineExclamationCircle } from "react-icons/hi"
import { useDispatch, useSelector } from "react-redux";
import { removeNotification } from "./features/notificationSlice";
import { useEffect } from "react";
import { getAllFoodItems } from "./utils/firebaseFunctions";
import { set_food } from "./features/foodSlice";
import CartContainer from "./components/CartContainer";

function App() {
  const notification = useSelector(state => state.notification)
  const dispatch = useDispatch()
  const { isCartOpen } = useSelector(state => state.showCart)

  const fetchData = async () => {
    await getAllFoodItems().then(data => {
      dispatch(set_food(data))
    })
  }

  useEffect(() => {
    fetchData()
  }, [])

  notification.type !== null && (
    setTimeout(() => {
      dispatch(removeNotification())
    }, 2000))

  return (
    <AnimatePresence mode="wait">
      <div className="w-screen h-auto flex flex-col bg-primary relative">
        <Header />

        {notification.msg !== null && (
          <motion.div className="z-50 flex gap-3 items-center justify-center fixed right-0 left-0"
            initial={{ top: 0, opacity: 0 }}
            animate={{ top: 150, opacity: 1 }}
            exit={{ top: 0, opacity: .3 }}
            transition={{ duration: 1 }}>

            <div
              className={notification.type === "success" ? "border-2 border-blue-500 rounded px-3 py-3 shadow-lg shadow-blue-400 bg-green-200 text-slate-800 text-lg" :
                "border-2 border-blue-500 rounded px-3 py-3 shadow-lg shadow-blue-400 bg-red-400 text-slate-50 text-lg"}>

              {notification.type === "success" && <MdCheck className="inline-block mr-2" />}
              {notification.type === "warning" && <HiOutlineExclamationCircle className="inline-block mr-2" />}

              <p className="inline-block">
                {notification.msg}
              </p>
            </div>
          </motion.div>
        )}

        <main className="mt-14 md:mt-16 p-4 md:px-16 md:pt-8 w-full">
          <Routes>
            <Route path="/" element={<MainContainer />} />
            <Route path="/createItem" element={<CreateContainer />} />
          </Routes>

          {isCartOpen && <CartContainer />}
        </main>
      </div>
    </AnimatePresence>
  );
}

export default App;
