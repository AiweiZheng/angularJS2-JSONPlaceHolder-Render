import{Component,OnInit} from 'angular2/core';
import {Http} from 'angular2/http';
import {RouterLink} from 'angular2/router';

//import{ROUTER_DIRECTIVES,Router} from 'angular2/router';

import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import {UserService} from './user.service';
import {SpinnerComponent} from '../shared/spinner.component';

@Component({
    templateUrl:'app/user/users.component.html',
    directives:[RouterLink,SpinnerComponent],
    providers:[UserService]
})

export class UsersComponent implements OnInit{
     isLoading = true;
     users: any[];
     constructor(private _userService:UserService){}
     ngOnInit(){
        this._userService.getUsers().subscribe(users =>
        {
         this.isLoading = false;
         this.users = users
        });
     }
     deleteUser(user){
         var confirm = confirm("Are you sure to delete this user?");
         var index = this.users.indexOf(user);
         this.users.splice(index,1);
         if(confirm){
             this._userService.deleteUser(user).subscribe(null,
                error=>{
                    alert("Could not delete the user");
                    this.users.splice(index,0,user);
                }
            )
         }
         
    
     }
   
}