import{Component,OnInit} from 'angular2/core';
import {Http} from 'angular2/http';
import {RouterLink} from 'angular2/router';

//import{ROUTER_DIRECTIVES,Router} from 'angular2/router';

import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import {UserService} from './user.service';

@Component({
    templateUrl:'app/user/users.component.html',
    directives:[RouterLink],
    providers:[UserService]
})

export class UsersComponent implements OnInit{
     users: any[];
     constructor(private _userService:UserService){}
     ngOnInit(){
        this._userService.getUsers().subscribe(users => this.users = users);
     }
   
}