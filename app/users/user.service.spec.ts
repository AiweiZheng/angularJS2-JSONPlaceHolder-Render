import { TestBed, inject } from '@angular/core/testing';
import { FakeBackend } from "ngx-http-test";
import { MockBackend, MockConnection } from "@angular/http/testing";

import { UserService } from "./user.service";

describe('UserService', () => {
    let subject: UserService;
    let backend: FakeBackend;
    let responseForm = '<form />';
    let responseData =  {
        "id": 1,
        "title": "et omnis dolorem"
    };

    beforeEach(() => {
        TestBed.configureTestingModule({
        providers:[
            UserService,
            FakeBackend.getProviders()
        ]
      });
    });

//get an instance of the MockBackend
    beforeEach(inject([UserService, FakeBackend], (postService, fakeBackend) => {
        subject = postService;
        backend = fakeBackend;
    }));

    afterEach(() =>{
        backend.verifyNoPendingRequests();
    })

    it('should get all users data with url and get method', (done) => {

        backend.expectGet(subject.url).respond(responseData);

        subject.getUsers().subscribe((response) => {
            expect(response).toEqual(responseData);

            done(); //end the test unit
        });
    });

    it('should get a specific users data with get method', (done) => {
        let userId = 1;
        backend.expectGet(subject.url+'/' + userId).respond(responseData);

        subject.getUser(userId).subscribe((response) => {
            expect(subject.getUrl).toHaveBeenCalled;
            expect(response).toEqual(responseData);

            done(); //end the test unit
        });
    });

   it('should add a new user data with post method', (done) => {
      let newUser =  {id: 6, title: 'et omnis dolorem'};

      backend.expectPost(subject.url, newUser).respond(responseForm);
    
      subject.addUser(newUser).subscribe((response) => {
        expect(response).toEqual(responseForm);

        done(); //end the test unit
      });
   });

  it('should update user data with put method', (done) => {
    let user = {userId:1, title: 'et omnis dolorem'};

    backend.expectPut(subject.url+'/' + user.userId, user).respond(responseForm);
    
    subject.editUser(user).subscribe((response) => {
      expect(subject.getUrl).toHaveBeenCalled;
      expect(response).toEqual(responseForm);

      done(); //end the test unit
    });
  });

  it('should delete a specific users with delete', (done) => {
    let userId = 1;
    backend.expectDelete(subject.url+'/' + userId).respond(responseData);

    subject.deleteUser(userId).subscribe((response) => {
        expect(subject.getUrl).toHaveBeenCalled;
        expect(response).toEqual(responseData);

        done(); //end the test unit
    });
  });

  it('should url should include input', ()=> {
      subject.url = "";
      let userId = 1;
      
      let url = subject.getUrl(userId);

      expect(url).toContain(userId);
  });
})
