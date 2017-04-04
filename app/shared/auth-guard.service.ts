import { Injectable }  from '@angular/Core';
import { CanActivate } from '@angular/router';

export class AuthGuard implements CanActivate {
    canActivate() {
        return false;
    }
}