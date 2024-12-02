import Input from "./Input";
import Button from "./Button";
import { useState } from "react";
import SignUp from "../pages/SignUp";

function SignUpSignIn() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

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
          label="Full Name"
          state={name}
          setState={setName}
          placeholder="Your Name"
        />
        <Input
          label="Email"
          state={email}
          setState={setEmail}
          placeholder="YourEmail@gmail.com"
        />
        <Input
          label="Password"
          state={password}
          setState={setPassword}
          placeholder="Your Password"
        />
        <Input
          label="Confirm Password"
          state={confirmPassword}
          setState={setConfirmPassword}
          placeholder=" Confirm Your Password"
        />
        <Button buttonLabel="Sign Up" isPrimary={true} />
        <p className="text-center">or</p>
        <Button buttonLabel="SignUp with Google" isPrimary={false} />
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
