import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Idea, IdeaService, Workflow } from '../idea.service';
import 'rxjs/add/operator/switchMap';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-ideas-list',
  templateUrl: './ideas-list.component.html',
  styleUrls: ['./ideas-list.component.css']
})
export class IdeasListComponent implements OnInit {
  ideas: Idea[];
  workflows: Workflow[];
  
  constructor(
    private service: IdeaService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.getIdeas()

    this.service.getWorkflows().subscribe((data) => {
      const { result: workflows } = data as any
      this.workflows = workflows
    })
  }

  getIdeas() {
    this.service.getIdeas().subscribe((data) => {
      const { result: ideas } = data as any
      this.ideas = ideas.map(idea => {
        idea.image = `${environment.apiUrl}/image/${idea.image || environment.defaultImg}`
        return idea
      })
      console.log('ideas', ideas)
    })
  }

  deleteIdea(id: number) {
    this.service.deleteIdea(id).subscribe(() => this.getIdeas())
  }
}
