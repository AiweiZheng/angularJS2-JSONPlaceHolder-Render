import {RouterModule,Router} from "@angular/router";
import{AlbumsComponent} from "./albums.component";

export const albumRouting = RouterModule.forChild([
    { path: 'albums', component: AlbumsComponent }
]);