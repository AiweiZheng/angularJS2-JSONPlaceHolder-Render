import { NgModule }          from '@angular/core';
import { BrowserModule }     from '@angular/platform-browser';

import { AppComponent }      from './app.component';
import { NavBarComponent }   from './navbar.component'
import { NotFoundComponent } from './notFound.component';
import { HomeComponent }     from './home.component';

import { UsersModule }       from './users/user.module';
import { PostModule }        from './posts/post.module';
import { TodoModule }        from './todos/todo.module';
import { AlbumModule}        from './albums/album.module';

import { routing }           from './app.routing';
import { userRouting }       from './users/user.routing';
import { postRouting }       from './posts/post.routing';
import { todoRouting }       from './todos/todo.routing';
import { albumRouting }      from './albums/album.routing';

import { PreventUnsavedChangesGuard } from './shared/prevent-unsaved-changes-guard.service';

@NgModule({
  imports: [
    BrowserModule,
    UsersModule,
    PostModule,
    TodoModule,
    AlbumModule,
    userRouting,
    postRouting,
    todoRouting,
    albumRouting,
    routing
  ],
  declarations: [
    AppComponent,
    NavBarComponent,
    NotFoundComponent,
    HomeComponent
  ],

  providers: [
    PreventUnsavedChangesGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }