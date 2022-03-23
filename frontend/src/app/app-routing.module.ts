import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TaskViewComponent } from './pages/taskview/taskview.component';
import { NewListComponent } from './pages/new-list/new-list.component';
import { NewTaskComponent } from './pages/new-task/new-task.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { SignupPageComponent } from './pages/signup-page/signup-page.component';
import { EditListComponent } from './pages/edit-list/edit-list.component';
import { EditTaskComponent } from './pages/edit-task/edit-task.component';
import { AuthguardService } from './authguard.service';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },

  { path: 'new-list',canActivate:[AuthguardService], component: NewListComponent },
  { path: 'edit-list/:listId',canActivate:[AuthguardService], component: EditListComponent },
  { path: 'login', component: LoginPageComponent },
  { path: 'signup', component: SignupPageComponent },
  { path: 'lists',canActivate:[AuthguardService], component: TaskViewComponent },
  { path: 'lists/:listId',canActivate:[AuthguardService], component: TaskViewComponent },
  { path: 'lists/:listId/new-task',canActivate:[AuthguardService], component: NewTaskComponent },
  { path: 'lists/:listId/edit-task/:taskId',canActivate:[AuthguardService], component: EditTaskComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
