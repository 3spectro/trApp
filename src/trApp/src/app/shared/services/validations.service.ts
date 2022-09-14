import { FormGroup } from '@angular/forms';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ValidationsService {

  constructor() { }

  getValidationClass(input: any): string {
    if (!input?.touched || input.disabled) return '';
    return input.invalid ? 'invalid-input' : 'valid-input';
  }

  getDateValidationClass(input: any, form: FormGroup): string {
    if (!input?.touched || input.disabled) return '';
    else {
      if (!form || form.invalid) return 'invalid-date-input';
      return input.invalid ? 'invalid-date-input' : 'valid-date-input';
    }
  }
}
