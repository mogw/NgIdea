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
  page: number = 0
  hasMoreData: boolean = true
  ideas: Idea[] = [];
  workflows: Workflow[];
  
  constructor(
    private service: IdeaService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.loadIdeas()

    this.service.getWorkflows().subscribe((data) => {
      const { result: workflows } = data as any
      this.workflows = workflows
    })
  }

  loadIdeas() {
    this.service.getIdeas(this.page).subscribe((data) => {
      const { result: ideas } = data as any
      if (ideas.length > 0) {
        const loadedIdeas = ideas.map(idea => {
          idea.image = `${environment.apiUrl}/image/${idea.image || environment.defaultImg}`
          idea.createdAt = new Date(idea.createdAt)
          return idea
        })
        console.log('loadedIdeas', loadedIdeas)
        this.ideas = this.ideas.concat(loadedIdeas)
        this.page++;
      } else {
        this.hasMoreData = false;
      }
    })
  }

  deleteIdea(id: number) {
    this.service.deleteIdea(id).subscribe(() => {
      this.ideas = this.ideas.filter(idea => idea.id !== id)
    })
  }

  onScrollDown() {
    if (this.hasMoreData) {
      this.loadIdeas()
    }
  }

  onScrollUp() {

  }
}
