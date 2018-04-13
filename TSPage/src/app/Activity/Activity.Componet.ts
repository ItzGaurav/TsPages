
import { Component, OnInit } from '@angular/core'
import { FormGroup, FormBuilder, Validators, AbstractControl, ValidatorFn, FormArray } from '@angular/forms'
import { ProjectInfo } from '../ProjectInfo';
import { TaskInfo } from '../TaskInfo';
import { ActivityInfo } from '../ActivityInfo';
import { Router, Event, NavigationStart, NavigationEnd, NavigationError, NavigationCancel } from '@angular/router';


import { Http, Response, Headers, RequestOptions } from '@angular/http'
import { Observable } from 'rxjs/Observable'
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/catch'
import 'rxjs/add/Observable/throw'
import 'rxjs/rx'

@Component({
    selector: 'my-ac',
    templateUrl: './Activity.Componet.html'
})
export class Activity implements OnInit {
    tsFormGroup: FormGroup;

    projectModel = new ProjectInfo();
    projects: ProjectInfo[];


    activityCount: number = 1;

    tasklist: Array<TaskInfo[]> = [];

    activityInfoList: Array<ActivityInfo> = [];
    data: ActivityInfo[];

    statusMessage: string = 'Default Error Message';
    loading: boolean = true;
    constructor(private fb: FormBuilder, private _http: Http, private router: Router) {

        router.events.subscribe((routerEvent: Event) => {
            this.checkRouterEvent(routerEvent);
        });
    }

    get NewActivity(): FormArray {
        return <FormArray>this.tsFormGroup.get('newActivityControl'); //<FormArray> castingcontrols.newActivityControl; //<FormArray> casting
    }

    checkRouterEvent(routerEvent: Event): void {

        if (routerEvent instanceof NavigationStart) {
            console.log('GGGGGGGGGGGGGGG');

            this.loading = true;
            this.delay(3000);
        }

        if (routerEvent instanceof NavigationEnd || routerEvent instanceof NavigationError ||
            routerEvent instanceof NavigationError) {
            this.loading = false;
        }

    }


    delay(ms: number) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    ngOnInit() {
        this.tsFormGroup = this.fb.group({
            firstName: ['', [Validators.required, Validators.minLength(3)]], // Validators class use
            newActivityControl: this.fb.array([this.buildTimeSheetsForm()])
        });

        this.getProject()
            .subscribe(project => this.projects = project,
            error => { console.error(error) });
        this.statusMessage = 'Problem with the service. Please start the Api service';


        this.getAllActivities();
        //Watching & Reacting
        //const control1 = this.tsFormGroup.get('newActivityControl')['controls'];
        //control[i].controls.ProjectID.value
        //control1.valueChanges.debounceTime(1000).subscribe(value => this.setMessage(emailControl));
    }

    setNotification(notifyVia: string): void {
        debugger;
        //const phoneControl = this.customerForm.get('phone');
        //if (notifyVia === 'text') {
        //    phoneControl.setValidators(Validators.required);
        //} else {
        //    phoneControl.clearValidators();
        //}
        //phoneControl.updateValueAndValidity();

    }

    buildTimeSheetsForm(): FormGroup {
        return this.fb.group({
            ProjectId: 0,
            TaskId: 0,
            ActivityDate: 0,
            HoursSpent: ['', [Validators.required, Validators.min(1)]]
        });
    }

    addNewRow(): void {
        this.NewActivity.push(this.buildTimeSheetsForm());
        this.activityCount++;
    }


    removeActivity(i: number) {
        const control = <FormArray>this.tsFormGroup.get('newActivityControl');
        control.removeAt(i);
        this.activityCount--;
    }

    getProject(): Observable<ProjectInfo[]> {
        return this._http.get("http://localhost:49827/api/Project")
            .map((response: Response) => <ProjectInfo[]>response.json())
            .catch(this.handleError);
    }

    handleError(error: Response) {
        console.error(error);
        return Observable.throw(error);
    }

    projectDDChanged(i: number) {

        const control = this.tsFormGroup.get('newActivityControl')['controls'];

        var selectedProjectId = control[i].controls.ProjectId.value;

        this.getTask(selectedProjectId).subscribe(task => this.tasklist[i] = task,
            error => { console.error(error) });

    }



    getTask(projectId: number): Observable<TaskInfo[]> {
        return this._http.get("http://localhost:49827/api/Project/" + projectId)   // calling to get all task relate to particular projectID
            .map((response: Response) => <TaskInfo[]>response.json())
            .catch(this.handleError);
    }

    saveActivities(): void {
        const control = this.tsFormGroup.get('newActivityControl')['controls'];
        var i: number;
        for (i = 0; i < this.activityCount; i++) {
            var activityInfo = new ActivityInfo();
            activityInfo.ProjectId = control[i].controls.ProjectId.value;
            activityInfo.TaskId = control[i].controls.TaskId.value;
            activityInfo.ActivityDate = control[i].controls.ActivityDate.value;
            activityInfo.NoOfHoursSpent = control[i].controls.HoursSpent.value;
            this.activityInfoList[i] = activityInfo;

        }

        this.saveActivity(this.activityInfoList)
            .subscribe(this.refreshPage, err => console.log('Error' + err));
    }




    getAllActivities() {

        this.getActivities().subscribe(activity => this.data = activity,
            error => { console.error('AAAAAAAAAAA' + error) });
    }

    getActivities() {

        return this._http.get("http://localhost:49827/api/Activity/" + 0)   // calling to get all task relate to particular projectID
            .map((response: Response) => <TaskInfo[]>response.json())
            .catch(this.handleError);
    }


    saveActivity(activityInfoList: Array<ActivityInfo>): Observable<any> {
        let body = JSON.stringify(activityInfoList);
        let header = new Headers({ 'Content-Type': 'application/json' });
        let option = new RequestOptions({ headers: header });

        return this._http.post('http://localhost:49827/api/Activity/', body, option)
            .map(this.extractData).catch(this.handleError);

    }

    refreshPage() {
        window.location.reload();
    }

    private extractData(res: Response) {
        let sts = parseInt(res.text());

        if (res.ok && sts == 1) { alert('Changes Updated Successfully'); };

    }

    clearPage() {


    }


}
