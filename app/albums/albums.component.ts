import {Component,OnInit} from "@angular/core";

import { UserService }         from '../users/user.service'
import { AlbumService } from './album.service';
import { Observable }         from 'rxjs/Observable';
import 'rxjs/add/observable/forkJoin';

@Component({
    templateUrl:'./albums.component.html'
})

export class AlbumsComponent implements OnInit{
    selectedImage = "";
    users: [{ id: number, name: string }];
    albums=[];
    photos=[];
    constructor(private _userService:UserService, private _albumService:AlbumService){}
    
    ngOnInit(){
        var userObservable = this._userService.getUsers();
        var albumObservable = this._albumService.getUserAblums();
        Observable.forkJoin(userObservable, albumObservable).subscribe(
            joined => {
                this.users = joined[0];
                this.albums = joined[1];
            }
        )
    }
    // loadAlbums(filter){
    //     var albumObservable = this._albumService.getUserAblums(filter);
    //     albumObservable.subscribe(
    //          albums =>{
    //           this.albums = albums;
    //           this.loadPhotos();
    //     })
    // }
    setSelectedImage(imageUrl){
        this.selectedImage = imageUrl;
    }
    loadPhotos(filter?){
        var photoObservable = this._albumService.getPhotos(filter);
        photoObservable.subscribe(
             photos =>{
            this.photos = photos;
            console.log("photos: "+this.photos.length);
        })
    }
}