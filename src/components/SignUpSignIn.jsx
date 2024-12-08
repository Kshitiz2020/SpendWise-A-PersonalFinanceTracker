import React from "react";
import Input from "./Input";
import Button from "./Button";
import { useState } from "react";
import SignUp from "../pages/SignUp";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";
import { ToastContainer, toast } from "react-toastify";

function SignUpSignIn() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // function to signupwithemail
  function signUpWithEmail() {
    //authenticate the user, or basically create a new account using email and password

    if (name != "" && password != "" && confirmPassword != "") {
      createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          // Signed up
          const user = userCredential.user;
          // ...
          toast.success("You are in!");
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          toast.error(errorMessage);
          // ..
        });
    } else {
      toast.err("All fields are mandatory,Please fill it!");
    }
  }

  return (
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
          buttonLabel="Sign Up"
          isPrimary={true}
          onClick={signUpWithEmail}
        />
        <p className="text-center">or</p>
        <Button buttonLabel="SignUp with Google" />
        <p className="mt-6 text-sm text-center text-gray-600">
          Already have an account?
          <a href="#" className="font-medium text-indigo-600 hover:underline">
            Log In
          </a>
        </p>
      </div>
    </div>
  );
}

export default SignUpSignIn;
