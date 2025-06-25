import { Component } from '@angular/core';
import { AuthService } from './auth/auth.service';
import { NotificationService } from './notifications/notification.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'epms';
  unreadCount = 0;
  userRole: string | null = null;
  isLoggedIn = false;
  sidebarOpen = false;

  constructor(private auth: AuthService, private notificationService: NotificationService) { }

  ngOnInit() {
    this.auth.currentUser$.subscribe(user => {
      this.isLoggedIn = !!user;
      this.userRole = user?.role || null;

      if (this.isLoggedIn) {
        this.notificationService.loadNotifications(); 
        this.notificationService.notifications$.subscribe(notifications => {
          this.unreadCount = notifications.filter(n => !n.read).length;
        });
      }
    });
  }

  loadUnreadCount() {
    this.notificationService.getNotifications().subscribe(notifications => {
      this.unreadCount = notifications.filter(n => !n.read).length;
    });
  }

  toggleSidebar() {
    this.sidebarOpen = !this.sidebarOpen;
  }

  logout() {
    this.auth.logout();
  }
}
