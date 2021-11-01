import { Injectable } from '@angular/core';

const TOKEN_KEY = 'auth-token';
const PERSON_KEY = 'auth-person';

@Injectable({
  providedIn: 'root'
})
export class TokenStorageService {

  constructor() { }

  signOut(): void {
    window.sessionStorage.clear();
  }

  public saveToken(token: string): void {
    window.sessionStorage.removeItem(TOKEN_KEY);
    window.sessionStorage.setItem(TOKEN_KEY, token);
  }

  public getToken(): string | null {
    return window.sessionStorage.getItem(TOKEN_KEY);
  }

  public savePerson(person: any): void {
    window.sessionStorage.removeItem(PERSON_KEY);
    window.sessionStorage.setItem(PERSON_KEY, JSON.stringify(person));

    // localStorage.setItem(token)
  }

  public getPerson(): any {
    const person = window.sessionStorage.getItem(PERSON_KEY);
    if (person) {
      return JSON.parse(person);
    }

    return {};
  }
}
