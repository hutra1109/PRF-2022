import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserFormComponent } from './user-form/user-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from './material.module';
import { ErrorComponent } from './error/error.component';
import { WareComponent } from './ware/ware.component';
import { LoginComponent } from './login/login.component';
import { ListWaresComponent } from './list-wares/list-wares.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { LogoutComponent } from './logout/logout.component';
import { MyListWareComponent } from './my-list-ware/my-list-ware.component';


@NgModule({
  declarations: [
    AppComponent,
    UserFormComponent,
    ErrorComponent,
    WareComponent,
    LoginComponent,
    ListWaresComponent,
    LogoutComponent,
    MyListWareComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule, 
    BrowserAnimationsModule,
    MatToolbarModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
