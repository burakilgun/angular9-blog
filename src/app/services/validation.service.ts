import { Injectable } from '@angular/core';
import { AbstractControl } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class ValidationService {

  constructor() { }

  getValidationMessages(f: AbstractControl, name: string) {
    if (f.errors) {
      for (let errorName in f.errors) {
        if (errorName == "required") {
          return `${name} alanı boş bırakılamaz.`;
        }
        else if(errorName == "email"){
          return "Email formatı yanlış";
        }
        else if(errorName == "minlength"){
          return `${name} alanı en az 5 karakter olmalıdır.`;
        }
      }
    }
  }  
}
