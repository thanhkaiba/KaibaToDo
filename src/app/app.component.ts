import { Component } from '@angular/core';
import {JobModel} from './job.model';
import { HttpClient } from '@angular/common/http';
import {tap} from 'rxjs/operators';
import {JobService} from './Job.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  list: JobModel[] = [];
  newJob = '';

  constructor(private jobService: JobService) {
    this.list = jobService.list;
    jobService.listNotification.subscribe(list => {
      this.list = list;
    });
  }

  newElement(): void  {
    this.list.push(new JobModel(this.newJob));
    this.newJob = '';
    this.jobService.saveJobs();

  }

  doneJob(jobDone: JobModel): void {
    jobDone.done = !jobDone.done;
    this.jobService.saveJobs();

  }

  deleteJob(name: string): void {
    this.list = this.list.filter(job => {
      return job.name !== name;
    });
    this.jobService.list = this.list;
    this.jobService.saveJobs();
  }
}
