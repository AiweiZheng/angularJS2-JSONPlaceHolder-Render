import { Component, OnInit }  from '@angular/core';

import { Observable }         from 'rxjs/Observable';
import 'rxjs/add/observable/forkJoin';

import { Post }                from './post';
import { PostService }         from './post.service';
import { UserService }         from '../users/user.service'
import { PostComponent }       from './post.component';
import { SpinnerComponent }    from '../shared/spinner.component';
import { PaginationComponent } from '../shared/pagination.component';

@Component({
    templateUrl: 'app/posts/posts.component.html',
    styles: [`
            .posts li { cursor: default; }
            .posts li:hover { background: #ecf0f1; } 
            .list-group-item.active, 
            .list-group-item.active:hover, 
            .list-group-item.active:focus { 
                background-color: #ecf0f1;
                border-color: #ecf0f1; 
                color: #2c3e50;
            }
     `]

})

export class PostsComponent {

    isPostLoading = true;
    isPostDetailLoading = true;
    users: [{ id: number, name: string }];
    posts = [];
    postsPerPage = [];
    selectedPost: Post;
    pageSize= 10;
    constructor(private _postService: PostService, private _userService: UserService) { }
    ngOnInit() {
        var userObservable = this._userService.getUsers();
        var postObservable = this._postService.getUserPosts();
        Observable.forkJoin(userObservable, postObservable).subscribe(
            joined => {
                this.isPostLoading = false;
                this.users = joined[0];
                this.posts = joined[1];
                this.getPostsInPage(1);
            }
        )
    }
    loadPost(filter) {
        this.selectedPost = null;
        this.isPostLoading = true;
        this._postService.getUserPosts(filter).subscribe(
            userPosts => {
                this.posts = userPosts;
                this.isPostLoading = false
                this.getPostsInPage(1);
            }
        )
    }

    getPostsInPage(pageIndex) {
        var expectPostNumber = pageIndex * this.pageSize;
        var end = Math.min(this.posts.length, expectPostNumber);
        this.postsPerPage = this.posts.slice((pageIndex - 1) * this.pageSize, end);
        console.log(this.postsPerPage.length);
    }
    onPostClick(post: Post) {
        if (post == this.selectedPost) {
            this.selectedPost = null;//reset 
            return;
        }
        this.selectedPost = post;
        this._postService.getComments(post.id).subscribe(
            comments => {
                this.isPostDetailLoading = false;
                this.selectedPost.comments = comments
            }
        )
    }
}