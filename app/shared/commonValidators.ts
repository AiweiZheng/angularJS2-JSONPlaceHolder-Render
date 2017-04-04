import { Control } from "@angular/common";

export class CommonValidators {
    static cannotContainSpace(control: Control) {
        if (control.value.indexOf(' ') > 0) {
            return { cannotCantainSpace: true };
        }
        return null;
    }
    static isValidatedEmailAddress(control: Control) {
        var email = control.value;
        if (email == '')
            return null;
        var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (!re.test(email)) {
            return { invalidEmailAddress: true };
        }
        return null;
    }
}