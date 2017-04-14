import { Http }       from '@angular/http';
import { Injectable } from '@angular/core';

import 'rxjs/add/operator/map';

@Injectable()
export class TodoService {
    url = "https://jsonplaceholder.typicode.com";
    constructor(private _http: Http) { }

    getUserTodos(filter?) {
        console.log("filter:" + filter);
        if (filter && filter.userId) {
            var url = this.url + "/users/" + filter.userId + "/todos";
            console.log("url: " + url);
            return this._http.get(url).map(data => data.json());
        } else {//get all users' post when userId is null
            return this._http.get(this.url + "/todos").map(data => data.json());
        }
    }
}