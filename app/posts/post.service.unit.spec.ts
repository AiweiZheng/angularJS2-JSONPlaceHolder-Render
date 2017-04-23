import { TestBed, inject } from '@angular/core/testing';
import { FakeBackend } from "ngx-http-test";
import { MockBackend, MockConnection } from "@angular/http/testing";

import { PostService } from "./post.service";

describe('PostService', () => {
  let subject: PostService;
  let backend: FakeBackend;
  let respondData =  {
    "id": 1,
    "title": "et omnis dolorem"
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
    providers:[
        PostService,
        FakeBackend.getProviders()
      ]
    });
  });

//get an instance of the MockBackend
  beforeEach(inject([PostService, FakeBackend], (postService, fakeBackend) => {
    subject = postService;
    backend = fakeBackend;
  }));

  afterEach(() =>{
    backend.verifyNoPendingRequests();
  })
  
  it('should get posts data with url and get method', (done) => {
   
    backend.expectGet(subject.baseUrl).respond(respondData);
    
    subject.getUserPosts().subscribe((response) => {
      expect(subject.getPostUrl).toHaveBeenCalled;
      expect(response).toEqual(respondData);
      done(); //end the test unit
    });
  });

  it('should get comments for a specific post with url and get method', (done) => {
    let postId = 4;
    backend.expectGet(subject.baseUrl +'/'+postId+ subject.comments_fix).respond(respondData);

    subject.getComments(postId).subscribe((response) => {

      expect(subject.getCommentUrl).toHaveBeenCalled;
      expect(response).toEqual(respondData);
      
      done(); //end the test unit
    });
  });

  it('should set url with userId when userId is specific', () => {
    let userId_param_fix = '?userid=';
    let userId = 2;
    subject.userId_param_fix = userId_param_fix;

    subject.getPostUrl( {userId:userId} );
    
    expect(subject.url).toContain(userId_param_fix + userId);
  });

  it('should set url to baseUrl when userId is NOT specific', () => {
    
    subject.getPostUrl();
    
    expect(subject.url).toEqual(subject.baseUrl);
  });

  it('should set url to comment url', () => {
    let postId = 5;
    let comment_fix = '/commentstest';
    subject.comments_fix = comment_fix;

    subject.getCommentUrl(postId);
    
    expect(subject.url).toContain(postId + comment_fix);
  });

});
 
