import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  loginForm: FormGroup;

  constructor(private fb: FormBuilder, private auth: AuthService, private router: Router, private snackBar: MatSnackBar) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  onSubmit() {
  if (this.loginForm.valid) {
    const { email, password } = this.loginForm.value;

    this.auth.login(email, password).subscribe((user) => {
      if (user) {
        const role = user.role;

        if (role === 'Admin') {
          this.router.navigate(['/dashboard']);
        } else if (role === 'ProjectManager') {
          this.router.navigate(['/projects']);
        } else if (role === 'Developer') {
          this.router.navigate(['/tasks']);
        }
      } else {
        this.snackBar.open('Invalid email or password', 'Close', { duration: 3000 });

        this.loginForm.reset();
      }
    });
  }
}

 }

