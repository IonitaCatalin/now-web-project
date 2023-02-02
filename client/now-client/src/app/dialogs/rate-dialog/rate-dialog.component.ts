import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-rate-dialog',
  templateUrl: './rate-dialog.component.html',
  styleUrls: ['./rate-dialog.component.scss']
})
export class RateDialogComponent implements OnInit {

  ratingValue = 1;
  comment = '';

  constructor(
    public dialogRef: MatDialogRef<RateDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {type: string;},
  ) { }

  ngOnInit(): void {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  rateThis() {
    this.dialogRef.close({
      ratingValue: this.ratingValue,
      ratingComment: this.comment
    });
  }

  onRatingChanged(ratingValue: number) {
    this.ratingValue = ratingValue;
  }
}
