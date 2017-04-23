import { FormControl } from '@angular/forms';
import { CommonValidators } from './commonValidators';

xdescribe('CommonValidators', ()=> {

    describe('isValidatedEmailAddress', ()=> {
        let control : FormControl = new FormControl('',CommonValidators.isValidatedEmailAddress);

        it('should only accept email format value', ()=> {
            control.setValue('aiwei.zheng@gmail.com');

            expect( control.valid ).toBeTruthy();
        });

        it('should NOT accept value NOT in email format(with more than one @ symbols)', () => {
            control.setValue('aiwei.zh@eng@gmail.com');

            expect( control.valid ).toBeFalsy();
        });

         it('should NOT accept value NOT in email format(without @ symbols)', () => {
            control.setValue('aiwei.zhenggmail.com');

            expect( control.valid ).toBeFalsy();
        });
    });
});