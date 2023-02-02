import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import { faXmark, faCrown } from '@fortawesome/free-solid-svg-icons';
import {MapboxService, Notary, NowService} from "../../_service/mapbox.service";
import {MatDialog} from "@angular/material/dialog";
import {RateDialogComponent} from "../../../dialogs/rate-dialog/rate-dialog.component";
import {UserService} from "../../../auth/user.service";
import {Observable} from "rxjs";
import {ReviewListComponent} from "../../../reviews/review-list/review-list.component";

@Component({
  selector: 'app-notar-popup-info',
  templateUrl: './notar-popup-info.component.html',
  styleUrls: ['./notar-popup-info.component.scss']
})
export class NotarPopupInfoComponent implements OnInit {

  @Output() closeEvent = new EventEmitter<boolean>();
  @Input() notary: Notary | undefined;
  @ViewChild('reviews') reviewsComp: ReviewListComponent | undefined;
  services$: Observable<NowService> = this.mapService.services$;

  faXmark = faXmark;
  faCrown = faCrown;

  ratings = [
    {
      username: 'User 1',
      ratingValue: 5,
      ratingComment: 'Very good experience!'
    },
    {
      username: 'User 2',
      ratingValue: 1,
      ratingComment: 'Could have been better!'
    },
    {
      username: 'User 3',
      ratingValue: 4,
      ratingComment: 'Nice!'
    },
    {
      username: 'User 4',
      ratingValue: 3,
      ratingComment: 'Very long description! Very long description! Very long description! Very long description!'
    },
    {
      username: 'User 3',
      ratingValue: 4,
      ratingComment: 'Nice!'
    },
    {
      username: 'User 4',
      ratingValue: 3,
      ratingComment: 'Very long description! Very long description! Very long description! Very long description!'
    },
    {
      username: 'User 4',
      ratingValue: 3,
      ratingComment: 'Very long description! Very long description! Very long description! Very long description!'
    }
  ];
  nowUser$ = this.userService.getCurrentUser$();


  constructor(public dialog: MatDialog,
              private userService: UserService,
              private mapService: MapboxService) { }

  ngOnInit(): void {
  }

  onCloseClick() {
    console.log("close clicked!");
    this.closeEvent.emit(true);
  }

  onClaimClick() {
    console.log("claim clicked!");
  }

  onRateClick() {
    const dialogRef = this.dialog.open(RateDialogComponent, {
      data: {type: this.notary?.type},
      width: '400px'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed', result);
      if(!!result?.ratingValue) {
        this.submitRating(result);
      }
    });
  }

  submitRating(rating: {
    ratingValue: number;
    ratingComment: string;
  }) {
    console.log(rating);
    this.ratings.push({
      ...rating,
      username: 'User'
    })
    this.reviewsComp?.addRating({
      ...rating,
      username: this.userService.getCurrentUser().username
    }, this.notary?.id)
  }
}
