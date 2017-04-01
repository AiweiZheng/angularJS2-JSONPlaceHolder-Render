import {Component} from 'angular2/core';
import {RouteConfig,RouterOutlet} from 'angular2/router';
import {NavBarComponent} from './navbar.component';
import{UsersComponent} from './users.component';
import{PostsComponent} from './posts.component';
import{HomeComponent} from './home.component';

@RouteConfig([
    {path:'/',name:'Home',component:HomeComponent},
    {path:'/users', name:'Users',component:UsersComponent},
    {path:'/post',name:'Posts',component:PostsComponent},
    {path:'/*other',name:'Other',redirectTo:['Users']}
])

@Component({
    selector: 'my-app',
    template: `
    <navbar></navbar>
    <div class="container">
        <router-outlet></router-outlet>
    </div>
    `,
    directives:[NavBarComponent,UsersComponent,HomeComponent,PostsComponent,RouterOutlet]
})
export class AppComponent { }