import {Http} from 'angular2/http';
import {Injectable} from 'angular2/core';
import 'rxjs/add/operator/map';

@Injectable()
export class PostService{
    url = "https://jsonplaceholder.typicode.com/posts";
    constructor(private _http:Http){

    }
    getPost(){
        return this._http.get(this.url).map(data=>data.json());
    }
    getComments(userId){
        var commentUrl = this.url+"/"+userId+"/comments";
        return this._http.get(commentUrl).map(data=>data.json());
    }
   
}