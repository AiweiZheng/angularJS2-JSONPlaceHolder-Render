import { RouterModule, Router }  from '@angular/router';
import { TodosComponent }        from './todos.component';

export const todoRouting = RouterModule.forChild([
    { path: 'todos', component: TodosComponent }
]);