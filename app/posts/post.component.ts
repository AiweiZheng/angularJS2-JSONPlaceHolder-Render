import { Component,Input } from '@angular/core';
import{Post}               from './post';
import{SpinnerComponent}   from '../shared/spinner.component';

@Component({
    selector: 'post-holder',
    templateUrl: 'app/posts/post.component.html',
    styles:[`
            .separation-line {
                                height: 12px;
                                border: 0;
                                box-shadow: inset 0 12px 12px -12px rgba(0, 0, 0, 0.5);
                            }
        `
    ]
})

export class PostComponent{
    @Input() post:Post;
    @Input() isLoading;
    getCommentImageUrl(commentID){
    
       return "http://lorempixel.com/80/80/people/?random="+commentID;
    }
}