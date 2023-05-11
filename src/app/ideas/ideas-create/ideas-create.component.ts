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
  
  constructor(
    private service: IdeaService,
    private router: Router,
  ) { }

  ngOnInit() {
    this.service.getWorkflows().subscribe(workflows => this.workflows = workflows);
    this.service.getUsers().subscribe(users => this.users = users);
  }

  cancel() {
    this.router.navigate(['/ideas']);
  }

  save() {}
}
