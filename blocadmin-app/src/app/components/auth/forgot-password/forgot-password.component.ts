import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../../services/auth.service";
import {PasswordService} from "../../../services/password.service";
import {EmailValidator} from "@angular/forms";

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {
  email: EmailValidator | undefined;

  constructor(private passwordService: PasswordService,) {
  }

  ngOnInit(): void {
    console.log("Initiate forgot pass");
  }

  public sendEmail(email:any): void {
    console.log("email",email)
    this.passwordService.sendEmail(email)
      .subscribe(
        response => {
          console.log("Responce", response)
        },
        error => {
          console.log(error);
        });
    // return response;
  }
}
