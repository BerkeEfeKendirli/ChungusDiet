import { doc, getDoc, onSnapshot, setDoc, updateDoc } from "firebase/firestore";
import { db } from "../config/firebaseConfig";

export const getUserProfile = async (userId) => {
  try {
    const userDocRef = doc(db, "users", userId);
    const userDoc = await getDoc(userDocRef);

    if (userDoc.exists()) {
      return userDoc.data();
    } else {
      return null;
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const createUserProfile = async (userId, userData) => {
  try {
    const userDocRef = doc(db, "users", userId);
    const profileData = {
      uid: userId,
      email: userData.email,
      isProfileComplete: false,
      createdAt: new Date(),
      profile: {
        weight: null,
        height: null,
        age: null,
        gender: null,
        activityLevel: null,
        weightGoal: null,
        targetWeight: null,
        targetCalories: null,
      },
    };

    await setDoc(userDocRef, profileData);
    return profileData;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const updateUserProfile = async (
  userId,
  profileData,
  isProfileComplete
) => {
  try {
    const userDocRef = doc(db, "users", userId);
    await updateDoc(userDocRef, {
      profile: profileData,
      isProfileComplete: isProfileComplete,
    });
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export function listenUserProfile(uid, callback) {
  return onSnapshot(doc(db, "users", uid), (docSnap) => {
    callback(docSnap.exists() ? docSnap.data() : null);
  });
}
