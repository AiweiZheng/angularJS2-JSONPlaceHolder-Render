import{Component} from 'angular2/core';
import{ROUTER_DIRECTIVES,Router} from 'angular2/router';
@Component({
    selector:'navbar',
    templateUrl:'app/navbar.component.html',
    directives:[ROUTER_DIRECTIVES]
})

export class NavBarComponent{
    constructor(private _router :Router){

    }
    isCurrentRoute(router){
        var instruction = this._router.generate(router); 
        return this._router.isRouteActive(instruction);
    }
}