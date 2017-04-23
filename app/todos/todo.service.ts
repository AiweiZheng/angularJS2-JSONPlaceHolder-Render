import { Http }       from '@angular/http';
import { Injectable } from '@angular/core';

import 'rxjs/add/operator/map';

@Injectable()
export class TodoService {
    readonly baseUrl = "https://jsonplaceholder.typicode.com";
    users_fix = "/users/";
    todos_fix = "/todos";
    url;
    constructor(private _http: Http) { }

    getUserTodos(filter?) {
        this.getTodoUrl();
        return this._http.get(this.url).map(data => data.json());
    }
    getTodoUrl(filter?){
        if (filter && filter.userId) {
            this.url = this.baseUrl + this.users_fix + filter.userId + this.todos_fix;
        } else {//get all users' post when userId is null
            this.url = this.baseUrl + this.todos_fix;
        }
    }
}