import { NgModule }            from '@angular/core';
import { CommonModule }        from '@angular/common';

import { SpinnerComponent }    from './spinner.component';
import { PaginationComponent } from './pagination.component';

@NgModule({
    imports: [
        CommonModule
    ],
    declarations: [
        SpinnerComponent,
        PaginationComponent
    ],
    exports: [
        SpinnerComponent,
        PaginationComponent
    ],
    providers: [

    ]
})

export class SharedModule {

}