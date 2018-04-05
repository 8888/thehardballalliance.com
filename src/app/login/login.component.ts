import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { LoginService } from './login.service';

import { AppSettings } from '../appSettings';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent {
    public loginForm: FormGroup;
    public registerForm: FormGroup;
    public displayLogin = true;

    constructor(
        private fb: FormBuilder,
        private loginService: LoginService,
        private router: Router
    ) {
        this.createLoginForm();
        this.createRegistrationForm();
    }

    private createLoginForm(): void {
        // creates the form to be used for login
        this.loginForm = this.fb.group({
            username: ['', Validators.required],
            password: ['', Validators.required],
            rememberMe: false
        });
    }

    private get loginUsername(): string {
        return this.loginForm.controls['username'].value;
    }

    private get loginPassword(): string {
        return this.loginForm.controls['password'].value;
    }

    private get loginRemember(): boolean {
        return this.loginForm.controls['rememberMe'].value;
    }

    private createRegistrationForm(): void {
        // creates the form to be used to register
        this.registerForm = this.fb.group({
            username: ['', Validators.required],
            password: ['', Validators.required],
            confirmPassword: ['', Validators.required] // TODO: validator to confirm theyre the same
        });
    }

    private get registerUsername(): string {
        return this.registerForm.controls['username'].value;
    }

    private get registerPasssword(): string {
        return this.registerForm.controls['password'].value;
    }

    public clickLoginToggle(button: string): void {
        // button is either login or register
        this.displayLogin = button === 'login' ? true : false;
    }

    public onLoginSubmit(): void {
        if (this.loginForm.valid) {
            this.loginService.submitLogin(
                this.loginUsername,
                this.loginPassword,
                this.loginRemember
            ).subscribe(output => {
                this.handleLoginResponse(output);
            });
        }
    }

    private handleLoginResponse(response: object): void {
        // response is an object sent back from the server
        // {user: required, status: required, token: only if successful, error: only if error}
        if (response['status'] === 200 && 'token' in response) {
            // successfully logged in
            this.loginService.storeUserData(response['user'], response['token']);
            this.router.navigateByUrl('/' + AppSettings.CLIENT_ADMIN_URL);
        } else {
            // log in failed
            // TODO: provide user w/ feedback
        }
    }

    public onRegisterSubmit(): void {
        if (this.registerForm.valid) {
            this.loginService.submitRegister(
                this.registerUsername,
                this.registerPasssword
            ).subscribe(output => {
                console.log(output);
                // TODO: handle response and provide feedback
            });
        }
    }
}
