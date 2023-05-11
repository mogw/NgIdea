import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { IdeasCreateComponent } from './ideas-create/ideas-create.component';
import { IdeasListComponent } from './ideas-list/ideas-list.component';
import { IdeasUpdateComponent } from './ideas-update/ideas-update.component';
import { AuthGuard } from '../auth/auth-guard.service';

const ideasRoutes: Routes = [
  { path: 'ideas', component: IdeasListComponent, pathMatch: 'full', canActivate: [AuthGuard] },
  { path: 'ideas/create', component: IdeasCreateComponent, pathMatch: 'full', canActivate: [AuthGuard] },
  { path: 'ideas/:id/edit', component: IdeasUpdateComponent, canActivate: [AuthGuard] },
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