import { PostComponent } from './post.component';

describe('PostComponent', ()=> {
    let component : PostComponent;
    beforeEach(()=> {
        component = new PostComponent();
    })

    it('should include id in message', ()=> {
        let id = 1;
        
        let result = component.getCommentImageUrl( id );

        expect( result ).toContain( id );
    })
})