import {Component,OnInit} from 'angular2/core';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/forkJoin';
import {PostService} from './post.service';
import {UserService} from '../user/user.service';
import {SpinnerComponent} from '../shared/spinner.component';
import{PostComponent} from './post.component';
import{PaginationComponent} from '../shared/pagination.component';
import{Post} from './post';

@Component({
    templateUrl:'app/post/posts.component.html',
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
     `],
    directives:[SpinnerComponent,PostComponent,PaginationComponent],
    providers:[PostService,UserService]
})

export class PostsComponent implements OnInit{
    isPostLoading = true;
    isPostDetailLoading= true;
    users :[{id:number,name:string}];
    posts=[];
    postsPerPage=[];
    selectedPost:Post;
    pageSize:10;
    constructor(private _postService:PostService,private _userService:UserService){}
    ngOnInit(){
        var userObservable = this._userService.getUsers();
        var postObservable =this._postService.getUserPosts();
        Observable.forkJoin(userObservable,postObservable).subscribe(
            joined => {
                this.isPostLoading = false;
                this.users = joined[0],
                this.posts = joined[1]
                this.getPostsInPage(1);
            }
        )
    }
    loadPost(filter){
        this.selectedPost = null;
        this.isPostLoading = true;
        this._postService.getUserPosts(filter).subscribe(
                userPosts => {
                    this.posts = userPosts;
                    this.isPostLoading = false
                } 
            )
    }
    onPostClick(post:Post){
        if(post==this.selectedPost){
            this.selectedPost=null;//reset 
            return;
        }
        this.selectedPost = post;
        this._postService.getComments(post.id).subscribe(
            comments =>{
             this.isPostDetailLoading = false;
             this.selectedPost.comments = comments
            }
        )
    }
    getPostsInPage(pageIndex){
        var startIndex = this.pageSize-1;
        var expectPageSize = startIndex*pageIndex+this.pageSize;
        var end = Math.min(this.posts.length?this.posts.length:expectPageSize);
        this.postsPerPage = this.posts.slice(startIndex*pageIndex,end);
    }
}