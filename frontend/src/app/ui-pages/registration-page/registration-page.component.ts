import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-registration-page',
  templateUrl: './registration-page.component.html',
  styleUrls: ['./registration-page.component.scss']
})
export class RegistrationPageComponent implements OnInit {
  reactiveForm: FormGroup;

  constructor() { }

  ngOnInit(): void {
    this.reactiveForm = new FormGroup({
      surname: new FormControl(null, [
        Validators.required,
        Validators.maxLength(255),
      ]),
      firstname: new FormControl(null, [
        Validators.required,
        Validators.maxLength(255),
      ]),
      username: new FormControl(null, [
        Validators.required,
        Validators.maxLength(255),
      ]),
      password: new FormControl(null, [
        Validators.required,
        Validators.maxLength(255),
        Validators.minLength(8),
      ]),
      passwordRepeat: new FormControl(null, [
        Validators.required,
        Validators.maxLength(255),
        Validators.minLength(8),
      ]),
    });
  }

  onSubmit() {

  }

}
