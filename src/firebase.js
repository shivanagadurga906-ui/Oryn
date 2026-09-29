import { initializeApp } from "firebase/app";
import { 
  getFirestore, 
  collection, 
  doc, 
  setDoc, 
  getDocs, 
  addDoc, 
  onSnapshot 
} from "firebase/firestore";
import { 
  getStorage, 
  ref, 
  uploadBytes, 
  getDownloadURL 
} from "firebase/storage";
import { getAnalytics, isSupported } from "firebase/analytics";

// User's provided Firebase configuration
export const firebaseConfig = {
  apiKey: "AIzaSyAaaykm-OrrEB2BYBuUr5HDErx0wv_3KwI",
  authDomain: "oryn-1dbb0.firebaseapp.com",
  projectId: "oryn-1dbb0",
  storageBucket: "oryn-1dbb0.firebasestorage.app",
  messagingSenderId: "261198186467",
  appId: "1:261198186467:web:99b17ceac0c68c18bd42d6",
  measurementId: "G-6BV07NPGS1"
};

// Initialize Firebase App
export const app = initializeApp(firebaseConfig);

// Initialize Firestore
export const db = getFirestore(app);

// Initialize Storage
export const storage = getStorage(app);

// Initialize Analytics (browser-compatible check)
export let analytics = null;
if (typeof window !== "undefined") {
  isSupported().then((supported) => {
    if (supported) {
      analytics = getAnalytics(app);
      console.log("Firebase Analytics initialized");
    }
  }).catch(() => {
    // Graceful fallback
  });
}

/**
 * Save chat message to Firestore with LocalStorage fallback
 */
export async function saveChatMessageToCloud(message) {
  try {
    const colRef = collection(db, "bizai_chats");
    await addDoc(colRef, {
      ...message,
      createdAt: new Date().toISOString()
    });
    return { success: true, source: "firestore" };
  } catch (error) {
    console.warn("Firestore save fallback to local:", error.message);
    const local = JSON.parse(localStorage.getItem("bizai_chats") || "[]");
    local.push({ ...message, createdAt: new Date().toISOString() });
    localStorage.setItem("bizai_chats", JSON.stringify(local));
    return { success: true, source: "local" };
  }
}

/**
 * Upload a document/CSV to Firebase Storage with LocalStorage fallback
 */
export async function uploadDocumentToStorage(file) {
  try {
    const storageRef = ref(storage, `financial_imports/${Date.now()}_${file.name}`);
    const snapshot = await uploadBytes(storageRef, file);
    const url = await getDownloadURL(snapshot.ref);
    return { success: true, url, name: file.name, size: file.size, source: "storage" };
  } catch (error) {
    console.warn("Storage upload fallback to mock/local:", error.message);
    const mockUrl = URL.createObjectURL(file);
    return { success: true, url: mockUrl, name: file.name, size: file.size, source: "local" };
  }
}
