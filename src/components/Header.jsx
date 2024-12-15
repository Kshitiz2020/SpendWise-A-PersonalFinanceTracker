import React, { useEffect } from "react";
import { auth } from "../../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";

function Header() {
  const [user, loading] = useAuthState(auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate("/dashboard");
    }
  }, [user, loading]);
  function logout() {
    alert("logout!");
  }

  return (
    <>
      <div className="h-[4rem] text-white bg-primary px-[2rem] pt-[1rem] text-2xl flex justify-between items-center">
        <p>SpendWise</p>
        {user && <p onClick={logout}>Logout</p>}
      </div>
    </>
  );
}
export default Header;
