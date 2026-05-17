import { useEffect, useRef, useState } from "react";
import supabase from "../config/supabase";
import { AuthContext } from "./AuthContext";
import useAxios from "../config/axios";
import Loading from "../components/Shared/Loading";

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [DBuser, setDBuser] = useState(null);
  const [loading, setLoading] = useState(true);
  const axiosNormal = useAxios();
  const savedRef  = useRef(false); 
  

  const saveUserToDB = async (supabaseUser, token) => {
    try {
      const username =
        supabaseUser?.user_metadata?.user_name ||
        supabaseUser?.user_metadata?.name ||
        supabaseUser?.email?.split("@")[0];

   const res = await axiosNormal.post(
        "/users/create",
        { username },
        { headers: { Authorization: `Bearer ${token}` } }
      );
        setDBuser(res.data.user);
      

    } catch (error) {
      console.log("DB save error:", error.message);
    }
  };


 


  useEffect(() => {
      const timeout = setTimeout(() => {
    setLoading(false);
  }, 2000);
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        console.log("Auth event:", event);

        if (event === "SIGNED_OUT") {
          setUser(null);
          savedRef.current = false; // reset
          setLoading(false);
          return;
        }

        if (event === "INITIAL_SESSION") {
          if (session?.user) {
            setUser(session.user);
          } else {
            setUser(null);
          }
          setLoading(false);
          return;
        }

        if (event === "SIGNED_IN") {
          setUser(session.user);

          if (!savedRef.current) {
            savedRef.current = true;
            await saveUserToDB(session.user, session.access_token);
          }

          setLoading(false);
          return;
        }

        // if (event === "USER_UPDATED") {
          setUser(session?.user || null);
          setLoading(false);
        // }

      }
    );

    return () => {
      subscription.unsubscribe()
      clearTimeout(timeout);

    };
  }, []);


  const loginWithGoogle = () =>
    supabase.auth.signInWithOAuth({ provider: "google" });

  const signUp = (email, password) =>
    supabase.auth.signUp({ email, password });

  const login = (email, password) =>
    supabase.auth.signInWithPassword({ email, password });

  const logout = async () => {
    const { error } = await supabase.auth.signOut({ scope: "global" });
    if (error) console.log("Logout error:", error);
  };

  const authInfo = { user, loading, login, signUp, loginWithGoogle, logout ,DBuser};


  return (
    <AuthContext.Provider value={authInfo}>
      { loading ? <Loading></Loading> : children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;