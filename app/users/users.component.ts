import { Component }        from '@angular/core';
import { Router }           from '@angular/router';
import { UserService }      from './user.service';
import { SpinnerComponent } from '../shared/spinner.component';

@Component({
    templateUrl: './users.component.html',
    styles:[`
            .btn-sm{
                margin-bottom:5px;
            }  
           `]
})
  
export class UsersComponent {
    isLoading;
    users: any[];
    error;
    constructor(
        private _userService: UserService,
        private _router: Router) { }

    ngOnInit() {
        this.isLoading = true;
        this._userService.getUsers().subscribe(users => {
            this.isLoading = false;
            this.users = users },
            err => this.error = err );
    }
    onNewUserClick() {
        this._router.navigate(['newuser']);
    }
    deleteUser(user) {
        if (confirm("Are you sure to delete " + user.name + "?")) {
            var index = this.users.indexOf(user);
            this.users.splice(index, 1);
            this._userService.deleteUser(user.id).subscribe(null,
                error => {
                    alert("Could not delete the user.");
                    this.users.splice(index, 0, user);
                }
            )
        }
    }
}