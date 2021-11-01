import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../../services/auth.service";
import {TokenStorageService} from "../../../services/token-storage.service";
import {parameters} from "../../../constants/constants";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  form: any = {
    username: null,
    password: null
  };
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  roles: string[] = [];
  currentUser:string='';

  constructor(private authService: AuthService, private tokenStorage: TokenStorageService,private router: Router) { }


  ngOnInit(): void {
    if (this.tokenStorage.getToken()) {
      this.isLoggedIn = true;
      this.roles = this.tokenStorage.getPerson().roles;
    }
  }
  onSubmit(): void {
    const { username, password } = this.form;

    this.authService.login(username, password).subscribe(
      data => {
        this.tokenStorage.saveToken(data.accessToken);
        this.tokenStorage.savePerson(data);

        this.isLoginFailed = false;
        this.isLoggedIn = true;
        this.roles = this.tokenStorage.getPerson().roles;
        this.currentUser = username;
        localStorage.setItem("role",this.roles.toString());
        localStorage.setItem("person",this.tokenStorage.getPerson().username);
        // this.reloadPage();
        this.router.navigate(['/home']);
      },
      err => {
        this.errorMessage = err.error.message;
        this.isLoginFailed = true;
      }
    );
  }
  reloadPage(): void {
    window.location.reload();
  }

}
