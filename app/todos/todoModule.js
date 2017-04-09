"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var common_1 = require('@angular/common');
var todos_component_1 = require('./todos.component');
var shared_module_1 = require('../shared/shared.module');
var user_service_1 = require('../users/user.service');
var todo_service_1 = require('./todo.service');
var TodoModule = (function () {
    function TodoModule() {
    }
    TodoModule = __decorate([
        core_1.NgModule({
            imports: [
                common_1.CommonModule,
                shared_module_1.SharedModule
            ],
            declarations: [
                todos_component_1.TodosComponent
            ],
            exports: [
                todos_component_1.TodosComponent
            ],
            providers: [
                todo_service_1.TodoService,
                user_service_1.UserService
            ]
        }), 
        __metadata('design:paramtypes', [])
    ], TodoModule);
    return TodoModule;
}());
exports.TodoModule = TodoModule;
//# sourceMappingURL=todoModule.js.map