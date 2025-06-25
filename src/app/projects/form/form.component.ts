import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProjectService } from '../project.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {
  projectForm!: FormGroup;
  projectId: number | null = null;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private projectService: ProjectService,
    private router: Router
  ) {}

  ngOnInit(): void {
  this.projectForm = this.fb.group({
    name: ['', Validators.required],
    description: [''],
    status: ['Active', Validators.required],
    startDate: ['', Validators.required],
    endDate: [''],
    assignedUsers: [[]]
  });

  this.projectId = +this.route.snapshot.paramMap.get('id')!;
  if (this.projectId) {
    this.projectService.getProjectById(this.projectId).subscribe(project => {
      this.projectForm.patchValue({
        ...project,
        startDate: project.startDate ? new Date(project.startDate) : null,
        endDate: project.endDate ? new Date(project.endDate) : null
      });
    });
  }
}


  submit() {
    if (this.projectForm.invalid) return;
    const data = this.projectForm.value;

    if (this.projectId) {
      this.projectService.updateProject(this.projectId, data).subscribe(() => this.router.navigate(['/projects']));
    } else {
      this.projectService.createProject(data).subscribe(() => this.router.navigate(['/projects']));
    }
  }
}
