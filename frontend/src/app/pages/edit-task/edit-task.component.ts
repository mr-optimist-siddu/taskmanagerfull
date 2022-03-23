import { Component, OnInit } from '@angular/core';
import { Params, ActivatedRoute, Router } from '@angular/router';
import { TaskService } from 'src/app/task.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-edit-task',
  templateUrl: './edit-task.component.html',
  styleUrls: ['./edit-task.component.scss']
})
export class EditTaskComponent implements OnInit {

  constructor(private route: ActivatedRoute, private taskService: TaskService, private router: Router, private _snackBar: MatSnackBar) { }

  taskId: any;
  listId: any;


  ngOnInit() {
    this.route.params.subscribe(
  (params: Params) => {
        this.taskId = params['taskId'];
    this.listId = params['listId'];
      }
    )
  }

  updateTask(title: string) {
    if (title.trim() === "") {
      this._snackBar.open('Enter the Updated Task Name','',{
        duration:5000,
      })
    } else {
      this.taskService.updateTask(this.listId, this.taskId, title).subscribe(() => {
        this._snackBar.open('Task Name Updated Successfully', '', {
          duration: 5000,
        });
      this.router.navigate(['/lists', this.listId]);
      })
    }
  }
}

