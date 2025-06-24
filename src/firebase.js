
import { initializeApp } from "firebase/app";
import {
    createUserWithEmailAndPassword,
    getAuth,
    signInWithEmailAndPassword,
    signOut
} from "firebase/auth";
import { EmailAuthProvider } from "firebase/auth/web-extension";
import {
    addDoc,
    collection,
    getFirestore
} from "firebase/firestore";
import { toast } from "react-toastify";





const firebaseConfig = {
    apiKey: "AIzaSyDsLh2-zvoew4eBdP02vLz6ivPdj8ZWi6g",
    authDomain: "netflix-clone-6e2b3.firebaseapp.com",
    projectId: "netflix-clone-6e2b3",
    storageBucket: "netflix-clone-6e2b3.firebasestorage.app",
    messagingSenderId: "556179830783",
    appId: "1:556179830783:web:fc01fdd3aaa1b7492419ca"
};


const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);


const signup = async (name, email, password) => {
    try {
        const res = await createUserWithEmailAndPassword(auth, email, password);
        const user = res.user;
        await addDoc(collection(db, "user"), {
            uid: user.uid,
            name,
            EmailAuthProvider: "local",
            email,

        });
    } catch (error) {
        console.log(error);
        toast.error(error.code.split('/')[1].split('-').join(" "));

    }
}
const login = async (email, password) => {
    try {
        await signInWithEmailAndPassword(auth, email, password);

    } catch (error) {
        console.log(error);
        toast.error(error.code.split('/')[1].split('-').join(" "));

    }

}
const logout = () => {
    signOut(auth);
}

export { auth, db, login, signup, logout };