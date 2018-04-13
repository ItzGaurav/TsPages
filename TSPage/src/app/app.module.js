"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require("@angular/core");
var platform_browser_1 = require("@angular/platform-browser");
var forms_1 = require("@angular/forms"); // ReactiveFormsModule
var app_component_1 = require("./app.component");
var forms_2 = require("@angular/forms");
var http_1 = require("@angular/http");
var router_1 = require("@angular/router");
var PageNotFoundComponent_1 = require("./PageNotFound/PageNotFoundComponent");
var ActivityReport_Component_1 = require("./ActivityReport/ActivityReport.Component");
var Activity_Componet_1 = require("./Activity/Activity.Componet");
var appRoute = [
    { path: 'home', component: Activity_Componet_1.Activity },
    { path: 'ActivityReport', component: ActivityReport_Component_1.ActivityReport },
    { path: '**', component: PageNotFoundComponent_1.PageNotFoundComponent }
];
var AppModule = (function () {
    function AppModule() {
    }
    return AppModule;
}()); //import { DataTableModule } from 'angular-2-data-table'; }
AppModule = __decorate([
    core_1.NgModule({
        imports: [platform_browser_1.BrowserModule, forms_1.ReactiveFormsModule, forms_2.FormsModule, http_1.HttpModule, router_1.RouterModule.forRoot(appRoute)],
        declarations: [app_component_1.AppComponent, PageNotFoundComponent_1.PageNotFoundComponent, Activity_Componet_1.Activity, ActivityReport_Component_1.ActivityReport],
        bootstrap: [app_component_1.AppComponent]
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map