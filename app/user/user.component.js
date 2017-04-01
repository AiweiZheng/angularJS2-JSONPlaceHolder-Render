System.register(['angular2/core', 'angular2/common'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, common_1;
    var UserComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (common_1_1) {
                common_1 = common_1_1;
            }],
        execute: function() {
            UserComponent = (function () {
                function UserComponent(fb) {
                    this.signupForm = fb.group({
                        name: ['', common_1.Validators.required],
                        email: ['', common_1.Validators.required],
                        Phone: ['', common_1.Validators.required],
                        street: ['', common_1.Validators.required],
                        suite: [],
                        city: ['', common_1.Validators.required],
                        zipCode: ['', common_1.Validators.required]
                    });
                }
                UserComponent = __decorate([
                    core_1.Component({
                        templateUrl: '',
                        directives: [common_1.ControlGroup]
                    }), 
                    __metadata('design:paramtypes', [common_1.FormBuilder])
                ], UserComponent);
                return UserComponent;
            }());
            exports_1("UserComponent", UserComponent);
        }
    }
});
//# sourceMappingURL=user.component.js.map