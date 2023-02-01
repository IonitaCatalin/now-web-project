import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {map, Observable} from "rxjs";
import {RatingData} from "./review-list/review-list.component";

@Injectable({
  providedIn: 'root'
})
export class ReviewService {

  constructor(private http: HttpClient) {
  }

  getReviewsByProviderId(providerId: string): Observable<RatingData[]> {
    return this.http.get<{
      username: string;
      ratingValue: string;
      ratingComment: string;
    }[]>(
      `${environment.BASE_URL}/now/rating`, {
        params: {
          id: providerId
        }
      }
    ).pipe(map(_val => {
      return _val.map(x => ({
        username: x.username,
        ratingValue: parseInt(x.ratingValue),
        ratingComment: x.ratingComment
      }))
    }));
  }

  createRating(ratingData: RatingData, id?: string) {
    this.http.post(`${environment.BASE_URL}/now/rating`, {
      ...ratingData,
      id
    }).subscribe(_ => console.log("rated!"));
  }
}
