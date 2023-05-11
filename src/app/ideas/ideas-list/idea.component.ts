import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Idea, Workflow } from '../idea.service';

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

  constructor() { }

  ngOnInit() {
    const workflow = this.workflows.find(w => w.id = this.idea.workflowId)
    this.workflowName =  workflow ? workflow.name : ''
  }

  delete() {
    this.deleteIdea.emit(this.idea.id)
  }
}
