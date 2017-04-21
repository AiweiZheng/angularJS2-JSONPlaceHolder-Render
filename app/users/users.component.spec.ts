import { UsersComponent } from './users.component';
import { UserService }    from './user.service';
import { Observable }     from 'rxjs/Observable';
import 'rxjs/add/observable/empty';

describe('UsersComponent', ()=> {
    let component : UsersComponent;
    let userService : UserService;
    let users = [1, 2, 3, 4, 5];
    
    beforeEach(() => {
        userService = new UserService(null);
        component = new UsersComponent(userService, null);
    })
    describe('ngOnInit: Successfully retrieved data from the server', ()=> {
        it('should set isLoading to false', ()=> {
            spyOn(userService, 'getUsers').and.returnValue( Observable.from([ users ]));

            component.ngOnInit();

            expect( component.isLoading ).toBeFalsy();
        });

         it('should set users to the data returned from the service', ()=> {
            spyOn(userService, 'getUsers').and.returnValue( Observable.from([ users ]));

            component.ngOnInit();

            expect( component.users ).toEqual( users );
        });
    });

      describe('ngOnInit: failed to retrieve data from the server', ()=> {
          let error = "error@#$";

        it('should set isLoading to true', ()=> {
            spyOn(userService, 'getUsers').and.returnValue(Observable.throw (error));

            component.ngOnInit();

            expect( component.isLoading ).toBeTruthy();
        });

         it('should set error to the error returned from the server', ()=> {
            spyOn(userService, 'getUsers').and.returnValue( Observable.throw (error));

            component.ngOnInit();

            expect( component.error ).toEqual( error );
        });
    });

    describe('deleteUser:', ()=> {
        let user; 

        beforeEach(() => {
            component.users = [
                { id: 1 },
                { id: 2 },
            ];

            user = component.users[0]; 
        });

        it('should remove user from list if the user confirms deletion', ()=> {
            spyOn(window, 'confirm').and.returnValue( true );
            spyOn(userService, 'deleteUser').and.returnValue( Observable.empty() );

            component.deleteUser( user );

            expect(users.indexOf( user )).toBe(-1);
        });

        it('should NOT remove user from list if the user concels', ()=> {
            
              spyOn(window, 'confirm').and.returnValue(false);
              spyOn(userService, 'deleteUser').and.returnValue( Observable.empty() );

              component.deleteUser(user);

              expect(component.users.indexOf(user)).toBeGreaterThan(-1);
        });
        
        it('should call the server to delete the user if the user confirms deletion', () => {
            spyOn(window, 'confirm').and.returnValue(true);
            let spy = spyOn(userService, 'deleteUser').and.returnValue(Observable.empty());
            
            component.deleteUser(user);

            expect(spy).toHaveBeenCalledWith(user.id);
        });

        it('should NOT call the server to delete the user if the user cancels', () => {
            spyOn(window, 'confirm').and.returnValue(false);
            let spy = spyOn(userService, 'deleteUser').and.returnValue(Observable.empty());
            
            component.deleteUser(user);

            expect(spy).not.toHaveBeenCalled();
        });

        it('should undo deletion if the call to the server fails', () => {
            spyOn(window, 'confirm').and.returnValue(true);
            spyOn(window, 'alert').and.callFake(() => {}); 
            spyOn(userService, 'deleteUser').and.returnValue(Observable.throw('error'));

            component.deleteUser(user);

            expect(component.users.indexOf(user)).toBeGreaterThan(-1);
        });
  
        it('should display an error if the call to the server fails', () => {
            spyOn(window, 'confirm').and.returnValue(true);
            let spy = spyOn(window, 'alert').and.callFake(() => {}); 
            spyOn(userService, 'deleteUser').and.returnValue(Observable.throw('error'));

            component.deleteUser(user);

            expect(spy).toHaveBeenCalled();
        });

    });
})