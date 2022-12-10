import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {DashboardHomeComponent} from './dashboard-home/dashboard-home.component';
import {ProjectDetailComponent} from './project-detail/project-detail.component';
import {LayoutComponent} from '../core/layout/layout.component';

const routes: Routes = [
  {
    path: '', component: LayoutComponent, children: [
      {path: 'home', component: DashboardHomeComponent},
      {path: 'project', component: ProjectDetailComponent}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule {
}
