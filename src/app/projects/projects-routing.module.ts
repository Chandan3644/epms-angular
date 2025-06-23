import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListComponent } from './list/list.component';
import { FormComponent } from './form/form.component';

 const routes: Routes = [
  { path: '', component: ListComponent },
  { path: 'create', component: FormComponent },
  { path: 'edit/:id', component: FormComponent },
  {
  path: ':projectId/tasks',
  loadChildren: () => import('../tasks/tasks.module').then(m => m.TasksModule)
}

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProjectsRoutingModule {}
