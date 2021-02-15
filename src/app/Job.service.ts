import {JobModel} from './job.model';
import {tap} from 'rxjs/operators';
import {HttpClient} from '@angular/common/http';
import {Observable, Subject} from 'rxjs';
import {Injectable} from '@angular/core';

@Injectable()
export class JobService {
  list: JobModel[] = [];
  listNotification: Subject<JobModel[]> = new Subject<JobModel[]>();
  constructor(private http: HttpClient) {
    this.fetchJobs();
  }
  fetchJobs(): void {
     this.http
      .get<JobModel[]>(
        'https://kaiba-todo-list-default-rtdb.firebaseio.com/todolist.json'
      )
      .pipe(
        tap((jobs: JobModel[]) => {
          if (jobs == null) {
            jobs = [];
          }
          this.list = jobs.map(job => {
            return new JobModel(job.name, job.done);
          });
          this.listNotification.next(this.list);
        })
      ).subscribe();
  }

  saveJobs(): void {
    this.http
      .put(
        'https://kaiba-todo-list-default-rtdb.firebaseio.com/todolist.json',
        this.list
      )
      .subscribe(response => {
        console.log(response);
      });
  }
}
