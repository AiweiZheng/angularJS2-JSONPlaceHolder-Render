import { Component,Input } from '@angular/core';
import{Post}               from './post';
import{SpinnerComponent}   from '../shared/spinner.component';

@Component({
    selector: 'post-holder',
    template: `
        <div class="panel panel-default">
            <div class="panel-heading">
                <h3 class="panel-title">{{post.title}}</h3>
            </div>
            <div class="panel-body">
                <p>{{post.body}}</p>
            </div>
        </div>
        <hr/>
        <spinner [isLoading] = "isLoading"></spinner>
        <div class="media" *ngFor="let comment of post.comments">
            <div class="media-left ">
                <a href="#" >  
                    <img class="media-object thumbnail" 
                    [src]="getCommentImageUrl(comment.id)" alt="...">
                </a>
            </div>
            <div class="media-body">
                <h4 class="media-heading">{{comment.name}}</h4>
                {{comment.body}}
            </div>
        </div>
    `
})

export class PostComponent{
    @Input() post:Post;
    @Input() isLoading;
    getCommentImageUrl(commentID){
    
       return "http://lorempixel.com/80/80/people/?random="+commentID;
    }
}