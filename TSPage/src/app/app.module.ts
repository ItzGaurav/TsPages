import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms'   // ReactiveFormsModule

import { AppComponent } from './app.component';

import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http'
import { RouterModule, Routes } from '@angular/router';
import { PageNotFoundComponent } from './PageNotFound/PageNotFoundComponent'
import { ActivityReport } from './ActivityReport/ActivityReport.Component'
import { Activity } from './Activity/Activity.Componet'

const appRoute: Routes = [
    { path: 'home', component: Activity },
    { path: 'ActivityReport', component: ActivityReport },
    { path: '**', component: PageNotFoundComponent }
];


@NgModule({
    imports: [BrowserModule, ReactiveFormsModule, FormsModule, HttpModule, RouterModule.forRoot(appRoute)],
    declarations: [AppComponent, PageNotFoundComponent, Activity,ActivityReport],
    bootstrap: [AppComponent]
})
export class AppModule { }//import { DataTableModule } from 'angular-2-data-table'; }
