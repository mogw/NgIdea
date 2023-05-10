import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Idea, IdeaService } from '../idea.service';
import 'rxjs/add/operator/switchMap';

@Component({
  selector: 'app-ideas-update',
  templateUrl: './ideas-update.component.html',
  styleUrls: ['./ideas-update.component.css']
})
export class IdeasUpdateComponent implements OnInit {
  idea$: Observable<Idea>;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private service: IdeaService,
  ) { }

  ngOnInit() {
    this.idea$ = this.route.paramMap
      .switchMap((params: ParamMap) =>
        this.service.getIdea(params.get('id')));
  }
}
