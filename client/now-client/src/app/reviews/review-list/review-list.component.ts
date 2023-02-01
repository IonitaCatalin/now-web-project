import {Component, Input, OnInit} from '@angular/core';
import {faUserTie} from '@fortawesome/free-solid-svg-icons';
import {MapboxService} from "../../map/_service/mapbox.service";
import {ReviewService} from "../review.service";

export interface RatingData {
  username: string;
  ratingValue: number;
  ratingComment: string;
}

@Component({
  selector: 'app-review-list',
  templateUrl: './review-list.component.html',
  styleUrls: ['./review-list.component.scss']
})
export class ReviewListComponent implements OnInit {
  faUserTie = faUserTie;

  ratings: RatingData[] = [];
  @Input() providerId: string = '';

  constructor(private reviewService: ReviewService) {
  }

  ngOnInit(): void {
    this.reviewService.getReviewsByProviderId(this.providerId).subscribe(
      _ratings => this.ratings = _ratings
    );
    console.log("Review list init");
  }

  addRating(ratingData: RatingData, id?: string) {
    this.ratings.push(ratingData);
    this.reviewService.createRating(ratingData, id);
  }
}
