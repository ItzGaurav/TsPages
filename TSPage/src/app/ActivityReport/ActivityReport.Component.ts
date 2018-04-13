
import { Component, OnInit } from '@angular/core'
import { FormGroup, FormBuilder, Validators, AbstractControl, ValidatorFn, FormArray } from '@angular/forms'
import { ProjectInfo } from '../ProjectInfo';
import { TaskInfo } from '../TaskInfo';
import { ActivityReportInfo } from './ActivityReportInfo';
import { Router, Event, NavigationStart, NavigationEnd, NavigationError, NavigationCancel } from '@angular/router';


import { Http, Response, Headers, RequestOptions } from '@angular/http'
import { Observable } from 'rxjs/Observable'
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/catch'
import 'rxjs/add/Observable/throw'
import 'rxjs/rx'


@Component({
    templateUrl: './ActivityReport.Component.html'

})
export class ActivityReport implements OnInit {

    AReportModel = new ActivityReportInfo();
    AReportInfo: ActivityReportInfo[];


    constructor(private _http: Http, private router: Router) {


    }



    ngOnInit() {

        this.getResourceActivities()
            .subscribe(activities => this.AReportInfo = activities,
            error => { console.error(error) });
    }

    getResourceActivities(): Observable<ActivityReportInfo[]> {
        return this._http.get("http://localhost:49827/api/ExportExcel")
            .map((response: Response) => <ProjectInfo[]>response.json())
            .catch(this.handleError);
    }


    downloadExcelFile() {
        //alert();
        //this._http.get("http://localhost:49827/api/ExportExcel/0");

        var url = "http://localhost:49827/api/ExportExcel/0";
        window.open(url);
    }


    handleError(error: Response) {
        console.error(error);
        return Observable.throw(error);
    }

    private extractData(res: Response) {
        let sts = parseInt(res.text());

        if (res.ok && sts == 1) { alert('Changes Updated Successfully'); };

    }
}