import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppComponent } from './app.component';
import { PostComponent } from './posts/post/post.component';
import { PostListComponent } from './posts/post-list/post-list.component';
import { PostListItemComponent } from './posts/post-list-item/post-list-item.component';
import { CreatePostComponent } from './posts/create-post/create-post.component';
import { UpdatePostComponent } from './posts/update-post/update-post.component';
import { AboutComponent } from './about/about.component';
import { UpdateAboutComponent } from './about/update-about/update-about.component';
import { SigninComponent } from './auth/signin/signin.component';
import { SignupComponent } from './auth/signup/signup.component';
import { UpdateUserComponent } from './user/update-user/update-user.component';
import { CreateUserComponent } from './user/create-user/create-user.component';
import { UserListComponent } from './user/user-list/user-list.component';
import { HeaderComponent } from './header/header.component';
import { AdministrationComponent } from './administration/administration.component';
import { BodyComponent } from './body/body.component';
import { FourOhFourComponent } from './four-oh-four/four-oh-four.component';
import { SignupWithUrlComponent } from './auth/signup/signup-with-url/signup-with-url.component';

import { PostService } from './services/post.service';
import { AuthService } from './services/auth.service';
import { AuthGuardService } from './services/auth-guard.service';
import { UserService } from './services/user.service';

const appRoutes: Routes = [
  { path: 'body', canActivate: [AuthGuardService], component: BodyComponent,
    children : [
      { path: 'posts', component: PostListComponent },
      { path: 'posts/view/:id', component: PostComponent },
      { path: 'about', component: AboutComponent },
      { path: 'administration', component: AdministrationComponent,
        children : [
          { path: 'create-post', component: CreatePostComponent },
          { path: 'update-post/:id', component: UpdatePostComponent },
          { path: 'create-user', component: CreateUserComponent },
          { path: 'update-user/:id', component: UpdateUserComponent }
        ]
      },
    ]
  },
  { path: 'authentication/signup', component: SignupWithUrlComponent },
  { path: 'authentication/signin', component: SigninComponent },
  { path: '', redirectTo: 'body/posts', pathMatch: 'full' },
  { path: '**', redirectTo: 'page-not-found' },
  { path: 'page-not-found',component: FourOhFourComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    PostComponent,
    PostListComponent,
    PostListItemComponent,
    CreatePostComponent,
    UpdatePostComponent,
    AboutComponent,
    UpdateAboutComponent,
    SigninComponent,
    SignupComponent,
    UpdateUserComponent,
    CreateUserComponent,
    UserListComponent,
    HeaderComponent,
    AdministrationComponent,
    BodyComponent,
    FourOhFourComponent,
    SignupWithUrlComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes),
    FontAwesomeModule,
    NgbModule
  ],
  providers: [
    PostService,
    AuthService,
    AuthGuardService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
