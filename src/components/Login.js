import React, { useState, useRef } from "react"
import Header from "./Header"
import { checkValidData } from "../utils/validate"
import {
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
	updateProfile,
} from "firebase/auth"
import { auth } from "../utils/firebase"
import { useNavigate } from "react-router-dom"
import { useDispatch } from "react-redux"
import { addUser } from "../utils/userSlice"

const Login = () => {
	const [isSignInForm, setIsSignInForm] = useState(true)
	const [errorMessage, setErrorMessage] = useState(null)
	const [validationErrors, setValidationErrors] = useState({})

	const navigate = useNavigate()
	const dispatch = useDispatch()

	const fullName = useRef(null)
	const email = useRef(null)
	const password = useRef(null)

	let message = {}

	const handleButtonClick = () => {
		console.log("fullName: ", fullName?.current?.value)
		console.log("email: ", email?.current?.value)
		console.log("password: ", password?.current?.value)

		const validationResult = checkValidData(
			fullName?.current?.value,
			email?.current?.value,
			password?.current?.value
		)

		// Check if there are validation errors
		if (Object.keys(validationResult).length > 0) {
			// Update the validation errors state
			setValidationErrors(validationResult)
		} else {
			// Clear the validation errors state if there are no errors
			setValidationErrors({})
		}
		console.log(validationResult)

		// if validationResult has some values then don't proceed with sign-in or sign-up logic
		if (
			validationErrors.fullNameError !== "" ||
			validationErrors.emailError !== "" ||
			validationErrors.passwordError !== ""
		) {
			console.log("object is not empty")
			return
		}

		console.log("I haven't returned 👽")

		// Sign-in Sign-up
		if (!isSignInForm) {
			// sign-up logic
			createUserWithEmailAndPassword(
				auth,
				email?.current?.value,
				password?.current?.value
			)
				.then((userCredential) => {
					const user = userCredential.user
					console.log(user)
					updateProfile(user, {
						displayName: fullName?.current?.value,
						photoURL:
							"https://avatars.githubusercontent.com/u/100502907?v=4",
					})
						.then(() => {
							// Profile updated!
							const { uid, email, displayName, photoURL } = auth.currentUser
							dispatch(
								addUser({
									uid: uid,
									email: email,
									displayName: displayName,
									photoURL: photoURL,
								})
							)
							navigate("/browse")
						})
						.catch((error) => {
							// An error occurred
							console.log(error)
						})
					navigate("/browse")
				})
				.catch((error) => {
					const errorCode = error.code
					const errorMessage = error.message
					console.log(errorCode + "-" + errorMessage)
				})
		} else {
			// sign-in logic
			signInWithEmailAndPassword(
				auth,
				email?.current?.value,
				password?.current?.value
			)
				.then((userCredential) => {
					// Signed in
					const user = userCredential.user
					console.log("logged In: ", user)
					navigate("/browse")
				})
				.catch((error) => {
					const errorCode = error.code
					const errorMessage = error.message
					console.log(errorCode + "-" + errorMessage)
				})
		}
	}

	const toggleSignInForm = () => {
		setIsSignInForm(!isSignInForm)
	}

	return (
		<div className="relative">
			<Header />
			<div className="relative">
				<img
					src="https://assets.nflxext.com/ffe/siteui/vlv3/9db4a880-3034-4e98-bdea-5d983e86bf52/b5953637-091d-4e02-9754-2bfadc8a8f7c/IN-en-20230925-popsignuptwoweeks-perspective_alpha_website_large.jpg"
					alt="netflix-banner"
					className="w-full h-auto"
				/>
				<div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black opacity-60"></div>
			</div>
			<form
				onSubmit={(e) => e.preventDefault()}
				className="absolute top-1/4 mx-auto right-0 left-0 w-96 py-10 px-8 bg-black bg-opacity-80 text-white flex flex-col rounded-md"
			>
				<h2 className="font-bold text-3xl mb-8">
					{isSignInForm ? "Sign In" : "Sign Up"}
				</h2>
				{!isSignInForm && (
					<>
						<input
							ref={fullName}
							type="text"
							placeholder="Full Name"
							className="p-4 mb-4 bg-gray-800 text-lg  rounded-md border-none outline-none"
						/>
						{validationErrors.fullNameError && (
							<span className="text-red-500 my-4">
								{validationErrors.fullNameError}
							</span>
						)}
					</>
				)}
				<input
					ref={email}
					type="email"
					placeholder="Email address"
					className="p-4 mb-4 bg-gray-800 text-lg rounded-md border-none outline-none"
				/>
				{validationErrors.emailError && (
					<span className="text-red-500 my-4">
						{validationErrors.emailError}
					</span>
				)}
				<input
					ref={password}
					type="password"
					placeholder="Password"
					className="p-4 mb-10  bg-gray-800 text-xl rounded-md border-none outline-none"
				/>
				{validationErrors.passwordError && (
					<span className="text-red-500 my-4">
						{validationErrors.passwordError}
					</span>
				)}
				{/* <span className="text-red-500 my-4" >{errorMessage}</span> */}
				<button
					onClick={handleButtonClick}
					className="p-4 mb-4 bg-red-700 w-full rounded-md border-none outline-none"
				>
					{isSignInForm ? "Sign In" : "Sign Up"}
				</button>

				<p className="text-gray-500 font-medium">
					{isSignInForm ? "New to netflix?" : "Already a User?"}{" "}
					<span
						onClick={toggleSignInForm}
						className="text-slate-200 hover:underline cursor-pointer"
					>
						{isSignInForm ? "Sign Up" : "Sign In"}
					</span>
				</p>
			</form>
		</div>
	)
}

export default Login
