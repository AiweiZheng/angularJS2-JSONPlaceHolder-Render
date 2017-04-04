import { NgModule }          from '@angular/core';
import { BrowserModule }     from '@angular/platform-browser';

import { AppComponent }      from './app.component';
import { NavBarComponent }   from './navbar.component'
import { NotFoundComponent } from './notFound.component';
import { HomeComponent }     from './home.component';

import { UsersModule }       from './users/user.module';
import { PostModule }        from './post/post.module';

import { routing }           from './app.routing';
import { userRouting }       from './users/user.routing';
import { postRouting }       from './post/post.routing';

import { PreventUnsavedChangesGuard } from './shared/prevent-unsaved-changes-guard.service';

@NgModule({
  imports: [
    BrowserModule,
    UsersModule,
    PostModule,
    userRouting,
    postRouting,
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