import {FormGroup} from '@angular/forms';
import {findIndex} from 'rxjs/operators';

export function mustMatch(controlName: string, matchingControlName: string) {
  return (formGroup: FormGroup) => {
    const control = formGroup.controls[controlName];
    const matchingControl = formGroup.controls[matchingControlName];

    if (matchingControl.errors && !matchingControl.errors.mustMatch) {
      // return if another validator has already found an error on the matchingControl
      return;
    }

    // set error on matchingControl if validation fails
    if (control.value !== matchingControl.value) {
      matchingControl.setErrors({ mustMatch: true });
    } else {
      matchingControl.setErrors(null);
    }
  };
}

export function validTAxSectionState(controlName: string, matchingControlName: string) {
  return (formGroup: FormGroup) => {
    const control = formGroup.controls[controlName];
    const matchingControl = formGroup.controls[matchingControlName];

    if (matchingControl.errors && !matchingControl.errors.validTaxSectionState) {
      // return if another validator has already found an error on the matchingControl
      return;
    }

    // set error on matchingControl if validation fails
    if (control.value === 'E' && !matchingControl.value) {
      matchingControl.setErrors({ validTaxSectionState: true });
    } else {
      matchingControl.setErrors(null);
    }

  };
}

export function validProductOwn(controlOwn: string, controlNumber: string, controlIdentifier: string) {
  return (formGroup: FormGroup) => {
    const contOwn = formGroup.controls[controlOwn];
    const contNumber = formGroup.controls[controlNumber];
    const contIdentifier = formGroup.controls[controlIdentifier];

    if (!contOwn.value) {
      if (!contIdentifier.value && !contIdentifier.errors) {
        contIdentifier.setErrors({ required: true });
      } else if ( (contIdentifier.value && !contIdentifier.hasError('required') )  ) {
        contIdentifier.setErrors(null );
      }

      contNumber.setErrors(null);

    } else {
      if (!contNumber.value && !contNumber.errors ) {
        contNumber.setErrors({ required: true });
      } else if ( (contNumber.value &&  !contNumber.hasError('required') )  ) {
        contNumber.setErrors(null );
      }

      contIdentifier.setErrors(null );
    }

  };
}

export function validOneFilter(controls: Array<string> ) {
  return (formGroup: FormGroup) => {

    let find = controls.find(value => {
        let control = formGroup.get( value );
        return control.value;
    });

    controls.forEach( value => {
        let control = formGroup.get( value );
        if ( !find ) {
          control.setErrors({ required: true } );
        } else {
          control.setErrors(null );
        }
    });
  };
}
