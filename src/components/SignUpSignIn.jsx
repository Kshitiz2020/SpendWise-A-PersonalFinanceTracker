import React, { useState } from "react";
import Input from "./Input";
import Button from "./Button";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { auth, db } from "../../firebase";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { GoogleAuthProvider } from "firebase/auth";

function SignUpSignIn() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [logIn, setLogin] = useState(false);
  const navigate = useNavigate();
  const provider = new GoogleAuthProvider();

  // Centralized user document creation
  const createUserDocument = async (user) => {
    if (!user) return;

    const userRef = doc(db, "users", user.uid);
    const userData = await getDoc(userRef);

    if (!userData.exists()) {
      try {
        await setDoc(userRef, {
          name: user.displayName || name,
          email: user.email,
          photoURL: user.photoURL || "",
          createdAt: new Date(),
        });
        toast.success("Account Created Successfully!");
      } catch (error) {
        toast.error(`Document creation error: ${error.message}`);
        console.error("Error creating user document", error);
      }
    }
  };

  // Unified authentication method
  const handleAuthentication = async (isLogin = false) => {
    setLoading(true);
    try {
      // Validate inputs
      if (!isLogin && password !== confirmPassword) {
        toast.error("Passwords do not match");
        setLoading(false);
        return;
      }

      if (!email || !password) {
        toast.error("Please fill in all required fields");
        setLoading(false);
        return;
      }

      // Choose authentication method based on login status
      const authMethod = isLogin
        ? signInWithEmailAndPassword
        : createUserWithEmailAndPassword;

      const userCredential = await authMethod(auth, email, password);
      const user = userCredential.user;

      // Create user document for signup
      if (!isLogin) {
        await createUserDocument(user);
      }

      // Navigate and show success message
      navigate("/dashboard");
      toast.success(
        isLogin ? "Logged in successfully!" : "Account created successfully!"
      );
    } catch (error) {
      toast.error(error.message);
      console.error(isLogin ? "Login error" : "Signup error", error);
    } finally {
      setLoading(false);
      // Reset form state
      setEmail("");
      setPassword("");
      setConfirmPassword("");
    }
  };

  // Google Sign-In Method
  const signInWithGoogle = async () => {
    setLoading(true);
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      await createUserDocument(user);

      navigate("/dashboard");
      toast.success("Google Authentication Successful!");
    } catch (error) {
      toast.error(`Google Sign-In Error: ${error.message}`);
      console.error("Google Sign-In Error", error);
    } finally {
      setLoading(false);
    }
  };

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
              type="email"
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
              onClick={() => handleAuthentication(true)}
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
                onClick={() => setLogin(false)}
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
              type="email"
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
              placeholder="Confirm Your Password"
            />
            <Button
              buttonLabel={loading ? "Loading..." : "Sign Up"}
              isPrimary={true}
              onClick={() => handleAuthentication(false)}
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
                onClick={() => setLogin(true)}
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
