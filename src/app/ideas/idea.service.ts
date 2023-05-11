import { Injectable } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';

export class User {
  userId: number
  username: string
}

export interface Workflow {
  id: number
  name: string
}

export interface Idea {
  id: number,
  summary: string,
  image: string,
  assignees: User[],
  workflowId: number,
  reviewScore: number,
  owner?: User,
  created?: number,
}

@Injectable()
export class IdeaService {
  private apiUrl = 'http://192.168.113.217:3001/api'

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) { }

  getIdeas() {
    return this.http.get(`${this.apiUrl}/ideas`, this.getHeader());
  }

  getIdea(id: number | string) {
    return this.http.get(`${this.apiUrl}/ideas/${id}`, this.getHeader());
  }

  getWorkflows() {
    return this.http.get(`${this.apiUrl}/workflows`, this.getHeader());
  }

  getUsers() {
    return this.http.get(`${this.apiUrl}/users`, this.getHeader());
  }

  createIdea(summary: string, workflowId: number, assignees: number[], image: string) {
    return this.http.post(`${this.apiUrl}/ideas`, {
      summary,
      workflowId,
      assignees,
      image
    }, this.getHeader())
  }

  updateIdea(id: number, summary: string, workflowId: number, assignees: number[], image: string) {
    return this.http.put(`${this.apiUrl}/ideas/${id}`, {
      summary,
      workflowId,
      assignees,
      image
    }, this.getHeader())
  }

  deleteIdea(id: number) {
    return this.http.delete(`${this.apiUrl}/ideas/${id}`, this.getHeader());
  }

  giveReview(id: number, score: number) {
    return this.http.post(`${this.apiUrl}/reviews`, {
      ideaId: id,
      score,
    }, this.getHeader())
  }

  private getHeader() {
    const token = this.authService.getToken()
    return {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      })
    }
  }
}
