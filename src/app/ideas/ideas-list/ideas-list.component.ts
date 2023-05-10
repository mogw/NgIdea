import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Observable } from 'rxjs';
import { Idea, IdeaService } from '../idea.service';
import 'rxjs/add/operator/switchMap';


@Component({
  selector: 'app-ideas-list',
  templateUrl: './ideas-list.component.html',
  styleUrls: ['./ideas-list.component.css']
})
export class IdeasListComponent implements OnInit {
  ideas$: Observable<Idea[]>;
  
  constructor(
    private service: IdeaService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.ideas$ = this.route.paramMap
    .switchMap((params: ParamMap) => {
      return this.service.getIdeas();
    });
  }

}
