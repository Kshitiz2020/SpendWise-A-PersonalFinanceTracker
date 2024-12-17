import React, { useEffect } from "react";
import { auth } from "../../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import { getAuth, signOut } from "firebase/auth";
import { toast } from "react-toastify";
import userImg from "../assets/user.svg";

function Header() {
  const [user, loading] = useAuthState(auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && user) {
      navigate("/dashboard");
    }
  }, [user, loading]);

  function logout() {
    try {
      signOut(auth)
        .then(() => {
          // Sign-out successful.
          toast.success("Logged Out, visit us soon!");
          navigate("/");
        })
        .catch((error) => {
          // An error happened.
          toast.error(error.message);
        });
    } catch (e) {
      toast.error(e.message);
    }
  }

  return (
    <>
      <div className="h-[4rem] text-white bg-primary px-[2rem] pt-[1rem] text-2xl flex justify-between items-center">
        <p>SpendWise</p>
        {user && (
          <div>
            <img src={user.photoURL ? user.photoURL : userImg} />
            <p onClick={logout}>Logout</p>
          </div>
        )}
      </div>
    </>
  );
}
export default Header;
