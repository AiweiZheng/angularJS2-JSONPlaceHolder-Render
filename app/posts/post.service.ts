import { Http } from       '@angular/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';

@Injectable()
export class PostService {
    url = "https://jsonplaceholder.typicode.com/posts";

    constructor(private _http: Http) {

    }

    getUserPosts(filter?) {
        if (filter && filter.userId) {
            return this._http.get(this.url + "?userId=" + filter.userId).map(data => data.json());
        } else {//get all users' post when userId is null
            return this._http.get(this.url).map(data => data.json());
        }
    }
    getComments(userId) {
        var commentUrl = this.url + "/" + userId + "/comments";
        return this._http.get(commentUrl).map(data => data.json());
    }

}