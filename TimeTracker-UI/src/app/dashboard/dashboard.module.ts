import {NgModule} from '@angular/core';
import {DashboardHomeComponent} from './dashboard-home/dashboard-home.component';
import {ProjectDetailComponent} from './project-detail/project-detail.component';
import {DashboardRoutingModule} from './dashboard.routing.module';
import {CoreModule} from '../core/core.module';
import {AddProjectDialogComponent} from './add-project-dialog/add-project-dialog.component';
import {CommonModule} from '@angular/common';

@NgModule({
  declarations: [DashboardHomeComponent, ProjectDetailComponent, AddProjectDialogComponent],
    imports: [
        DashboardRoutingModule,
        CoreModule,
        CommonModule
    ],
  exports: [
    DashboardRoutingModule
  ]
})
export class DashboardModule {
}
