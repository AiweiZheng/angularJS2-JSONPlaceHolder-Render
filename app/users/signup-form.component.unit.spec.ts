import { FormBuilder, FormGroup  } from '@angular/forms';
import { SignupFormComponent } from './signup-form.component';
import { UserService } from './user.service';

xdescribe('SignupFormComponent', ()=> {
    var userService : UserService;
    var component : SignupFormComponent;

    beforeEach(()=> {
        component = new SignupFormComponent(null, null, userService, new FormBuilder());
    });
    
    it('should create form with 3 controls and 1 address control group', ()=> {
        expect(component.form.contains( 'name' )).toBeTruthy();
        expect(component.form.contains( 'email' )).toBeTruthy();
        expect(component.form.contains( 'phone' )).toBeTruthy();
        expect(component.form.contains( 'address' )).toBeTruthy();
    });

    it('should make address control group contain 4 controls', ()=> {
        let addressCtrls = component.form.get('address');
    
        expect(addressCtrls.get('street')).toBeTruthy();
        expect(addressCtrls.get('suite')).toBeTruthy();
        expect(addressCtrls.get('city')).toBeTruthy();
        expect(addressCtrls.get('zipcode')).toBeTruthy();
    });
    
});