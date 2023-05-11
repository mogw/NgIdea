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
  image: string;
  ideaImage: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private service: IdeaService,
  ) { }

  ngOnInit() {
    this.route.paramMap
      .switchMap((params: ParamMap) =>
        this.service.getIdea(params.get('id')))
      .subscribe(data => {
        const { result: idea } = data as any
        this.idea = idea
        this.ideaImage = `http://192.168.113.217:3001/api/image/${idea.image}`

        this.assigneeIds = this.idea.assignees.map(a => a.userId)
        this.workflowId = this.idea.workflowId
        this.summary = this.idea.summary
        this.image = this.idea.image
      });

    this.service.getWorkflows().subscribe((data) => {
      const { result: workflows } = data as any
      this.workflows = workflows
    })
    this.service.getUsers().subscribe((data) => {
      const { result: users } = data as any
      this.users = users
    })
  }

  ngOnDestroy() {
  }

  cancel() {
    this.router.navigate(['/ideas']);
  }

  save() {
    this.service.updateIdea(this.idea.id, this.summary || '', this.workflowId, this.assigneeIds || [], this.idea.image).subscribe(data => {
      this.router.navigate(['/ideas']);
    }, error => {
      console.log('error', error)
    })
  }
}
