import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from './auth.service';
@Injectable({ providedIn: 'root' })
export class RoleGuard implements CanActivate {
  constructor(private router: Router, private snackBar: MatSnackBar, private auth: AuthService) { }

  canActivate(route: ActivatedRouteSnapshot): boolean {
  const requiredRole = route.data['role'];
  const requiredRoles = route.data['roles']; // Array
  const currentRole = this.auth.getRole();

  if (requiredRole && currentRole === requiredRole) {
    return true;
  }

  if (requiredRoles && requiredRoles.includes(currentRole)) {
    return true;
  }

  this.snackBar.open('Access Denied: Unauthorized Role', 'Close', { duration: 3000 });
  this.router.navigate(['/unauthorized']);
  return false;
}



}
