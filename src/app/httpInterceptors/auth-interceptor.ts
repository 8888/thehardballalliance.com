import { Injectable } from '@angular/core';
import {
    HttpEvent, HttpInterceptor, HttpHandler, HttpRequest
} from '@angular/common/http';

import { Observable } from 'rxjs/Observable';

import { LoginService } from '../login/login.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    constructor(private loginService: LoginService) {}

    intercept(req: HttpRequest<any>, next: HttpHandler) {
        // get the token fom the login service
        const token = this.loginService.token;
        const username = this.loginService.username;
        const auth = username + ':' + token;

        // clone the request
        // update headers w/ auth token
        const authReq = req.clone({
            setHeaders: { Authorization: auth}
        });

        // send cloned response to the next handler
        return next.handle(authReq);
    }
}
