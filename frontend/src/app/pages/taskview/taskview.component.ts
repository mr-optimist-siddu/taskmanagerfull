import { Component, OnInit } from '@angular/core';
import { TaskService } from 'src/app/task.service';
import { AuthService } from 'src/app/auth.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Task } from 'src/app/models/task.model';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-task-view',
  templateUrl: './taskview.component.html',
  styleUrls: ['./taskview.component.scss']
})
export class TaskViewComponent implements OnInit {

  lists: any;
  tasks: any;

  selectedListId: any;

  constructor(private authService: AuthService,private taskService: TaskService, private route: ActivatedRoute, private router: Router,private _snackBar: MatSnackBar) { }

  ngOnInit() {
    this.route.params.subscribe(
      (params: Params) => {
        if (params['listId']) {
          this.selectedListId = params['listId'];
          this.taskService.getTasks(params['listId']).subscribe((tasks: any) => {
            this.tasks = tasks;
          })
        } else {
          this.tasks = undefined;
        }
      }
    )

    this.taskService.getLists().subscribe((lists: any) => {
      this.lists = lists;
    })

  }

  onTaskClick(task: Task) {
    // we want to set the task to completed
    this.taskService.complete(task).subscribe(() => {
      // the task has been set to completed successfully
      console.log("Completed successully!");
      task.completed = !task.completed;
    })
  }

  onDeleteListClick() {
    this.taskService.deleteList(this.selectedListId).subscribe((res: any) => {
      this.router.navigate(['/lists']);
      console.log(res);
    })
  }

  onDeleteTaskClick(id: string) {
    this.taskService.deleteTask(this.selectedListId, id).subscribe((res: any) => {
      this.tasks = this.tasks.filter( (val: { _id: string; }) => val._id !== id);
      console.log(res);
    })
  }

  logout() {
    this.authService.logout()
    console.log('Logout Successfully!!!')
    this._snackBar.open('Logout Successfully', '', {
        duration: 5000,
      });
  }

}
