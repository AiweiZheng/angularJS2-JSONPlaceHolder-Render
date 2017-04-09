import { NgModule }       from '@angular/core';
import { CommonModule }   from '@angular/common';
import { FormsModule }    from '@angular/forms';

import { TodosComponent } from './todos.component';
import { SharedModule }   from '../shared/shared.module';

import {UserService}      from '../users/user.service';
import { TodoService }    from './todo.service';


@NgModule({
    imports: [
        CommonModule,
        SharedModule,
        FormsModule
    ],
    declarations: [
        TodosComponent
    ],
    exports: [
        TodosComponent
    ],
    providers: [
        TodoService,
        UserService
    ]
})

export class TodoModule{}