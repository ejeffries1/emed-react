export const validateRegisterForm = (values) => {
    const errors = {};

    // Validate firstName
    if (!values.firstName) {
        errors.firstName = 'Required';
    } else if (values.firstName.length < 2) {
        errors.firstName = 'Must be at least 2 characters.';
    } else if (values.firstName.length > 30) {
        errors.firstName = 'Must be 30 characters or less.';
    }

    // Validate lastName
    if (!values.lastName) {
        errors.lastName = 'Required';
    } else if (values.lastName.length < 2) {
        errors.lastName = 'Must be at least 2 characters.';
    } else if (values.lastName.length > 30) {
        errors.lastName = 'Must be 30 characters or less.';
    }

    // Validate username
    if (!values.username) {
        errors.username = 'Required';
    } else if (values.username.length < 6) {
        errors.username = 'Must be at least 6 characters.';
    } else if (values.username.length > 15) {
        errors.username = 'Must be 15 characters or less.';
    }

    // Validate email
    if (!values.email) {
        errors.email = 'Required';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
        errors.email = 'Invalid email address';
    }

    // Validate password
    if (!values.password) {
        errors.password = 'Required';
    } else if (values.password.length < 8) {
        errors.password = 'Must be at least 8 characters.';
    } else if (values.password.length > 20) {
        errors.password = 'Must be 20 characters or less.';
    }

    // Validate confirmPassword
    if (!values.confirmPassword) {
        errors.confirmPassword = 'Required';
    } else if (values.confirmPassword !== values.password) {
        errors.confirmPassword = 'Passwords must match.';
    }

    return errors;
};
