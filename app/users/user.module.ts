import { NgModule }                         from '@angular/core';
import { CommonModule }                     from '@angular/common';
import { HttpModule }                       from '@angular/http';
import { RouterModule }                     from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { SignupFormComponent } from './signup-form.component';
import { UsersComponent }      from './users.component';
import { SharedModule }        from '../shared/shared.module';
import { UserService }         from './user.service';

@NgModule({
    imports: [
        CommonModule,
        HttpModule,
        RouterModule,
        FormsModule,
        ReactiveFormsModule,
        SharedModule
    ],
    declarations: [
        SignupFormComponent,
        UsersComponent
    ],
    exports: [
        SignupFormComponent,
        UsersComponent
    ],
    providers: [
        UserService
    ]
})

export class UsersModule {

}