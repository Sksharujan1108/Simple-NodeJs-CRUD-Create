// Regex patterns
const phoneRegex: RegExp = /^\d{10}$/;

const emailRegex: RegExp = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;

const passwordRegex: RegExp = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{10,}$/;

// Export validation functions and patterns
export {
    phoneRegex,
    emailRegex,
    passwordRegex,
};