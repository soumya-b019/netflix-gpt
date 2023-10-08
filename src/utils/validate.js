export const checkValidData = (fullName, email, password) => {
	let fullNameError = "", emailError = "", passwordError = "";

	// Regex
	const isEmailValid =
		/^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/.test(email?.current?.value)

	const isPasswordValid =
		/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/.test(password?.current?.value)

	// For name
	if (fullName === '') {
		fullNameError = "Full Name is required"
	}

	// For email
	if (email === '') {
		emailError = "Email is required"
	} else if (isEmailValid) {
		emailError = "Email is not valid"
	}

	// For password
	if (password === '') {
		passwordError = "Password is required"
	} else if (isPasswordValid) {
		passwordError = "Password is not valid"
	}

	const message = {
		fullNameError: fullNameError,
		emailError: emailError,
		passwordError: passwordError,
	}

	return message
}
