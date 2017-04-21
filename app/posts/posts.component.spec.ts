import { PostsComponent } from './posts.component';
import { UserService } from '../users/user.service';
import { PostService } from './post.service';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/from';
import 'rxjs/add/observable/throw';

import { Post }                from './post';

describe('PostsComponent', () => {
    var component : PostsComponent;
    var userService : UserService;
    var postService : PostService;

    beforeEach( () => {
        userService = new UserService( null );
        postService = new PostService( null );
        component = new PostsComponent( postService, userService);
    });
   
    describe('ngOnInit():Retrieved data successfully from the server', () => {

         it('should set users property with the users retrieved from the server', () => {
            let users = [1, 2, 3];
            
            spyOn(userService, 'getUsers').and.returnValue( Observable.from([ users ]) );
            spyOn(postService, 'getUserPosts').and.returnValue( Observable.from([ [] ]) );

            component.ngOnInit();

            expect( component.users ).toBe( users );
        });

        it('should set posts property with the posts retrieved from the server', () => {
            let posts = [1, 2, 3];
            spyOn(userService, 'getUsers').and.returnValue( Observable.from([ [] ]) );
            spyOn(postService, 'getUserPosts').and.returnValue( Observable.from([ posts ]));

            component.ngOnInit();

            expect( component.posts ).toBe( posts );
        });

        it('should set isLoadingPost property to true when retrieved users and posts', ()=> {
            spyOn(userService, 'getUsers').and.returnValue( Observable.from([ [] ]) );
            spyOn(postService, 'getUserPosts').and.returnValue( Observable.from([ [] ]) );

            component.ngOnInit();
            
            expect( component.isPostLoading ).toBeFalsy();
        });

        it('should call getPostsInPage after retrieved users and posts', () => {
            spyOn(userService, 'getUsers').and.returnValue( Observable.from([ [] ]) );
            spyOn(postService, 'getUserPosts').and.returnValue( Observable.from([ [] ]) );

            component.ngOnInit();

            expect( component.getPostsInPage ).toHaveBeenCalled;   
        });
    })

    describe('ngOnInit():failed to retrieve data from the Server', () => {
        it('should set error to the message returned from the userService when failed to retrieve data from userService', () => {

            var error = 'error';
            spyOn(userService, 'getUsers').and.returnValue( Observable.throw(error) );
            spyOn(postService, 'getUserPosts').and.returnValue( Observable.from([ [] ]) );

            component.ngOnInit();

            expect( component.error ).toBe(error);
        });

        it('should set error to the message returned from the postService when failed to retrieve data from postService', () => {

            var error = 'error';
            spyOn(userService, 'getUsers').and.returnValue( Observable.from([ [] ]) );
            spyOn(postService, 'getUserPosts').and.returnValue( Observable.throw( error ) );

            component.ngOnInit();

            expect( component.error ).toBe(error);
        });
    });

    describe('loadPost():', () => {
        it('should set selectedPost to null', () => {
            var filter = 1;
            spyOn(postService, 'getUserPosts').and.returnValue( Observable.from([ [] ]));
            
            component.loadPost( filter );

            expect( component.selectedPost ).toBeNull();
        });

        describe('Retrieved data successfully from the server', () => {
            it('should set posts to the data retrieved from the postService', () => {
                let posts = [1, 2, 3];
                spyOn(postService, 'getUserPosts').and.returnValue( Observable.from([ posts ]));

                component.loadPost(1);

                expect( component.posts ).toBe( posts );
            });

            it('should set isLoadingPost property to true when retrieved users and posts', ()=> {
                spyOn(postService, 'getUserPosts').and.returnValue( Observable.from([ [] ]) );

                component.loadPost(1);
                
                expect( component.isPostLoading ).toBeFalsy();
            });

            it('should call getPostsInPage after retrieved users and posts', () => {
                spyOn(postService, 'getUserPosts').and.returnValue( Observable.from([ [] ]) );

                component.loadPost(1);

                expect( component.getPostsInPage ).toHaveBeenCalled;  
            });
        });
    })

    describe('getPostsInPage:', () => {
        it('Should set postsPerPage to be a subset of posts in PageSize when (pageIndex * this.pageSize) is less than or equal to the lenght of posts', () => {
            component.posts = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
            component.pageSize = 5;
            var pageIndex = 2;

            component.getPostsInPage(pageIndex);

            expect( component.postsPerPage).toEqual([ 6, 7, 8, 9, 10 ]);
        });
         it('Should set postsPerPage to be a subset of posts from ((pageIndex-1) * this.pageSize) to the end when (pageIndex * this.pageSize) is larger than the lenght of posts', () => {
            component.posts = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
            component.pageSize = 5;
            var pageIndex = 3;

            component.getPostsInPage(pageIndex);

            expect( component.postsPerPage).toEqual([ 11,12 ]);
        });
    });

    describe('onPostClick:', () => {
        beforeEach(() => {
            
        })
        it('should keep selectedPost same if input is already selected', () => {
            var post : Post = {
                userid:1,
                id:1,
                title: "test",
                body: "test",
                comments: []
            };
            component.selectedPost = post;

            component.onPostClick( post );

            expect( component.selectedPost ).toBe( post );
        });
    });

    it('should set selectedPost to input and selectedPost are not same object', () => {
        var post : Post = {
                userid:1,
                id:1,
                title: "test",
                body: "test",
                comments: []
        };
        spyOn(postService, 'getComments').and.returnValue( Observable.from([ [] ]));
        
        component.onPostClick(post);

        expect( component.selectedPost).toBe( post );
    });

    it('should set isPostDetailLoading to false after successfully retrieved comments from service if input and selectedPost are not same object', () => {
        var post : Post = {
                userid:1,
                id:1,
                title: "test",
                body: "test",
                comments: []
        };
        spyOn(postService, 'getComments').and.returnValue( Observable.from([ [] ]));
        
        component.onPostClick(post);

        expect( component.isPostDetailLoading ).toBeFalsy();
    });

    it('should set selectedPost.comment to the date loaded from the server after successfully retrieved comments from service if input and selectedPost are not same object', () => {
        var post : Post = {
                userid:1,
                id:1,
                title: "test",
                body: "test",
                comments: []
        };

        var comments = [1,2,3];
        spyOn(postService, 'getComments').and.returnValue( Observable.from([ comments ]));
        
        component.onPostClick(post);

        expect( component.selectedPost.comments ).toBe( comments );
    });

     it('should set error to the message returned from the postService when failed to retrieve comments from the server', () => {

            var post : Post = {
                userid:1,
                id:1,
                title: "test",
                body: "test",
                comments: []
        };

        var error = "error";
        spyOn(postService, 'getComments').and.returnValue( Observable.throw(error));
        
        component.onPostClick(post);

        expect( component.error ).toBe( error );
    });
})