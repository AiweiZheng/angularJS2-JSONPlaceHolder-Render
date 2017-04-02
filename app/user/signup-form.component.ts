import { Component,Input,OnInit} from 'angular2/core';
import { Router,RouteParams, CanDeactivate} from 'angular2/router';
import { ControlGroup, FormBuilder, Validators } from 'angular2/common';
import { CommonValidators } from '../shared/commonValidators';
import { UserService } from './user.service';
import {User} from './user';

@Component({
    templateUrl: 'app/user/signup-form.component.html',
    providers: [UserService]
})

export class SignupFormComponent implements OnInit,CanDeactivate{
    title;
    signupForm: ControlGroup;
    user = new User()
    constructor(private _router: Router, 
                private _routeParam:RouteParams,
                private _userService: UserService,
                private _fb: FormBuilder) {
                
                this.signupForm = this._fb.group({
                                name: ['', Validators.compose([
                                    Validators.required])
                                ],
                                email: ['', Validators.compose([
                                    Validators.required,
                                    CommonValidators.isValidatedEmailAddress])
                                ],
                                phone: [],
                                address: this._fb.group({
                                    street: [],
                                    suite: [],
                                    city: [],
                                    zipcode: []
                                })
                            })
    }
    ngOnInit(){
        var _userId = parseInt(this._routeParam.get("id"));
        this.title =  _userId  ? "Edit User":"New User";
        if(!_userId ) return;
        this.title = "Edit User";
        this._userService.getUser(_userId).subscribe(
               user=>this.user=user,
               response =>{
                    if(response.status==404){
                        this._router.navigate(['NotFound']);
                    }
                }
        );
    }

    onSubmit() {
        if(this.user.userid){
                this._userService.editUser(this.user);
        }else{
            this._userService.addUser(this.user).subscribe(data => {
                //should make the form clean
                this._router.navigate(['Users']);
            })
        }
    }
   
    routerCanDeactivate(next, previous) {
        if (this.signupForm.dirty) {
            return confirm("Are you sure to leave this page?");
        }
        return true;
    }
}
