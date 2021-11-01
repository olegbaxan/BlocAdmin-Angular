import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../../services/auth.service";
import {Router} from "@angular/router";
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  form: any = {
    username: null,
    email: null,
    password: null,
    description:null,
    name:null,
    surname:null,
    mobile:null,
    idnp:null,

  };
  isSuccessful = false;
  isSignUpFailed = false;
  errorMessage = '';
  constructor(private authService: AuthService, private router:Router) { }

  ngOnInit(): void {
  }
  onSubmit(): void {
    const { username, email, password,description,name,surname,idnp,mobile } = this.form;

    this.authService.register(username, email, password,description,name,surname,idnp,mobile).subscribe(
      data => {
        console.log(data);
        this.isSuccessful = true;
        this.isSignUpFailed = false;
        this.router.navigate(['/login']);
      },
      err => {
        this.errorMessage = err.error.message;
        this.isSignUpFailed = true;
      }
    );
  }
}
