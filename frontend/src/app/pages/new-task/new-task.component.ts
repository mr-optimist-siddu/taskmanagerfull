import { Component, OnInit } from '@angular/core';
import { TaskService } from 'src/app/task.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Task } from 'src/app/models/task.model';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-new-task',
  templateUrl: './new-task.component.html',
  styleUrls: ['./new-task.component.scss']
})
export class NewTaskComponent implements OnInit {

  constructor(private taskService: TaskService, private route: ActivatedRoute, private router: Router, private _snackBar: MatSnackBar) { }

  listId: any;

  ngOnInit() {
    this.route.params.subscribe(
      (params: Params) => {
        this.listId = params['listId'];
      }
    )
  }

  createTask(title: string) {
    if (title.trim() === "") {
      this._snackBar.open('Task Name Empty','',{
              duration:5000,
            })
    } else {
      this.taskService.createTask(title, this.listId).subscribe((newTask: any) => {
        this.router.navigate(['../'], { relativeTo: this.route });
      });
      this._snackBar.open('Task Created Successfully', '', {
        duration: 5000,
      });
    }

  }

}
