import { PostComponent } from './post.component';

describe('PostComponent', ()=> {
    let component : PostComponent;
    beforeEach(()=> {
        component = new PostComponent();
    })

    it('should include id in message', ()=> {
        var id = 1;
        
        var result = component.getCommentImageUrl( id );

        expect( result ).toContain( id );
    })
})