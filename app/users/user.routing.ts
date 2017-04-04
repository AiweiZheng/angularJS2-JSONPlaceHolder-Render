import { Router, RouterModule }       from '@angular/router';
import { UsersComponent }             from './users.component';
import { SignupFormComponent }        from './signup-form.component';
import { PreventUnsavedChangesGuard } from '../shared/prevent-unsaved-changes-guard.service';

export const userRouting = RouterModule.forChild([
    { path: 'users', component: UsersComponent },
    {
        path: 'newuser',
        component: SignupFormComponent,
        canDeactivate: [PreventUnsavedChangesGuard]
    },
    {
        path: 'users/:id',
        component: SignupFormComponent,
        canDeactivate: [PreventUnsavedChangesGuard]
    },
])