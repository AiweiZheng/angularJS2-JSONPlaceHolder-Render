import { Http }       from '@angular/http';
import { Injectable } from '@angular/core';

@Injectable()
export class UserService {

    private _url = "https://jsonplaceholder.typicode.com/users";
    constructor(private _http: Http) {

    }
    getUsers() {
        return this._http.get(this._url).map(result => result.json());
    }
    getUser(userId) {
        return this._http.get(this.getUrl(userId)).map(result => result.json())
    }
    addUser(user) {
        return this._http.post(this._url, JSON.stringify(user)).map(result => result.json());
    }
    editUser(user) {
        return this._http.put(this.getUrl(user.userId), JSON.stringify(user)).map(result => result.json());
    }
    deleteUser(userId) {
        return this._http.delete(this.getUrl(userId)).map(result => result.json());
    }
    private getUrl(userId) {
        return this._url + "/" + userId;
    }

}