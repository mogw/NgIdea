import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { IdeasCreateComponent } from './ideas-create/ideas-create.component';
import { IdeasListComponent } from './ideas-list/ideas-list.component';
import { IdeasUpdateComponent } from './ideas-update/ideas-update.component';

const ideasRoutes: Routes = [
  { path: 'ideas', component: IdeasListComponent, pathMatch: 'full' },
  { path: 'ideas/:id/edit', component: IdeasUpdateComponent },
  { path: 'ideas/:id/create', component: IdeasCreateComponent }
];

@NgModule({
  imports: [
    RouterModule.forChild(ideasRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class IdeasRoutingModule { }