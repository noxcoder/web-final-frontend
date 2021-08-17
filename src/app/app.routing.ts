import { NgModule } from '@angular/core';
import { CommonModule, } from '@angular/common';
import { BrowserModule  } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';

import { ComponentsComponent } from './components/components.component';
import { SignupComponent } from './examples/signup/signup.component';
import { ContactComponent } from './contact/contact.component';
import { ProfileComponent } from './examples/profile/profile.component';

const routes: Routes =[
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'home',             component: ComponentsComponent },
    { path: 'secret-control-center',    component: SignupComponent },
    { path: 'contact-us',       component: ContactComponent },
    { path: 'command-center-hq1908', component: ProfileComponent },
    { path: "**", pathMatch: "full", redirectTo: "/home" }
];

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule.forRoot(routes,{
      useHash: false
    })
  ],
  exports: [
  ],
})
export class AppRoutingModule { }
