import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute }              from '@angular/router';
import { FormGroup, FormBuilder, Validators }  from '@angular/forms';

import { FormComponent }    from '../shared/prevent-unsaved-changes-guard.service';
import { CommonValidators } from '../shared/commonValidators';
import { UserService }      from './user.service';
import { User }             from './user';

@Component({
    templateUrl: './signup-form.component.html',
})

export class SignupFormComponent implements OnInit, OnDestroy, FormComponent {
    title;
    subscription;
    form: FormGroup;
    user = new User();
 
    constructor(private _router: Router,
        private _activateRouter: ActivatedRoute,
        private _userService: UserService,
        fb: FormBuilder) {

        this.form = fb.group({
            name: ['', Validators.required
            ],
            email: ['', CommonValidators.isValidatedEmailAddress
            ],

            phone: [],
            address: fb.group({
                street: [],
                suite: [],
                city: [],
                zipcode: []
            })
        });
    }

    ngOnInit() {
        var _userId;
        this.subscription = this._activateRouter.params.subscribe(
            params => _userId = +params["id"]
        );

        this.title = _userId ? "Edit User" : "New User";
        if (!_userId) return;
        this.title = "Edit User";
        this._userService.getUser(_userId).subscribe(
            user => {
                this.user = user;
            },
            response => {
                if (response.status == 404) {
                    this._router.navigate(['notFound']);
                }
            }
        );
    }
    ngOnDestroy() {
        this.subscription.unsubscribe();
    }

    onSubmit() {
        if (this.user.id) {
            this._userService.editUser(this.user).subscribe(
                data =>{
                    this._router.navigate(['users']);
                },
                error=>{
                    //will return "404", because jsonholder api does not have this specific route.
                     this._router.navigate(['users']); 
                }
            );
        } else {
            this._userService.addUser(this.user).subscribe(data => {
                this.form.markAsPristine();
                this._router.navigate(['users']);
            })
        }
    }
}
