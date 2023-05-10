import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IdeasListComponent } from './ideas-list/ideas-list.component';
import { IdeasCreateComponent } from './ideas-create/ideas-create.component';
import { IdeasUpdateComponent } from './ideas-update/ideas-update.component';
import { IdeasRoutingModule } from './ideas-routing.module';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    IdeasRoutingModule,
  ],
  declarations: [IdeasListComponent, IdeasCreateComponent, IdeasUpdateComponent]
})
export class IdeasModule { }
