import {Http} from 'angular2/http';
import {Injectable} from 'angular2/core';
import 'rxjs/add/operator/map';

@Injectable()
export class UserService{
    constructor(private _http:Http){

    }
    getUsersObservable(url:string){
        return this._http.get(url).map(result=>result.json());
    }
}