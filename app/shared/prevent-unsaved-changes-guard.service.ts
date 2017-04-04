import { CanDeactivate } from '@angular/router';
import { FormGroup }     from '@angular/forms';

export interface FormComponent {
    form: FormGroup;
}
export class PreventUnsavedChangesGuard implements CanDeactivate<FormComponent>{
    canDeactivate(component: FormComponent) {
        if (component.form.dirty) {
            return confirm("You have unsaved changes,are you sure to leave this page?");
        }
        return true;
    }
}