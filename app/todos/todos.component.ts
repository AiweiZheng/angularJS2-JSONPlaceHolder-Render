import { Component, OnInit, }  from '@angular/core';
import { TodoService }         from './todo.service';
import { UserService }         from '../users/user.service';

import { PaginationComponent } from '../shared/pagination.component';
import { SpinnerComponent }    from '../shared/spinner.component';

import { Observable }          from 'rxjs/Observable';
import 'rxjs/add/observable/forkJoin';


@Component({
    selector: 'todo',
    templateUrl: './todos.component.html',
    styleUrls: ['./todos.style.css']
})

export class TodosComponent implements OnInit {
    isLoading = true;
    addingTodo = false;
    todos = [];
    todosPerPage = [];
    users: [{ id: number, name: string }];
    pageSize = 12;
    newTodo = { title: "" };

    constructor(private _todoService: TodoService, private _userService: UserService) {
    }

    ngOnInit() {
        var userObservable = this._userService.getUsers();
        var todoObservable = this._todoService.getUserTodos();
        Observable.forkJoin(userObservable, todoObservable).subscribe(
            joined => {
                this.isLoading =false;
                this.users = joined[0];
                this.todos = joined[1];
                this.getTodosInPage(1);
            })
    }

    loadTodo(userId) {
        this._todoService.getUserTodos(userId).subscribe(todos => this.todos = todos);
        this.getTodosInPage(1);
    }

    getTodosInPage(pageIndex) {
        var expectPostNumber = pageIndex * this.pageSize;
        var end = Math.min(this.todos.length, expectPostNumber);
        this.todosPerPage = this.todos.slice((pageIndex - 1) * this.pageSize, end);
    }
    //change the todo completed status
    changeTodoStatus(todo) {
        todo.completed = !todo.completed;
    }

    deleteTodo(todo) {
        //should delete from the database //todo 
        if (confirm("Are you sure to delete '" + todo.title + "?")) {
            var index = this.todosPerPage.indexOf(todo);
            this.todosPerPage.splice(index, 1);
            var index = this.todos.indexOf(todo);
            this.todos.splice(index, 1);
        }
    }

    toggleAddTodoInput() {
        this.addingTodo = !this.addingTodo;
    }

    addTodoInputChanged(event) {
        if (event.which == 13) {//user pressed 'enter'
            this.todos.push(this.newTodo);
            this.todosPerPage.push(this.newTodo);
            this.newTodo = { title: "" };
        }
    }
}