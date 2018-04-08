import { ValidatorFn, FormGroup } from '@angular/forms';

// factory to return a form validator function
// takes the names of 2 form controls and validates if their values are the same
// form validator functions return null if the form is valid
// and a validation error object if it is not valid
export function identicalValuesValidator(controlA: string, controlB: string): ValidatorFn {
    return (group: FormGroup): {[key: string]: any} => {
        const identical = group.controls[controlA].value === group.controls[controlB].value;
        return identical ? null : {'identicalValues': {message: 'The values do not match!'}};
    };
}
