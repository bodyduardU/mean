import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EmplyeesListComponent } from './emplyees-list/emplyees-list.component';
import { AddEmployeesComponent } from './add-employees/add-employees.component';
import { EditEmployeeComponent } from './edit-employee/edit-employee.component';
import { EmployeeFormComponent } from './employee-form/employee-form.component';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';

@NgModule({
  declarations: [
    AppComponent,
    EmplyeesListComponent,
    AddEmployeesComponent,
    EditEmployeeComponent,
    EmployeeFormComponent,
    RegisterComponent,
    LoginComponent,
  ],

  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
