import {Component,OnInit} from 'angular2/core';
import {PostService} from './post.service';
import {SpinnerComponent} from '../shared/spinner.component';
import{PostComponent} from './post.component';
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
    directives:[SpinnerComponent,PostComponent],
    providers:[PostService]
})

export class PostsComponent implements OnInit{
    isPostLoading = true;
    isPostDetailLoading= true;
    posts:Post[];
    selectedPost:Post;
    constructor(private _postService:PostService){}
    ngOnInit(){
        this._postService.getPost().subscribe(
            post =>{
               this.isPostLoading=false;
               this.posts = post;
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
}