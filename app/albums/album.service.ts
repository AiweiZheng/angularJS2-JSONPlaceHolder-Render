import { Http } from       '@angular/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';

@Injectable()
export class AlbumService {
    albumUrl = "http://jsonplaceholder.typicode.com";
    photoUrl = "http://lorempixel.com/80/80/people/?random=";
    // url = "http://jsonplaceholder.typicode.com/users/1/albums";
    // url2 = "http://jsonplaceholder.typicode.com/albums/1/photos";
    constructor(private _http: Http) {

    }
    getUserAblums(filter?){
        if (filter && filter.userId) {
            return this._http.get(this.albumUrl + "/users/" + filter.userId+"/albums").map(data => data.json());
        } else {//get all users' albums when userId is null
            return this._http.get(this.albumUrl+"/albums").map(data => data.json());
        }
    }
    getPhotos(filter?){
        if(filter && filter.albumId){
            var photoUrl = this.albumUrl + "/albums/" + filter.albumId + "/photos";
            return this._http.get(photoUrl).map(data => data.json());  
        }else{
            return this._http.get(this.albumUrl+"/photos").map(data => data.json());
        }    
    }
}