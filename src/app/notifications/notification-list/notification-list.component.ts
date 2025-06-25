import { Component, OnInit } from '@angular/core';
import { NotificationService } from '../notification.service';
import { Notification } from 'src/app/core/models/notification.model';

@Component({
  selector: 'app-notification-list',
  templateUrl: './notification-list.component.html',
  styleUrls: ['./notification-list.component.scss']
})
export class NotificationListComponent implements OnInit {
  notifications: Notification[] = [];

  constructor(private notificationService: NotificationService) {}

  ngOnInit(): void {
    this.loadNotifications();
  }

  loadNotifications() {
    this.notificationService.getNotifications().subscribe(data => {
      this.notifications = data;
    });
  }

  markRead(id: string) {
    this.notificationService.markAsRead(id).subscribe(() => this.loadNotifications());
  }
}
