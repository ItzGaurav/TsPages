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
var forms_1 = require("@angular/forms");
var ProjectInfo_1 = require("../ProjectInfo");
var ActivityInfo_1 = require("../ActivityInfo");
var router_1 = require("@angular/router");
var http_1 = require("@angular/http");
var Observable_1 = require("rxjs/Observable");
require("rxjs/add/operator/map");
require("rxjs/add/operator/catch");
require("rxjs/add/Observable/throw");
require("rxjs/rx");
var Activity = (function () {
    function Activity(fb, _http, router) {
        var _this = this;
        this.fb = fb;
        this._http = _http;
        this.router = router;
        this.projectModel = new ProjectInfo_1.ProjectInfo();
        this.activityCount = 1;
        this.tasklist = [];
        this.activityInfoList = [];
        this.statusMessage = 'Default Error Message';
        this.loading = true;
        router.events.subscribe(function (routerEvent) {
            _this.checkRouterEvent(routerEvent);
        });
    }
    Object.defineProperty(Activity.prototype, "NewActivity", {
        get: function () {
            return this.tsFormGroup.get('newActivityControl'); //<FormArray> castingcontrols.newActivityControl; //<FormArray> casting
        },
        enumerable: true,
        configurable: true
    });
    Activity.prototype.checkRouterEvent = function (routerEvent) {
        if (routerEvent instanceof router_1.NavigationStart) {
            console.log('GGGGGGGGGGGGGGG');
            this.loading = true;
            this.delay(3000);
        }
        if (routerEvent instanceof router_1.NavigationEnd || routerEvent instanceof router_1.NavigationError ||
            routerEvent instanceof router_1.NavigationError) {
            this.loading = false;
        }
    };
    Activity.prototype.delay = function (ms) {
        return new Promise(function (resolve) { return setTimeout(resolve, ms); });
    };
    Activity.prototype.ngOnInit = function () {
        var _this = this;
        this.tsFormGroup = this.fb.group({
            firstName: ['', [forms_1.Validators.required, forms_1.Validators.minLength(3)]],
            newActivityControl: this.fb.array([this.buildTimeSheetsForm()])
        });
        this.getProject()
            .subscribe(function (project) { return _this.projects = project; }, function (error) { console.error(error); });
        this.statusMessage = 'Problem with the service. Please start the Api service';
        this.getAllActivities();
        //Watching & Reacting
        //const control1 = this.tsFormGroup.get('newActivityControl')['controls'];
        //control[i].controls.ProjectID.value
        //control1.valueChanges.debounceTime(1000).subscribe(value => this.setMessage(emailControl));
    };
    Activity.prototype.setNotification = function (notifyVia) {
        debugger;
        //const phoneControl = this.customerForm.get('phone');
        //if (notifyVia === 'text') {
        //    phoneControl.setValidators(Validators.required);
        //} else {
        //    phoneControl.clearValidators();
        //}
        //phoneControl.updateValueAndValidity();
    };
    Activity.prototype.buildTimeSheetsForm = function () {
        return this.fb.group({
            ProjectId: 0,
            TaskId: 0,
            ActivityDate: 0,
            HoursSpent: ['', [forms_1.Validators.required, forms_1.Validators.min(1)]]
        });
    };
    Activity.prototype.addNewRow = function () {
        this.NewActivity.push(this.buildTimeSheetsForm());
        this.activityCount++;
    };
    Activity.prototype.removeActivity = function (i) {
        var control = this.tsFormGroup.get('newActivityControl');
        control.removeAt(i);
        this.activityCount--;
    };
    Activity.prototype.getProject = function () {
        return this._http.get("http://localhost:49827/api/Project")
            .map(function (response) { return response.json(); })
            .catch(this.handleError);
    };
    Activity.prototype.handleError = function (error) {
        console.error(error);
        return Observable_1.Observable.throw(error);
    };
    Activity.prototype.projectDDChanged = function (i) {
        var _this = this;
        var control = this.tsFormGroup.get('newActivityControl')['controls'];
        var selectedProjectId = control[i].controls.ProjectId.value;
        this.getTask(selectedProjectId).subscribe(function (task) { return _this.tasklist[i] = task; }, function (error) { console.error(error); });
    };
    Activity.prototype.getTask = function (projectId) {
        return this._http.get("http://localhost:49827/api/Project/" + projectId) // calling to get all task relate to particular projectID
            .map(function (response) { return response.json(); })
            .catch(this.handleError);
    };
    Activity.prototype.saveActivities = function () {
        var control = this.tsFormGroup.get('newActivityControl')['controls'];
        var i;
        for (i = 0; i < this.activityCount; i++) {
            var activityInfo = new ActivityInfo_1.ActivityInfo();
            activityInfo.ProjectId = control[i].controls.ProjectId.value;
            activityInfo.TaskId = control[i].controls.TaskId.value;
            activityInfo.ActivityDate = control[i].controls.ActivityDate.value;
            activityInfo.NoOfHoursSpent = control[i].controls.HoursSpent.value;
            this.activityInfoList[i] = activityInfo;
        }
        this.saveActivity(this.activityInfoList)
            .subscribe(this.refreshPage, function (err) { return console.log('Error' + err); });
    };
    Activity.prototype.getAllActivities = function () {
        var _this = this;
        this.getActivities().subscribe(function (activity) { return _this.data = activity; }, function (error) { console.error('AAAAAAAAAAA' + error); });
    };
    Activity.prototype.getActivities = function () {
        return this._http.get("http://localhost:49827/api/Activity/" + 0) // calling to get all task relate to particular projectID
            .map(function (response) { return response.json(); })
            .catch(this.handleError);
    };
    Activity.prototype.saveActivity = function (activityInfoList) {
        var body = JSON.stringify(activityInfoList);
        var header = new http_1.Headers({ 'Content-Type': 'application/json' });
        var option = new http_1.RequestOptions({ headers: header });
        return this._http.post('http://localhost:49827/api/Activity/', body, option)
            .map(this.extractData).catch(this.handleError);
    };
    Activity.prototype.refreshPage = function () {
        window.location.reload();
    };
    Activity.prototype.extractData = function (res) {
        var sts = parseInt(res.text());
        if (res.ok && sts == 1) {
            alert('Changes Updated Successfully');
        }
        ;
    };
    Activity.prototype.clearPage = function () {
    };
    return Activity;
}());
Activity = __decorate([
    core_1.Component({
        selector: 'my-ac',
        templateUrl: './Activity.Componet.html'
    }),
    __metadata("design:paramtypes", [forms_1.FormBuilder, http_1.Http, router_1.Router])
], Activity);
exports.Activity = Activity;
//# sourceMappingURL=Activity.Componet.js.map