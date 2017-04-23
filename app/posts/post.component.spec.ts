import { async, TestBed, ComponentFixture } from "@angular/core/testing";

import { SpinnerComponent } from "../shared/spinner.component";
import { By } from '@angular/platform-browser';
import { PostComponent } from "./post.component";

import { Post } from "./post";

// class SpinnerComponentStub{
//   isLoading;
// }

describe('PostComponent', ()=>{
    let component: PostComponent;
    let fixture: ComponentFixture<PostComponent>;
    let post: Post;

 beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ 
          PostComponent, SpinnerComponent
        //   {provide:SpinnerComponent, useclass: SpinnerComponentStub}
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
        fixture = TestBed.createComponent(PostComponent);
        component = fixture.componentInstance;

        let comments = []
        post  = {
            userid:1,
            id:1,
            title: "test",
            body: "test",
            comments:[]
        };

        post.comments = [
                {
                    postId : 1,
                    id: 1,
                    name : 'comment1',
                    email: 'XXX@gmail.com',
                    body : 'body1' 
                },
                 {
                    postId : 2,
                    id: 2,
                    name : 'comment2',
                    email: 'XXX2@gmail.com',
                    body : 'body2'
                },
                 {
                    postId : 3,
                    id:3,
                    name : 'comment3',
                    email: 'XXX3@gmail.com',
                    body : 'body3'
                }
            ]
    });

    it('should render post title', () => {
       
        component.post = post;
        fixture.detectChanges();
        let de = fixture.debugElement.query(By.css('.panel-title'));
        let el: HTMLElement = de.nativeElement;

        expect(el.innerText).toContain( component.post.title );
    });

   it('should render post body', () => {
        component.post = post;

        fixture.detectChanges();
        let de = fixture.debugElement.query(By.css('.panel-body '));
        let deChild = de.query(By.css('p'));
        
        let el: HTMLElement = deChild.nativeElement;
         
        expect(el.innerText).toContain(component.post.body);
    });

  it('should bind spinner isLoading property to component isLoading property ', () => {
     
        // component.isLoading = true
        // fixture.detectChanges();

        // let spinner: SpinnerComponent = fixture.

        //  let de = fixture.debugElement.query(By.directive(SpinnerComponent));
         
        // expect(true).toBeTruthy();
    });

    it('should create a media div for each comment', () =>{
        component.post = post;

        fixture.detectChanges();

        let de = fixture.debugElement.queryAll(By.css('div.media'));
        
        expect( de.length ).toBe( component.post.comments.length );
    });
});