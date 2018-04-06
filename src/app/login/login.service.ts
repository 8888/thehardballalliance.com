import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';

import { AppSettings } from '../appSettings';

@Injectable()
export class LoginService {
    localStorage: Storage;
    sessionStorage: Storage;
    headers = new HttpHeaders({ 'Content-Type': 'application/json'});
    httpOptions = {headers: this.headers};

    constructor(private http: HttpClient) {
        this.localStorage = window.localStorage;
        this.sessionStorage = window.sessionStorage;
    }

    public get rememberedUsername(): string {
        // username from LOCAL storage for remember me
        const username = this.localStorage.username ? this.localStorage.username : '';
        return username;
    }

    public get username(): string {
        // username from SESSION storage for API access
        const username = this.sessionStorage.username ? this.sessionStorage.username : '';
        return username;
    }

    public get token(): string {
        // token from SESSION storage for API access
        const token = this.sessionStorage.token ? this.sessionStorage.token : '';
        return token;
    }

    public userIsLoggedIn(): boolean {
        // confirms if a user is logged in or not
        return ('username' in this.sessionStorage && 'token' in this.sessionStorage);
    }

    public submitLogin(username: string, password: string, remember: boolean): Observable<object> {
        // called by the login component
        // creates HTTP request to server to authorize user
        // returns the observable of that request
        if (remember) {
            // store username in local storage
            this.localStorage.setItem('username', username);
        }
        const url = AppSettings.ADMIN_LOGIN_URL;
        const body = JSON.stringify({
            'username': username,
            'password': password
        });
        return this.http.post(url, body, this.httpOptions);
    }

    public submitRegister(username: string, password: string): Observable<object> {
        // called by the login component
        // creates HTTP request to server to register user
        // returns the observable of that request
        const url = AppSettings.ADMIN_REGISTER_URL;
        const body = JSON.stringify({
            'username': username,
            'password': password
        });
        return this.http.post(url, body, this.httpOptions);
    }

    public storeUserData(username: string, token: string): void {
        // receives user data after being logged in
        // stores in session storage
        this.sessionStorage.setItem('username', username);
        this.sessionStorage.setItem('token', token);
    }
}
