import { NgModule }       from '@angular/core';
import { CommonModule }   from '@angular/common';

import { PostsComponent } from './posts.component';
import { PostService }    from './post.service';
import { UserService }    from '../users/user.service'
import { PostComponent }  from './post.component';

import { SharedModule }   from '../shared/shared.module';


@NgModule({
    imports: [
        CommonModule,
        SharedModule
    ],

    declarations: [
        PostsComponent,
        PostComponent
    ],
    exports: [
        PostsComponent
    ],
    providers: [
        PostService,
        UserService
    ]
})

export class PostModule {

}