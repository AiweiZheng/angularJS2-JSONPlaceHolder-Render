import {Component} from 'angular2/core';
import {RouteConfig,RouterOutlet} from 'angular2/router';
import {NavBarComponent} from './navbar.component';
import{UsersComponent} from './user/users.component';
import{SignupFormComponent} from './user/signup-form.component';
import{PostsComponent} from './post/posts.component';
import{HomeComponent} from './home.component';
import{NotFoundComponent} from './notFound.component';


@RouteConfig([
    {path:'/',name:'Home',component:HomeComponent},
    {path:'/users', name:'Users',component:UsersComponent},
    {path:'/post',name:'Posts',component:PostsComponent},
    {path:'/newUser/new',name:'NewUser',component:SignupFormComponent},
    {path:'/editUser/:id',name:'EditUser',component:SignupFormComponent},
    {path:'/notFound',name:'NotFound',component:NotFoundComponent},
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
    directives:[
                RouterOutlet,
                NavBarComponent,
                UsersComponent,
                HomeComponent,
                PostsComponent,
                NotFoundComponent,
                SignupFormComponent
                ]
})
export class AppComponent { }