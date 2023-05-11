import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Idea, Workflow } from '../idea.service';
import { Router } from '@angular/router';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-idea',
  templateUrl: './idea.component.html',
  styleUrls: ['./idea.component.css']
})
export class IdeaComponent implements OnInit {
  @Input() idea: Idea
  @Input() workflows: Workflow[]
  @Output() deleteIdea = new EventEmitter<number>()
  workflowName: string
  score: number;
  currentUserId: number;


  constructor(
    private router: Router,
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.score = this.idea.reviewScore
    const workflow = this.workflows.find(w => w.id == this.idea.workflowId)
    this.workflowName =  workflow ? workflow.name : ''
    this.currentUserId = +this.authService.getCurrentUserId()
  }

  delete() {
    this.deleteIdea.emit(this.idea.id)
  }

  edit() {
    this.router.navigate(['/ideas', this.idea.id, 'edit'])
  }

  updatedScore(newScore: number) {
    this.score = newScore
  }
}
