import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IdeaService } from '../idea.service';

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.css']
})
export class ReviewComponent implements OnInit {
  @Input() rate: number;
  @Input() ideaId: number;
  @Output() updatedScore = new EventEmitter<number>();

  rating: number = 0;

  constructor(private service: IdeaService) { }

  ngOnInit() {
    this.rating = this.rate;
  }

  setRating(rating: number) {
    if (this.rating > 0) return

    this.service.giveReview(this.ideaId, rating).subscribe(data => {
      const { result: { ideaScore } } = data as any
      this.updatedScore.emit(ideaScore)
      this.rating = rating;
    })
  }
}
