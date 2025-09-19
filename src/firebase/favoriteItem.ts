import { collection, deleteDoc, doc, getDocs, getFirestore, setDoc } from '@react-native-firebase/firestore';


const db = getFirestore();

export const saveFavorite = async (id: string, data: any, email: string) => {
  try {
    await setDoc(doc(collection(db, "favorites"), `${id}_${email}`), data);
    console.log("Document updated with ID: ", id);
  } catch (error) {
    console.error("Error updating document: ", error);
  }
};

export const getFavoritesByEmail = async (email: string) => {
  try {
    const snapshot = await getDocs(collection(db, "favorites"));
    const favorites = snapshot.docs
      .filter((docSnap: any) => docSnap.id.endsWith(`_${email}`))
      .map((docSnap: any) => ({ id: docSnap.id, ...docSnap.data() }));
    return favorites;
  } catch (error) {
    return [];
  }
};


export const removeFavorite = async (id: number, email: string) => {
  try {
    await deleteDoc(doc(collection(db, "favorites"), `${id}_${email}`));
  } catch (error) {
    console.error("Error removing document: ", error);
  }
};