import { collection, doc, getDocs, orderBy, query, setDoc } from "firebase/firestore"
import { firestore } from "../firebaseConfig"

// saving new item
export const saveItem = async (data) => {
    await setDoc(doc(firestore, "foodItems", `${Date.now()}`), data, {
        merge: true
    })
}

// get collection from db
export const getAllFoodItems = async () => {
    const items = await getDocs(
        query(collection(firestore, "foodItems"), orderBy("id"))
    )

    return items.docs.map(doc => doc.data())
}