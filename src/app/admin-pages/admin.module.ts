//Angular
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

//Modules
import { AppRoutingModule } from '../app-routing.module';
import { MaterialModule } from '../modules/material/material.module';
import { ComponentsModule } from '../components/components.module';

//Components
import { AdminLayoutComponent } from '../layout/admin-layout/admin-layout.component';
import { AdminNavComponent } from '../nav/admin-nav/admin-nav.component';

@NgModule({
  declarations: [
    AdminLayoutComponent,
    AdminNavComponent
  ],
  imports: [
    CommonModule,
    AppRoutingModule,
    MaterialModule,
    ComponentsModule
  ]
})
export class AdminModule { }
