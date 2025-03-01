import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

/**
 * Minimum 8 characters.
 * At least one uppercase letter.
 * At least one lowercase letter.
 * At least one digit.
 * At least one special character
 * @returns 
 */
export function passwordValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
        const value = control.value;

        if (!value) {
            return { required: true };
        }

        const hasUpperCase = /[A-Z]/.test(value);
        const hasLowerCase = /[a-z]/.test(value);
        const hasDigit = /[0-9]/.test(value);
        const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(value);
        const isValidLength = value.length >= 8;

        const isValid = hasUpperCase && hasLowerCase && hasDigit && hasSpecialChar && isValidLength;

        return isValid ? null : {
            passwordStrength: {
                hasUpperCase,
                hasLowerCase,
                hasDigit,
                hasSpecialChar,
                isValidLength,
            },
        };
    };
}
