import {Component, OnInit} from '@angular/core';
import {TokenStorageService} from "./services/token-storage.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'blocadmin-app';
  private roles: string[] = [];
  isLoggedIn = false;
  showAdminBoard = false;
  showModeratorBoard = false;
  username?: string;

  constructor(private tokenStorageService: TokenStorageService) { }

  ngOnInit(): void {


    this.configureParameters();
    this.isLoggedIn = !!this.tokenStorageService.getToken();

    if (this.isLoggedIn) {
      const person = this.tokenStorageService.getPerson();
      this.roles = person.roles;
      this.showAdminBoard = this.roles.includes('ROLE_ADMIN');
      this.showModeratorBoard = this.roles.includes('ROLE_BLOCADMIN');

      this.username = person.username;
    }
  }
  configureParameters() :void {
  localStorage.setItem("page","1");

  }
  logout(): void {
    this.tokenStorageService.signOut();
    localStorage.setItem("role","");
    localStorage.setItem("person","");
    window.location.reload();
  }
}
