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
var core_1 = require("@angular/core");
var ActivityReportInfo_1 = require("./ActivityReportInfo");
var router_1 = require("@angular/router");
var http_1 = require("@angular/http");
var Observable_1 = require("rxjs/Observable");
require("rxjs/add/operator/map");
require("rxjs/add/operator/catch");
require("rxjs/add/Observable/throw");
require("rxjs/rx");
var ActivityReport = (function () {
    function ActivityReport(_http, router) {
        this._http = _http;
        this.router = router;
        this.AReportModel = new ActivityReportInfo_1.ActivityReportInfo();
    }
    ActivityReport.prototype.ngOnInit = function () {
        var _this = this;
        this.getResourceActivities()
            .subscribe(function (activities) { return _this.AReportInfo = activities; }, function (error) { console.error(error); });
    };
    ActivityReport.prototype.getResourceActivities = function () {
        return this._http.get("http://localhost:49827/api/ExportExcel")
            .map(function (response) { return response.json(); })
            .catch(this.handleError);
    };
    ActivityReport.prototype.downloadExcelFile = function () {
        //alert();
        //this._http.get("http://localhost:49827/api/ExportExcel/0");
        var url = "http://localhost:49827/api/ExportExcel/0";
        window.open(url);
    };
    ActivityReport.prototype.handleError = function (error) {
        console.error(error);
        return Observable_1.Observable.throw(error);
    };
    ActivityReport.prototype.extractData = function (res) {
        var sts = parseInt(res.text());
        if (res.ok && sts == 1) {
            alert('Changes Updated Successfully');
        }
        ;
    };
    return ActivityReport;
}());
ActivityReport = __decorate([
    core_1.Component({
        templateUrl: './ActivityReport.Component.html'
    }),
    __metadata("design:paramtypes", [http_1.Http, router_1.Router])
], ActivityReport);
exports.ActivityReport = ActivityReport;
//# sourceMappingURL=ActivityReport.Component.js.map