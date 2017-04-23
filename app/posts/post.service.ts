import { Http } from       '@angular/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';

@Injectable()
export class PostService {
    readonly baseUrl = "https://jsonplaceholder.typicode.com/posts";
    userId_param_fix = "?userId=";
    comments_fix = "/comments";
    url; 
    constructor(private _http: Http) {}

     getUserPosts(filter?) {
        this.getPostUrl(filter);
        return this._http.get(this.url).map(data => data.json());
    }

    getComments(postId) {
        var commentUrl = this.getCommentUrl(postId);
        this.getCommentUrl(postId);
        return this._http.get(this.url).map(data => data.json());
    }

    getPostUrl(filter?){
        if (filter && filter.userId) {
            this.url = this.baseUrl + this.userId_param_fix + filter.userId;
        } else {//get all users' post when userId is null
            this.url = this.baseUrl;
        }
    }

    getCommentUrl(postId){
        this.url = this.baseUrl + "/" + postId + this.comments_fix;
    }
}