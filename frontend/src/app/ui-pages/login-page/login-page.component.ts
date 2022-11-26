import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {
  reactiveForm: FormGroup;

  constructor() { }

  ngOnInit(): void {
    this.reactiveForm = new FormGroup({
      username: new FormControl(null, [
        Validators.required,
        Validators.maxLength(255),
      ]),
      password: new FormControl(null, [
        Validators.required,
        Validators.maxLength(255),
        Validators.minLength(8),
      ])
    });
  }

  onSubmit() {}

}
