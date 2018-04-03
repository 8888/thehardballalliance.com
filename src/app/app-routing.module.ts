import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { NewsComponent } from './newsFeed/news.component';
import { AdminComponent } from './admin/admin.component';

const routes: Routes = [
    { path: '', redirectTo: '/news', pathMatch: 'full' },
    { path: 'news', component: NewsComponent },
    { path: 'admin', component: AdminComponent },
    { path: '**', redirectTo: '/news' } // TODO: Create 404 component
];

@NgModule({
    imports: [ RouterModule.forRoot(routes) ],
    exports: [ RouterModule ]
})
export class AppRoutingModule {}
