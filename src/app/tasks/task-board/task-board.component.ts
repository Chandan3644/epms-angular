import { Component, OnInit } from '@angular/core';
import { TaskService } from '../task.service';
import { Task, TaskStatus } from 'src/app/core/models/task.model';
import { ActivatedRoute } from '@angular/router';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { MatDialog } from '@angular/material/dialog';
import { TaskFormComponent } from '../task-form/task-form.component';

@Component({
  selector: 'app-task-board',
  templateUrl: './task-board.component.html',
  styleUrls: ['./task-board.component.scss']
})
export class TaskBoardComponent implements OnInit {
  projectId!: number;
  todo: Task[] = [];
  inProgress: Task[] = [];
  done: Task[] = [];
  statuses: TaskStatus[] = ['To Do', 'In Progress', 'Done'];

  constructor(
    private taskService: TaskService,
    private route: ActivatedRoute,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.projectId = +this.route.snapshot.paramMap.get('projectId')!;
    this.loadTasks();
  }

  loadTasks(): void {
    this.taskService.getTasksByProject(this.projectId).subscribe(tasks => {
      this.todo = tasks.filter(t => t.status === 'To Do');
      this.inProgress = tasks.filter(t => t.status === 'In Progress');
      this.done = tasks.filter(t => t.status === 'Done');
    });
  }

  drop(event: CdkDragDrop<Task[]>, newStatus: Task['status']) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      const movedTask = event.previousContainer.data[event.previousIndex];
      movedTask.status = newStatus;
      this.taskService.updateTask(movedTask.id!, movedTask).subscribe(() => this.loadTasks());
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }
  }

  getList(status: TaskStatus): Task[] {
    switch (status) {
      case 'To Do': return this.todo;
      case 'In Progress': return this.inProgress;
      case 'Done': return this.done;
      default: return [];
    }
  }

  openTaskDialog(task?: Task): void {
    const dialogRef = this.dialog.open(TaskFormComponent, {
      width: '400px',
      data: task ? { ...task } : null
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        if (task) {
          const updatedTask = { ...task, ...result };
          this.taskService.updateTask(task.id!, updatedTask).subscribe(() => this.loadTasks());
        } else {
          const newTask: Omit<Task, 'id'> = {
            projectId: this.projectId,
            ...result
          };
          this.taskService.createTask(newTask).subscribe(() => this.loadTasks());
        }
      }
    });
  }
}
