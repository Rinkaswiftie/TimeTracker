import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MaterialModule} from '../material.module';
import {RouterModule} from '@angular/router';
import {authInterceptorProviders} from './interceptors/auth.interceptor.service';
import { LayoutComponent } from './layout/layout.component';
import {HttpClientModule} from '@angular/common/http';


@NgModule({
  declarations: [LayoutComponent],
  imports: [
    HttpClientModule,
    RouterModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [authInterceptorProviders],
  exports: [
    HttpClientModule,
    RouterModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    LayoutComponent
  ]
})
export class CoreModule {
}
