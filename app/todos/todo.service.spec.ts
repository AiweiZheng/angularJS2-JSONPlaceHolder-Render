import { TestBed, inject } from '@angular/core/testing';
import { FakeBackend } from "ngx-http-test";
import { MockBackend, MockConnection } from "@angular/http/testing";

import { TodoService } from "./todo.service";

describe('TodoService', () => {
    let subject: TodoService;
    let backend: FakeBackend;
    let respondData =  {
        "id": 1,
        "title": "et omnis dolorem"
    };

    beforeEach(() => {
        TestBed.configureTestingModule({
        providers:[
            TodoService,
            FakeBackend.getProviders()
        ]
      });
    });

//get an instance of the MockBackend
  beforeEach(inject([TodoService, FakeBackend], (postService, fakeBackend) => {
    subject = postService;
    backend = fakeBackend;
  }));

  afterEach(() =>{
    backend.verifyNoPendingRequests();
  })

  it('should get todo data with url and get method', (done) => {
   
    backend.expectGet(subject.baseUrl + subject.todos_fix).respond(respondData);
    
    subject.getUserTodos().subscribe((response) => {
      expect(subject.getTodoUrl).toHaveBeenCalled;
      expect(response).toEqual(respondData);
      done(); //end the test unit
    });
  });

  it('should set url with userId when userId is specific', () => {
    let users_fix = '/userid/';
    let userId = 2;
    subject.users_fix = users_fix;

    subject.getTodoUrl( {userId:userId} );
    
    expect(subject.url).toContain(users_fix + userId+subject.todos_fix);
  });

  it('should set url to baseUrl+todos_fix when userId is NOT specific', () => {
    let todos_fix = '/todos';

    subject.getTodoUrl();
    
    expect(subject.url).toEqual(subject.baseUrl + todos_fix);
  });
})
