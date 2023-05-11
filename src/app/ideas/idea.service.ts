import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export class User {
  constructor(
    public id: number,
    public username: string
  ) { }
}

export class Workflow {
  constructor(
    public id: number,
    public name: string,
  ) { }
}

export class Idea {
  constructor(
    public id: number,
    public summary: string,
    public imgUrl: string,
    public assignees: User[],
    public workflow: Workflow,
    public owner: User,
    public score: number,
    public created: number,
  ) { }
}

let IDEAS = [];
let WORKFLOWS = [];
let USERS = [];

for (let i = 0; i < 10; i++) {
  USERS.push(new User(i, "user-" + i))
}
for (let i = 0; i < 10; i++) {
  WORKFLOWS.push(
    new Workflow(i, "W " + i)
  )
}
for (let i = 0; i < 10; i++) {
  IDEAS.push(
    new Idea(
      i,
      "Idea Summary" + i,
      "https://material.angular.io/assets/img/examples/shiba2.jpg",
      [USERS[0], USERS[1]],
      WORKFLOWS[i],
      USERS[i],
      3,
      Date.now(),
    )
  )
}

@Injectable()
export class IdeaService {
  getIdeas() { return Observable.of(IDEAS); }

  getIdea(id: number | string) {
    return this.getIdeas()
      .map(ideas => ideas.find(idea => idea.id === +id));
  }

  getWorkflows() { return Observable.of(WORKFLOWS) }

  getUsers() { return Observable.of(USERS) }
}
