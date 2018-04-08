import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { LoginService } from './login.service';

import { AppSettings } from '../appSettings';
import { identicalValuesValidator } from '../shared/identical-values.directive';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
    public loginForm: FormGroup;
    public registerForm: FormGroup;
    public displayLogin = true;
    public message: string; // login feedback
    public messageIsError: boolean; // handles style class

    constructor(
        private fb: FormBuilder,
        private loginService: LoginService,
        private router: Router
    ) {
        this.createLoginForm();
        this.createRegistrationForm();
    }

    ngOnInit() {
        // set the username field if a user checked Remember me
        this.loginForm.patchValue(
            {username: this.loginService.rememberedUsername},
            {emitEvent: false}
        );
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
        }, {
            validator: identicalValuesValidator('password', 'confirmPassword')
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

    private setMessage(message: string, error: boolean): void {
        // sets the message to be displayed
        // error: true=red false=green
        this.message = message;
        this.messageIsError = error;
    }

    public onLoginSubmit(): void {
        if (this.loginForm.valid) {
            this.loginService.submitLogin(
                this.loginUsername,
                this.loginPassword,
                this.loginRemember
            ).subscribe(output => {
                this.handleLoginResponse(output);
            }, error => {
                // error = {error: {error: message}, otherkey: {}, etc}
                this.setMessage(error['error']['error'], true);
                this.loginForm.reset();
            });
        }
    }

    private handleLoginResponse(response: object): void {
        // response is an object sent back from the server
        // {user: required, status: required, token: only if successful, error: only if error}
        if (response['status'] === 200 && 'token' in response) {
            // successfully logged in
            this.loginService.storeUserData(response['user'], response['token']);
            this.loginForm.reset();
            this.router.navigateByUrl('/' + AppSettings.CLIENT_ADMIN_URL);
        }
    }

    public onRegisterSubmit(): void {
        if (this.registerForm.valid) {
            this.loginService.submitRegister(
                this.registerUsername,
                this.registerPasssword
            ).subscribe(output => {
                this.handleRegisterResponse(output);
            }, error => {
                // error = {error: {error: message}, otherkey: {}, etc}
                this.setMessage(error['error']['error'], true);
                this.registerForm.reset();
            });
        }
    }

    private handleRegisterResponse(response: object): void {
        // response is an object sent back from the server
        // {user: only if successful, status: required, error: only if error}
        if (response['status'] === 201) {
            // user created
            this.registerForm.reset();
            this.setMessage('User created! Please login', false);
            this.displayLogin = true;
        }
    }
}
