import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import { faXmark, faCrown } from '@fortawesome/free-solid-svg-icons';
import {Translator} from "../../_service/mapbox.service";
import {RateDialogComponent} from "../../../dialogs/rate-dialog/rate-dialog.component";
import {MatDialog} from "@angular/material/dialog";
import {UserService} from "../../../auth/user.service";

@Component({
  selector: 'app-translator-popup-info',
  templateUrl: './translator-popup-info.component.html',
  styleUrls: ['./translator-popup-info.component.scss']
})
export class TranslatorPopupInfoComponent implements OnInit {

  @Output() closeEvent = new EventEmitter<boolean>();
  @Input() translator: Translator | undefined;
  public nowUser$ = this.userService.getCurrentUser$();

  numbers = Array(20).fill(1);
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

  constructor(public dialog: MatDialog,
              private userService: UserService) { }

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
      data: {type: this.translator?.type},
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
  }
}
