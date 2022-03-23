import { Component, OnInit } from '@angular/core';
import { TaskService } from 'src/app/task.service';
import { Router } from '@angular/router';
import { List } from 'src/app/models/list.model';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-new-list',
  templateUrl: './new-list.component.html',
  styleUrls: ['./new-list.component.scss']
})
export class NewListComponent implements OnInit {
  constructor(private taskService: TaskService, private router: Router, private _snackBar: MatSnackBar) { }
  ngOnInit() {
  }
  createList(title: string) {
    if (title.trim() === "") {
      this._snackBar.open('List Name Empty','',{
        duration:5000,
      })
    } else {
      this.taskService.createList(title).subscribe((list: any) => {
      // Now we navigate to /lists/task._id
      this.router.navigate([ '/lists', list._id ]);
      });
      this._snackBar.open('List Created Successfully', '', {
        duration: 5000,
      });
    }
  }
}
