
import { createContext, useEffect, useState } from "react";
import { createUserWithEmailAndPassword, onAuthStateChanged, sendPasswordResetEmail, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { auth } from "./firebase-config";
export const authContex = createContext();
const AuthProvider = ({ children }) => {
  const [user, setUser] = useState("");
   const [loading,setLoading]=useState(true)
   
   
  const registerWithPassword = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };
  const SignInWithPassword = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };
   const passwordReset =(email)=>{
      return sendPasswordResetEmail(auth, email)
   }

  const logout = () => {
    signOut(auth)
      .then(() => {
       
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
const unSubscriber =onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return ()=>{
       return unSubscriber();
    }
  }, []);

  const authInfo = {
    user,
    registerWithPassword,
    SignInWithPassword,
    logout,
    loading,
    passwordReset,
  };
  return <authContex.Provider value={authInfo}>{children}</authContex.Provider>;
};

export default AuthProvider;
