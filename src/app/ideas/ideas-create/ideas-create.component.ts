import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { IdeaService, User, Workflow } from '../idea.service';

@Component({
  selector: 'app-ideas-create',
  templateUrl: './ideas-create.component.html',
  styleUrls: ['./ideas-create.component.css']
})
export class IdeasCreateComponent implements OnInit {
  workflows$: Observable<Workflow[]>;
  users$: Observable<User[]>;
  
  constructor(private service: IdeaService) { }

  ngOnInit() {
    this.workflows$ = this.service.getWorkflows();
    this.users$ = this.service.getUsers();
  }

}
