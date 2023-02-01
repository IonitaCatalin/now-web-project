import {Component, Input, OnInit} from '@angular/core';
import {faUserTie} from '@fortawesome/free-solid-svg-icons';

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

  @Input() ratings: RatingData[] = [];

  constructor() { }

  ngOnInit(): void {
    console.log("Review list init");
  }

}
