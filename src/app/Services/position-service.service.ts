
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable, Subject } from 'rxjs';
import { Position } from '../models/position';
import { PositionClass } from '../models/positionClass';
import { PositionType } from '../models/positionType';
import { POSITION_URL } from '../app.constants';

@Injectable({
  providedIn: 'root'
})

export class PositionService {

  constructor(private http: HttpClient) { }

  private readonly headers:HttpHeaders=new HttpHeaders({'Authorization':"Bearer "+localStorage.getItem("jwt")});


  // private readonly adress ="http://localhost:8087/api/secondaryPositions";
  // private readonly excelAdress="http://localhost:8087/api/secondaryPositionExcels"

  private readonly adress = "https://microserviceposition.azurewebsites.net/api/secondaryPositions";
  private readonly excelAdress = "https://microserviceposition.azurewebsites.net/api/secondaryPositionExcels"

  public getPositions(): Observable<Position[]> {


    let retval$ = new Subject<Position[]>();

    this.http.get<Position[]>(`${POSITION_URL}/secondaryPositions`, {headers:this.headers}).subscribe((clients: Position[]) => {

      retval$.next(clients)

    });

    return retval$.asObservable();
  }

  public getPositionsByObjectName(objectName: string): Observable<Position[]> {
    let retval$ = new Subject<Position[]>();
    this.http.get<Position[]>(`${POSITION_URL}/secondaryPositions/secondaryPositionByObjectName/${objectName}`,{headers:this.headers}).subscribe((positions: Position[]) => {
      retval$.next(positions)
    });
    return retval$.asObservable();
  }

  public createPosition(position: Position): Observable<Position> {

    let retval$ = new Subject<Position>();
    this.http.post<Position>(`${POSITION_URL}/secondaryPositions`, position,{headers:this.headers}).subscribe((helper: Position) => {
      retval$.next(helper);
    });
    return retval$.asObservable();
  }

  public excelImport(formData: FormData) {

    return this.http.post(`${POSITION_URL}/secondaryPositionExcels`, formData,{headers:this.headers});

  }

  public editPosition(position: Position): Observable<Position> {

    let retval$ = new Subject<Position>();

    this.http.put<Position>(`${POSITION_URL}/secondaryPositions`, position,{headers:this.headers}).subscribe((helper: Position) => {

      retval$.next(helper)

    });

    return retval$.asObservable();

  }



  public getOnePosition(position: Position): Observable<Position> {

    let retval$ = new Subject<Position>();

    this.http.get<Position>(`${POSITION_URL}/secondaryPositions/${position.secondaryPositionId}`,{headers:this.headers}).subscribe((helper: Position) => {
      retval$.next(helper)
    });

    return retval$.asObservable();

  }

  public deletePosition(position: Position): Observable<Position> {


    let retval$ = new Subject<Position>();
    this.http.delete<Position>(`${POSITION_URL}/secondaryPositions/${position.secondaryPositionId}`,{headers:this.headers}).subscribe((helper: Position) => {
      retval$.next(helper)
    })


    return retval$.asObservable();
  }

  public getPositionClasses(): Observable<PositionClass[]> {
    let retval$ = new Subject<PositionClass[]>();
    this.http.get<PositionClass[]>(`${POSITION_URL}/positionClasses`,{headers:this.headers}).subscribe((helper: PositionClass[]) => {
      retval$.next(helper);
    });
    return retval$.asObservable();
  }

  public getPositionTypes(): Observable<PositionType[]> {
    let retvla$ = new Subject<PositionType[]>();
    this.http.get<PositionType[]>(`${POSITION_URL}/positionTypes`,{headers:this.headers}).subscribe((helper: PositionType[]) => {
      retvla$.next(helper);
    });
    return retvla$.asObservable();
  }
}


