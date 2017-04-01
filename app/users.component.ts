import{Component,OnInit} from 'angular2/core';
import {Http} from 'angular2/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import {UserService} from './user.service';

@Component({
    templateUrl:'app/user.component.html',
    providers:[UserService]
})

export class UsersComponent implements OnInit{
     _url = "https://jsonplaceholder.typicode.com/users";
     users: any[];
     constructor(private _userService:UserService){}
     ngOnInit(){
        this._userService.getUsersObservable(this._url).subscribe(users => this.users = users);
     }
   
}