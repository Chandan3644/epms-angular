import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { User, UserRole } from 'src/app/core/models/user.model';
import { UserService } from '../user.service';


@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss']
})
export class UserFormComponent implements OnInit {
onCancel() {
throw new Error('Method not implemented.');
}
  userForm!: FormGroup;
  userId!: number;
  isEditMode = false;
  roles: UserRole[] = ['Admin', 'Project Manager', 'Developer'];

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.userForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      role: ['', Validators.required],
      password: ['', Validators.required]
    });

    this.userId = +this.route.snapshot.paramMap.get('id')!;
    this.isEditMode = !!this.userId;

    if (this.isEditMode) {
      this.userService.getUserById(this.userId).subscribe((user) => {
        this.userForm.patchValue(user);
        // Password shouldn't be shown for editing (optional)
        this.userForm.get('password')?.setValue('');
      });
    }
  }

  onSubmit() {
    if (this.userForm.invalid) return;

    const formData: User = this.userForm.value;

    if (this.isEditMode) {
      this.userService.updateUser(this.userId, formData).subscribe(() => {
        alert('User updated successfully!');
        this.router.navigate(['/users']);
      });
    } else {
      this.userService.createUser(formData).subscribe(() => {
        alert('User created successfully!');
        this.router.navigate(['/users']);
      });
    }
  }
}
