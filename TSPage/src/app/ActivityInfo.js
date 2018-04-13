"use strict";
var ActivityInfo = (function () {
    function ActivityInfo() {
        this.ResourceId = 0;
        this.ResourceName = '';
        this.ActivityId = 0;
        this.ProjectId = 0;
        this.ProjectName = '';
        this.TaskId = 0;
        this.TaskType = '';
        this.ActivityDate = new Date();
        this.NoOfHoursSpent = 0;
        this.LastModifiedBy = 0;
        this.LastModifiedName = '';
    }
    return ActivityInfo;
}());
exports.ActivityInfo = ActivityInfo;
//# sourceMappingURL=ActivityInfo.js.map