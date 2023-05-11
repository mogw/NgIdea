import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Idea, IdeaService, User, Workflow } from '../idea.service';
import 'rxjs/add/operator/switchMap';

@Component({
  selector: 'app-ideas-update',
  templateUrl: './ideas-update.component.html',
  styleUrls: ['./ideas-update.component.css']
})
export class IdeasUpdateComponent implements OnInit, OnDestroy {
  idea: Idea;
  users: User[];
  workflows: Workflow[];
  assigneeIds: number[];
  workflowId: number;
  summary: string;
  imgUrl: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private service: IdeaService,
  ) { }

  ngOnInit() {
    this.route.paramMap
      .switchMap((params: ParamMap) =>
        this.service.getIdea(params.get('id')))
      .subscribe(idea => {
        this.idea = idea
        this.assigneeIds = idea.assignees.map(user => user.id)
        this.workflowId = idea.workflow.id
        this.summary = idea.summary
        this.imgUrl = idea.imgUrl
      });
    this.service.getUsers().subscribe(users => this.users = users);
    this.service.getWorkflows().subscribe(workflows => this.workflows = workflows)
  }

  ngOnDestroy() {
  }

  cancel() {
    this.router.navigate(['/ideas']);
  }

  save() {
    console.log('assginees', this.assigneeIds)
    console.log('workflowId', this.workflowId)
    console.log('summary', this.summary)
  }
}
