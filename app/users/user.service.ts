import { Http, Headers, RequestOptions }       from '@angular/http';
import { Injectable } from '@angular/core';

@Injectable()
export class UserService {

    url = "https://jsonplaceholder.typicode.com/users";
    constructor(private _http: Http) {

    }
    getUsers() {
        return this._http.get(this.url).map(result => result.json());
    }
    getUser(userId) {
        return this._http.get(this.getUrl(userId)).map(result => result.json())
    }
    addUser(user) {
 
        return this._http.post(this.url, JSON.stringify(user)).map(result => result.json());
    }
    editUser(user) {
        return this._http.put(this.getUrl(user.userId), JSON.stringify(user)).map(result => result.json());
    }
    deleteUser(userId) {
        return this._http.delete(this.getUrl(userId)).map(result => result.json());
    }
    getUrl(userId) {
        return this.url + "/" + userId;
    }
}