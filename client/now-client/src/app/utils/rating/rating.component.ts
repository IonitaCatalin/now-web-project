import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-rating',
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.scss']
})
export class RatingComponent implements OnInit {

  @Input() ratingLevel = 1;
  @Input() isReadonly = false;
  @Output() ratingChanged = new EventEmitter<number>();

  constructor() {
  }

  ngOnInit(): void {

  }

  computeStars() {
    const newStars = [];
    for (let i = 1; i <= 5; i++) {
      newStars.push(this.ratingLevel >= i ? 'star' : 'star_border');
    }
    return newStars;
  }

  changeRating(number: number) {
    if (this.isReadonly) {
      return;
    }
    this.ratingLevel = number;
    this.computeStars();
    this.ratingChanged.emit(number);
  }
}
