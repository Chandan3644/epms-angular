import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { Notification } from '../core/models/notification.model';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private apiUrl = 'http://localhost:3000/notifications';

  private _notifications$ = new BehaviorSubject<Notification[]>([]);
  notifications$ = this._notifications$.asObservable(); 

  constructor(private http: HttpClient) {}

  loadNotifications() {
    this.http.get<Notification[]>(this.apiUrl).subscribe(data => {
      this._notifications$.next(data);
    });
  }

  getNotifications(): Observable<Notification[]> {
    return this.http.get<Notification[]>(this.apiUrl);
  }

  addNotification(notification: Notification): Observable<Notification> {
    return this.http.post<Notification>(this.apiUrl, notification);
  }

  markAsRead(id: string): Observable<any> {
    return this.http.patch(`${this.apiUrl}/${id}`, { read: true }).pipe(
      tap(() => this.loadNotifications())
    );
  }

  deleteNotification(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`).pipe(
      tap(() => this.loadNotifications())
    );
  }
}
