import { Component } from '@angular/core';
import { Color, ScaleType } from '@swimlane/ngx-charts';
import { Task } from 'src/app/core/models/task.model';
import { ProjectService } from 'src/app/projects/project.service';
import { TaskService } from 'src/app/tasks/task.service';
import { UserService } from 'src/app/users/user.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent {
  userName = 'User';
  selectedProjectId = 1; 

  kpis = {
    totalProjects: 0,
    activeUsers: 0,
    overdueTasks: 0
  };

  chartData = [
    { name: 'To Do', value: 0 },
    { name: 'In Progress', value: 0 },
    { name: 'Done', value: 0 }
  ];

  view: [number, number] = [500, 300];
  showLegend = true;
  showLabels = true;

  colorScheme: Color = {
    name: 'customScheme',
    selectable: true,
    group: ScaleType.Ordinal,
    domain: ['#007bff', '#ffc107', '#28a745']
  };

  constructor(
    private projectService: ProjectService,
    private userService: UserService,
    private taskService: TaskService
  ) {}

  ngOnInit(): void {
    const user = localStorage.getItem('user');
    if (user) {
      const parsedUser = JSON.parse(user);
      this.userName = parsedUser.name || 'User';
    }
    this.loadDashboardData();
  }

  loadDashboardData(): void {
    // 1. Total projects
    this.projectService.getProjects().subscribe(projects => {
      this.kpis.totalProjects = projects.length;
    });

    // 2. Active users
    this.userService.getUsers().subscribe(users => {
      this.kpis.activeUsers = users.filter(u => u.active).length;
    });

    // 3. Tasks by selected project
    this.taskService.getTasksByProject(this.selectedProjectId).subscribe((tasks: Task[]) => {
      const today = new Date();

      this.kpis.overdueTasks = tasks.filter(t => {
        const dueDate = new Date(t.dueDate);
        return dueDate < today && t.status !== 'Done';
      }).length;

      const statusCount = {
        'To Do': 0,
        'In Progress': 0,
        'Done': 0
      };

      tasks.forEach(t => {
        if (statusCount[t.status] !== undefined) {
          statusCount[t.status]++;
        }
      });

      this.chartData = [
        { name: 'To Do', value: statusCount['To Do'] },
        { name: 'In Progress', value: statusCount['In Progress'] },
        { name: 'Done', value: statusCount['Done'] }
      ];
    });
  }
}
