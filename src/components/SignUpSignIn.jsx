import React from "react";
import Input from "./Input";
import Button from "./Button";
import { useState } from "react";
import SignUp from "../pages/SignUp";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { auth, db } from "../../firebase";
import { ToastContainer, toast } from "react-toastify";
import { useRef } from "react";
import Dashboard from "../pages/Dashboard";
import { useNavigate } from "react-router-dom";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
function SignUpSignIn() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [logIn, setLogin] = useState(false);
  const navigate = useNavigate();

  // function to signupwithemail
  function signUpWithEmail() {
    //authenticate the user, or basically create a new account using email and password
    setLoading(true);
    if (name != "" && email != "" && password != "" && confirmPassword != "") {
      if (password == confirmPassword) {
        createUserWithEmailAndPassword(auth, email, password)
          .then((userCredential) => {
            // Signed up
            const user = userCredential.user;

            toast.success("You are in!");
            setLoading(false);
            setName("");
            setEmail("");
            setPassword("");
            setConfirmPassword("");
            createDoc(user);
            navigate("/dashboard");

            // creating the doc with the user id as following id
          })
          .catch((error) => {
            setLoading(false);
            const errorCode = error.code;
            const errorMessage = error.message;
            toast.error(errorMessage);
            // ..
          });
      } else {
        toast.error("password and confirm password doesn't match");
      }
    } else {
      setLoading(false);
      toast.error("All fields are mandatory,Please fill it!");
    }
    console.log("first");
  }

  // login form Function  with email/*
  function loginWithEmail() {
    setLoading(true);
    if (email != "" && password != "") {
      signInWithEmailAndPassword(email, password)
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
          navigate("/dashboard");
          setLoading(false);
          toast.success("logged in");
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          toast.error(error.message);
          setLoading(false);
        });
    } else {
      toast.error("check all the fields");
      setLoading(false);
    }
    console.log("clicked");
  }

  // signUp form Function  with email
  const provider = new GoogleAuthProvider();
  function signInWithGoogle() {
    // Handle loading state before the sign-in starts
    setLoading(true);

    // Use async/await to handle the sign-in process
    signInWithPopup(auth, provider)
      .then((result) => {
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        const user = result.user;

        // Successfully signed in
        toast.success("User authenticated!");

        // Handle post-authentication actions here
      })
      .catch((error) => {
        // Handle Errors
        const errorMessage = error.message;
        toast.error(errorMessage);
      })
      .finally(() => {
        // Always set loading to false, whether success or error
        setLoading(false);
      });
  }

  async function createDoc(user) {
    //make sure doc with same user id doesn't exist
    //create doc
    if (!user) return;
    const userRef = doc(db, "users", user.uid);
    const userData = await getDoc(userRef);

    if (!userData.exists()) {
      const { displayName, email, photoURL } = user;
      const createdAt = new Date();
      try {
        await setDoc(doc(db, "users", user.uid), {
          name: user.displayName ? user.displayName : name,
          email,
          photoURL: user.photoURL ? user.photoURL : "",
          createdAt: new Date(),
        });
        toast.success("Doc created!!!");
        setLoading(false);
      } catch (e) {
        toast.error(e.message);
        //console.error("Error writing document: ", e);
        setLoading(false);
      }
    } else {
      toast.error("User already exist🙁 ");
      setLoading(false);
    }
  }

  return (
    <>
      {logIn ? (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-500 to-indigo-600">
          <div className="p-8 bg-white rounded-lg shadow-xl w-96">
            <h2 className="mb-6 text-3xl font-bold text-center text-gray-800">
              Login on <span className="text-indigo-600">SpendWise</span>
            </h2>
            <p className="mb-4 text-xl text-center text-gray-600">
              Manage your finances effortlessly.
            </p>

            <Input
              type="text"
              label="Email"
              state={email}
              setState={setEmail}
              placeholder="YourEmail@gmail.com"
            />
            <Input
              label="Password"
              type="password"
              state={password}
              setState={setPassword}
              placeholder="Your Password"
            />

            <Button
              buttonLabel={
                loading ? "Loading..." : "Login With Email & Password"
              }
              isPrimary={true}
              onClick={loginWithEmail}
              disabled={loading}
            />
            <p className="text-center">or</p>
            <Button
              onClick={signInWithGoogle}
              disabled={loading}
              buttonLabel={loading ? "Loading..." : "LogIn with Google"}
            />

            <p className="mt-6 text-sm text-center text-gray-600">
              Don't have an account?
              <a
                href="#"
                className="font-medium text-indigo-600 hover:underline"
                onClick={() => {
                  setLogin(false);
                }}
              >
                SignUp
              </a>
            </p>
          </div>
        </div>
      ) : (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-500 to-indigo-600">
          <div className="p-8 bg-white rounded-lg shadow-xl w-96">
            <h2 className="mb-6 text-3xl font-bold text-center text-gray-800">
              Sign Up on <span className="text-indigo-600">SpendWise</span>
            </h2>
            <p className="mb-4 text-xl text-center text-gray-600">
              Manage your finances effortlessly.
            </p>
            <Input
              type="text"
              label="Full Name"
              state={name}
              setState={setName}
              placeholder="Your Name"
            />
            <Input
              type="text"
              label="Email"
              state={email}
              setState={setEmail}
              placeholder="YourEmail@gmail.com"
            />
            <Input
              label="Password"
              type="password"
              state={password}
              setState={setPassword}
              placeholder="Your Password"
            />
            <Input
              label="Confirm Password"
              type="password"
              state={confirmPassword}
              setState={setConfirmPassword}
              placeholder=" Confirm Your Password"
            />
            <Button
              buttonLabel={loading ? "Loading..." : "Sign Up"}
              isPrimary={true}
              onClick={signUpWithEmail}
              disabled={loading}
            />
            <p className="text-center">or</p>
            <Button
              disabled={loading}
              onClick={signInWithGoogle}
              buttonLabel={loading ? "Loading..." : "SignUp with Google"}
            />
            <p className="mt-6 text-sm text-center text-gray-600">
              Already have an account?
              <a
                href="#"
                className="font-medium text-indigo-600 hover:underline"
                onClick={() => {
                  setLogin(true);
                }}
              >
                Log In
              </a>
            </p>
          </div>
        </div>
      )}
    </>
  );
}

export default SignUpSignIn;
