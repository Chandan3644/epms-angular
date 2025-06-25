import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxChartsModule } from '@swimlane/ngx-charts';

import { NotificationListComponent } from './notification-list/notification-list.component';
import { NotificationRoutingModule } from './notification.routing.module';
import { MaterialModule } from '../core/material.module';

@NgModule({
  declarations: [NotificationListComponent],
  imports: [
    CommonModule,
    NotificationRoutingModule,
    NgxChartsModule,
    MaterialModule
  ]
})
export class NotificationModule {}
