import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { TaskService } from 'src/app/task.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-edit-list',
  templateUrl: './edit-list.component.html',
  styleUrls: ['./edit-list.component.scss']
})
export class EditListComponent implements OnInit {

  constructor(private route: ActivatedRoute, private taskService: TaskService, private router: Router, private _snackBar: MatSnackBar) { }

  listId: any;


  ngOnInit() {
    this.route.params.subscribe(
      (params: Params) => {
        this.listId = params['listId'];
      }
    )
  }

  updateList(title: string) {
    if (title.trim() === "") {
      this._snackBar.open('Enter the Updated List name','',{
        duration:5000,
      })
    } else {
      this.taskService.updateList(this.listId, title).subscribe(() => {
        this.router.navigate(['/lists', this.listId]);
      })
    }
  }
}
