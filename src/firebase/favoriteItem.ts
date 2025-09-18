import { db } from "@/lib/firebase";
import { collection, deleteDoc, doc, getDocs, setDoc } from "firebase/firestore";

export const saveFavorite = async (id: any, data: any, email: any) => {
    const favoriteRef = doc(db, "favorites", `${id}_${email}`);
    await setDoc(favoriteRef, data)
        .then(() => {
            console.log("Document updated with ID: ", id);
        })
        .catch((error) => {
            console.error("Error updating document: ", error);
        });
};

export const getFavoritesByEmail = async (email: string) => {
    const favoritesCol = collection(db, "favorites");
    const snapshot = await getDocs(favoritesCol);
    const favorites = snapshot.docs
        .filter(doc => doc.id.endsWith(`_${email}`))
        .map(doc => ({ id: doc.id, ...doc.data() }));
    return favorites;
};

export const removeFavorite = async (id: string, email: string) => {
    const favoriteRef = doc(db, "favorites", `${id}_${email}`);
    await deleteDoc(favoriteRef)
        .then(() => {
            console.log("Document removed with ID: ", id);
        })
        .catch((error) => {
            console.error("Error removing document: ", error);
        });
};