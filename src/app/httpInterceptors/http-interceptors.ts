import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { AuthInterceptor } from './auth-interceptor';

// Http Interceptors are chained in the order provided below
// requests flow A->B->C
// response flow C->B->A
export const httpInterceptorProviders = [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true}
];
