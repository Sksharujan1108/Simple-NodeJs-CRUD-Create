// Regex patterns
const phoneRegex: RegExp = /^\d{10}$/;

 const emailRegex: RegExp = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;

 const passwordRegex: RegExp = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

// Export validation functions and patterns
export {
    phoneRegex,
    emailRegex,
    passwordRegex,
};