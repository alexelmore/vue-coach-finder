export function validateForm(email, password = '', other = '') {
    let emailValidation = {
        val: '',
        errorMessage: '',
    };

    let passwordValidation = {
        val: '',
        errorMessage: '',
    };

    let otherValidation = {
        val: '',
        errorMessage: '',
    }

    let formObject = {}

    if (email.val === '') {
        emailValidation.isValid = false;
        emailValidation.errorMessage = 'Email field cannot be left blank';
        emailValidation.val = ''
    } else {
        let format =
            /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/i.test(
                email.val
            );
        if (format) {
            emailValidation.isValid = true;
            emailValidation.val = email.val;
            emailValidation.errorMessage = ''
        } else {
            emailValidation.isValid = false;
            emailValidation.errorMessage = 'Please enter a valid email address';
            emailValidation.val = email.val;
        }
    }

    if (password !== '') {
        if (password.val === '') {
            passwordValidation.isValid = false;
            passwordValidation.errorMessage = 'Password field cannot be left blank';
            passwordValidation.val = password.val
        } else if (password.val.length < 6) {
            passwordValidation.isValid = false;
            passwordValidation.errorMessage =
                'All passwords must have at least 6 characters';
            passwordValidation.val = password.val
        } else {
            passwordValidation.isValid = true;
            passwordValidation.val = password.val;
            passwordValidation.errorMessage = ''
        }
    }

    if (other !== '') {
        if (other.val === '') {
            otherValidation.isValid = false;
            otherValidation.errorMessage = 'This field cannot be left blank'
        } else {
            otherValidation.isValid = true;
            otherValidation.val = other.val;
            otherValidation.errorMessage = ''
        }
    }

    formObject = other === '' ? { emailValidation, passwordValidation } : { emailValidation, otherValidation }
    return formObject;
}