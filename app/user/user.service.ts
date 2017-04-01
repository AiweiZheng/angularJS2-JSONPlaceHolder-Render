import {Http} from 'angular2/http';
import {Injectable} from 'angular2/core';
import 'rxjs/add/operator/map';

@Injectable()
export class UserService{
    
    private _url = "https://jsonplaceholder.typicode.com/users";
    constructor(private _http:Http){

    }
    getUsers(){
        return this._http.get(this._url).map(result=>result.json());
    }
    getUser(userID){
        return this._http.get(this._url+"/"+userID).map(result=>result.json())
    }
    addUser(user){
        return this._http.put(this._url,JSON.stringify(user)).map(result=>result.json());
    }

}