import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IdeasListComponent } from './ideas-list/ideas-list.component';
import { IdeasCreateComponent } from './ideas-create/ideas-create.component';
import { IdeasUpdateComponent } from './ideas-update/ideas-update.component';
import { IdeasRoutingModule } from './ideas-routing.module';
import { SharedModule } from '../shared/shared.module';
import { IdeaComponent } from './ideas-list/idea.component';
import { IdeaService } from './idea.service';
import { AuthService } from '../auth/auth.service';
import { AuthGuard } from '../auth/auth-guard.service';
import { ReviewComponent } from './review/review.component';
import { PhotoComponent } from './photo/photo.component';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    InfiniteScrollModule,
    IdeasRoutingModule,
  ],
  declarations: [
    IdeaComponent,
    IdeasListComponent,
    IdeasCreateComponent,
    IdeasUpdateComponent,
    ReviewComponent,
    PhotoComponent
  ],
  providers: [
    AuthService,
    AuthGuard,
    IdeaService,
  ]
})
export class IdeasModule { }
