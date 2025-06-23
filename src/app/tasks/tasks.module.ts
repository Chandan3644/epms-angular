import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TasksRoutingModule } from './tasks-routing.module';
import { TaskBoardComponent } from './task-board/task-board.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { TaskFormComponent } from './task-form/task-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../shared/material.module';


@NgModule({
  declarations: [TaskBoardComponent, TaskFormComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    TasksRoutingModule,
    DragDropModule,
    MaterialModule
  ]
})
export class TasksModule {}
