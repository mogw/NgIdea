import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { IdeaService, User, Workflow } from '../idea.service';

@Component({
  selector: 'app-ideas-create',
  templateUrl: './ideas-create.component.html',
  styleUrls: ['./ideas-create.component.css']
})
export class IdeasCreateComponent implements OnInit {
  workflows: Workflow[];
  users: User[];
  workflowId: number;
  assingeeIds: number[];
  summary: string;
  image: string;

  constructor(
    private service: IdeaService,
    private router: Router,
  ) { }

  ngOnInit() {
    this.service.getWorkflows().subscribe((data) => {
      const { result: workflows } = data as any
      this.workflows = workflows
    })
    this.service.getUsers().subscribe((data) => {
      const { result: users } = data as any
      this.users = users
    })
  }

  cancel() {
    this.router.navigate(['/ideas']);
  }

  save() {
    this.service.createIdea(this.summary || '', this.workflowId, this.assingeeIds || [], this.image || '').subscribe(data => {
      this.router.navigate(['/ideas']);
    }, error => {
      console.log('error', error)
    })
  }

  updateImage(image) {
    this.image = image
  }
}
