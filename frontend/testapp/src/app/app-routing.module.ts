import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { ErrorComponent } from './error/error.component';
import { ListWaresComponent } from './list-wares/list-wares.component';
import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout.component';
import { MyListWareComponent } from './my-list-ware/my-list-ware.component';
import { AuthGuard } from './services/auth.guard';
import { UserFormComponent } from './user-form/user-form.component';
import { WareComponent } from './ware/ware.component';

const routes: Routes = [
  { path: '', component: LogoutComponent },
  { path: 'register', component: UserFormComponent },
  { path: 'login', component: LoginComponent },
  { path: 'new-ware', component: WareComponent, canActivate: [AuthGuard] },
  { path: 'list-wares', component: ListWaresComponent, canActivate: [AuthGuard] },
  { path: 'my-list', component: MyListWareComponent, canActivate: [AuthGuard] },

  { path: '**', component: ErrorComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
