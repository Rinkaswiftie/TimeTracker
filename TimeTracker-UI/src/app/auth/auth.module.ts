import {NgModule} from '@angular/core';
import {LoginComponent} from './login/login.component';
import {AuthRoutingModule} from './auth.routing.module';
import {CoreModule} from '../core/core.module';
import { SignupComponent } from './signup/signup.component';

@NgModule({
  declarations: [LoginComponent, SignupComponent],
  imports: [AuthRoutingModule, CoreModule],
  exports: [AuthRoutingModule]
})
export class AuthModule {

}
