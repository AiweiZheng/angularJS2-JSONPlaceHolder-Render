import { NgModule }       from '@angular/core';
import { CommonModule }   from '@angular/common';

import { AlbumsComponent } from './albums.component';
import { AlbumService }    from './album.service';
import { UserService }    from '../users/user.service'

import{AlbumComponent} from './album.component';
import { SharedModule }   from '../shared/shared.module';


@NgModule({
    imports: [
        CommonModule,
        SharedModule
    ],

    declarations: [
        AlbumsComponent,
        AlbumComponent
    ],
    exports: [
        AlbumsComponent
    ],
    providers: [
        AlbumService,
        UserService
    ]
})

export class AlbumModule {}