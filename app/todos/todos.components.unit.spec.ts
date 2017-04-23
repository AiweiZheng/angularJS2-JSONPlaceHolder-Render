import { TodosComponent } from './todos.component';
import { UserService } from '../users/user.service';
import { TodoService } from './todo.service';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/from';
import 'rxjs/add/observable/throw';


xdescribe('TodosComponent', () => {
    var component : TodosComponent;
    var userService : UserService;
    var todoService : TodoService;

    beforeEach( () => {
        userService = new UserService( null );
        todoService = new TodoService( null );
        component = new TodosComponent( todoService, userService);
    });
   
    describe('ngOnInit():Retrieved data successfully from the server', () => {

         it('should set users property with the users retrieved from the server', () => {
            let users = [1, 2, 3];
            
            spyOn(userService, 'getUsers').and.returnValue( Observable.from([ users ]) );
            spyOn(todoService, 'getUserTodos').and.returnValue( Observable.from([ [] ]) );

            component.ngOnInit();

            expect( component.users ).toBe( users );
        });

        it('should set todos property with the data retrieved from the server', () => {
            let todos = [1, 2, 3];
            spyOn(userService, 'getUsers').and.returnValue( Observable.from([ [] ]) );
            spyOn(todoService, 'getUserTodos').and.returnValue( Observable.from([ todos ]));

            component.ngOnInit();

            expect( component.todos ).toBe( todos );
        });

        it('should set isLoading property to true when retrieved users and todos', ()=> {
            spyOn(userService, 'getUsers').and.returnValue( Observable.from([ [] ]) );
            spyOn(todoService, 'getUserTodos').and.returnValue( Observable.from([ [] ]) );

            component.ngOnInit();
            
            expect( component.isLoading ).toBeFalsy();
        });

        it('should call getTodosInPage after retrieved users and todos', () => {
            spyOn(userService, 'getUsers').and.returnValue( Observable.from([ [] ]) );
            spyOn(todoService, 'getUserTodos').and.returnValue( Observable.from([ [] ]) );

            component.ngOnInit();

            expect( component.getTodosInPage ).toHaveBeenCalled;   
        });
    })

    describe('ngOnInit():failed to retrieve data from the Server', () => {
        it('should set error to the message returned from the userService when failed to retrieve data from userService', () => {

            let error = 'error';
            spyOn(userService, 'getUsers').and.returnValue( Observable.throw(error) );
            spyOn(todoService, 'getUserTodos').and.returnValue( Observable.from([ [] ]) );

            component.ngOnInit();

            expect( component.error ).toBe(error);
        });

        it('should set error to the message returned from the todoService when failed to retrieve data from todoService', () => {

            let error = 'error';
            spyOn(userService, 'getUsers').and.returnValue( Observable.from([ [] ]) );
            spyOn(todoService, 'getUserTodos').and.returnValue( Observable.throw( error ) );

            component.ngOnInit();

            expect( component.error ).toBe(error);
        });
    });

     describe('loadTodo():', () => {
        describe('Retrieved data successfully from the server', () => {
            it('should set todos to the data retrieved from the todoService', () => {
                let todos = [1, 2, 3];
                spyOn(todoService, 'getUserTodos').and.returnValue( Observable.from([ todos ]));

                component.loadTodo(1);

                expect( component.todos ).toBe( todos );
            });

            it('should call getTodosInPage after retrieved data from server', () => {
                spyOn(todoService, 'getUserTodos').and.returnValue( Observable.from([ [] ]) );

                component.loadTodo(1);

                expect( component.getTodosInPage ).toHaveBeenCalled;  
            });
        });
    });

     describe('getTodosInPage:', () => {
        it('Should set todosPerPage to be a subset of todos in PageSize when (pageIndex * this.pageSize) is less than or equal to the lenght of todos', () => {
            component.todos = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
            component.pageSize = 5;
            let pageIndex = 2;

            component.getTodosInPage(pageIndex);

            expect( component.todosPerPage).toEqual([ 6, 7, 8, 9, 10 ]);
        });
         it('Should set todosPerPage to be a subset of todos from ((pageIndex-1) * this.pageSize) to the end when (pageIndex * this.pageSize) is larger than the lenght of todos', () => {
            component.todos = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
            component.pageSize = 5;
            let pageIndex = 3;

            component.getTodosInPage(pageIndex);

            expect( component.todosPerPage).toEqual([ 11,12 ]);
        });
    });

     describe('changeTodoComplete:', () => {
        it('should set complete to false if complete is true', () => {
            var todo ={completed: true};

            component.changeTodoStatus( todo );

            expect( todo.completed ).toBeFalsy();
        });

        it('should set complete to true if complete is false', () => {
            var todo = {completed: false};

            component.changeTodoStatus( todo );

            expect( todo.completed ).toBeTruthy();
        });
     });

     describe('deleteTodo:', () => {
        it('should delete an item from todosPerPage if the user confirms', () => {
            component.todosPerPage = [1, 2, 3, 4, 5, 6];
            spyOn(window, 'confirm').and.returnValue(true);
         
            component.deleteTodo(4);

            expect(component.todosPerPage).toEqual( [1, 2, 3, 5, 6] );
        });

        it('should delete an item from todos if the user confirms', () => {
            component.todos = [1, 2, 3, 4, 5, 6];
            spyOn(window, 'confirm').and.returnValue(true);
         
            component.deleteTodo(4);

            expect(component.todos).toEqual( [1, 2, 3, 5, 6] );
        });

        it('should NOT delete an item from todosPerPage if the user confirms', () => {
            var todosPerPage = [1, 2, 3, 4, 5, 6];
            component.todosPerPage = todosPerPage;
            spyOn(window, 'confirm').and.returnValue(false);
         
            component.deleteTodo(4);

            expect(component.todosPerPage).toEqual( todosPerPage );
        });

        it('should NOT delete an item from todos if the user confirms', () => {
            var todos = [1, 2, 3, 4, 5, 6];
             component.todos = todos;
            spyOn(window, 'confirm').and.returnValue(false);
         
            component.deleteTodo(4);

            expect(component.todos).toEqual( todos );
        });
     });

     describe('toggleAddTodoInput:', () => {
         it('should set addingTodo to false if addingTodo is true', () => {
            component.addingTodo = true;

            component.toggleAddTodoInput();

            expect( component.addingTodo ).toBeFalsy();
        });

        it('should set addingTodo to true if addingTodo is false', () => {
            component.addingTodo = false;

            component.toggleAddTodoInput();

            expect( component.addingTodo ).toBeTruthy();
        });
     });

     describe('addTodoInputChanged', () => {
         describe('when user hit enter key', () => {
            it('should add newTodo to todos', () => {
                let event = { which: 13 };
                let newTodo = {title:'test@#$'};
                component.todos = [ {title: "test1"} ];
                component.newTodo = newTodo;

                component.addTodoInputChanged( event );
                
                expect(component.todos).toEqual([{title: "test1"}, {title:'test@#$'}]);
            });

            it('should add newTodo to todosPerPage', () => {
                let event = { which: 13 };
                let newTodo = {title:'test@#$'};
                component.todosPerPage = [ {title: "test1"} ];
                component.newTodo = newTodo;

                component.addTodoInputChanged( event );
                
                expect(component.todosPerPage).toEqual([{title: "test1"}, {title:'test@#$'}]);
            });

            it('should set newTodo to {title: ""}', () => {
                let event = { which: 13 };
                let newTodo = {title:'test@#$'};
                component.todosPerPage = [ {title: "test1"} ];
                component.newTodo = newTodo;

                component.addTodoInputChanged( event );
                
                expect(component.newTodo).toEqual( {title: ""} );
            });
        });

          describe('when user hit other keys', () => {
            it('should NOT add newTodo to todos', () => {
                let event = { which: 14 };
                let newTodo = {title:'test@#$'};
                component.todos = [ {title: "test1"} ];
                component.newTodo = newTodo;

                component.addTodoInputChanged( event );
                
                expect(component.todos).toEqual([{title: "test1"}]);
            });

            it('should add newTodo to todosPerPage', () => {
                let event = { which: 14 };
                let newTodo = {title:'test@#$'};
                component.todosPerPage = [ {title: "test1"} ];
                component.newTodo = newTodo;

                component.addTodoInputChanged( event );
                
                expect(component.todosPerPage).toEqual([{title: "test1"}]);
            });

            it('should NOT reset newTodo', () => {
                let event = { which: 14 };
                let newTodo = {title:'test@#$'};
                component.todosPerPage = [ {title: "test1"} ];
                component.newTodo = newTodo;

                component.addTodoInputChanged( event );
                
                expect(component.newTodo).toEqual( newTodo );
            });
        });
    });
});