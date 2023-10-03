import React, { useState } from "react"
import Header from "./Header"

const Login = () => {
	const [isSignInForm, setIsSignInForm] = useState(true)

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
			<form className="absolute top-1/4 mx-auto right-0 left-0 w-96 py-10 px-8 bg-black bg-opacity-80 text-white flex flex-col rounded-md">
				<h2 className="font-bold text-3xl mb-8">
					{isSignInForm ? "Sign In" : "Sign Up"}
				</h2>
				{!isSignInForm && (
					<input
						type="text"
						placeholder="Full Name"
						className="p-4 mb-4 bg-gray-800 text-lg  rounded-md border-none outline-none"
					/>
				)}
				<input
					type="email"
					placeholder="Email address"
					className="p-4 mb-4 bg-gray-800 text-lg rounded-md border-none outline-none"
				/>
				<input
					type="password"
					placeholder="Password"
					className="p-4 mb-10  bg-gray-800 text-xl rounded-md border-none outline-none"
				/>
				<button className="p-4 mb-4 bg-red-700 w-full rounded-md border-none outline-none">
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
