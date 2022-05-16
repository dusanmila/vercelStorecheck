import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError, Subject } from 'rxjs';
import { Feedback } from '../models/feedback.model';
import { FeedbackCategory } from '../models/feedbackCategory';




@Injectable({
  providedIn: 'root'
})
export class FeedbackService {

  constructor(private http: HttpClient) { }

  private readonly adress ="http://localhost:8083/feedback";
  private readonly feedbackAdress ="http://localhost:8088/api";



  public getFeedbacks(): Observable<Feedback[]>{

    let retval$ = new Subject<Feedback[]>();


    this.http.get<Feedback[]>(`${this.feedbackAdress}/feedbacks`).subscribe((feedbacks: Feedback[]) => {

      retval$.next(feedbacks)

    });

    return retval$.asObservable();
  }

  public getResolvedFeedbacks(): Observable<Feedback[]>{

    let retval$ = new Subject<Feedback[]>();


    this.http.get<Feedback[]>(`${this.feedbackAdress}/feedbacks/resolvedFeedbacks`).subscribe((feedbacks: Feedback[]) => {

      retval$.next(feedbacks)

    });

    return retval$.asObservable();
  }

  public getUnresolvedFeedbacks(): Observable<Feedback[]>{

      let retval$ = new Subject<Feedback[]>();
      this.http.get<Feedback[]>(`${this.feedbackAdress}/feedbacks/unresolvedFeedbacks`).subscribe((feedbacks: Feedback[]) => {
      retval$.next(feedbacks);

    });

    return retval$.asObservable();
  }

  public getUnresolvedFeedbacksByObject(objectName: string) {
    let retval$ = new Subject<Feedback[]>();
    this.http.get<Feedback[]>(`http://localhost:8088/api/feedbacks/unresolvedFeedbacks/${objectName}`).subscribe((feedbacks: Feedback[]) => {
      retval$.next(feedbacks);
    });
    return retval$.asObservable();
  }

  public getResolvedFeedbacksByObject(objectName: string) {
    let retval$ = new Subject<Feedback[]>();
    this.http.get<Feedback[]>(`http://localhost:8088/api/feedbacks/resolvedFeedbacks/${objectName}`).subscribe((feedbacks: Feedback[]) => {
      retval$.next(feedbacks);
    });
    return retval$.asObservable();
  }

  public createFeedback(feedback:Feedback):Observable<Feedback>{

    let retval$ = new Subject<Feedback>();

    this.http.post<Feedback>(`https://microservicefeedback.azurewebsites.net/api/feedbacks`, feedback).subscribe((helper: Feedback) => {
    //this.http.post<Feedback>(`${this.feedbackAdress}/feedbacks`, feedback).subscribe((helper: Feedback) => {

      retval$.next(helper)

    });

    return retval$.asObservable();
  }


  public editFeedback(feedback:Feedback):Observable<Feedback>{

    let retval$ = new Subject<Feedback>();

    this.http.put<Feedback>(`${this.feedbackAdress}/feedbacks/${feedback.img}`, feedback).subscribe((helper: Feedback) => {

      retval$.next(helper)

    });

    return retval$.asObservable();


  }

  public getOneFeedback(feedback:Feedback):Observable<Feedback>{

    let retval$ = new Subject<Feedback>();

      this.http.get<Feedback>(`${this.feedbackAdress}/feedbacks/getOneFeedback/${feedback.img}`).subscribe((helper: Feedback) => {
        retval$.next(helper)

    });

    return retval$.asObservable();

  }

  public getFeedbackCategories(): Observable<FeedbackCategory[]> {
    let retval$ = new Subject<FeedbackCategory[]>();
    this.http.get<FeedbackCategory[]>('http://localhost:8088/api/feedbackCategories').subscribe((helper: FeedbackCategory[]) => {
      retval$.next(helper);
    });
    return retval$.asObservable();
  }

}