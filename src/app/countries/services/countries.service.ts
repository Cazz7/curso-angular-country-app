import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, map, of } from 'rxjs';
import { Country } from '../interfaces/country';

@Injectable({providedIn: 'root'})
export class CountriesService {

  private apiUrl: string = 'https://restcountries.com/v3.1';

  private byCapital: string = 'capital';
  private byCountry: string = 'name';
  private byRegion: string = 'region';
  private byAlpha: string = 'alpha';

  constructor(private http: HttpClient) { }

  public searchCountryByAlphaCode(code: string):Observable<Country | null>{
    return this.http.get<Country[]>(`${ this.apiUrl }/${ this.byAlpha }/${ code }`)
      .pipe(
        map( countries => countries.length > 0 ? countries[0]: null ),
        catchError( () => {
          //console.log(error);
          return of(null) // Asi obtendre un objeto vacio del mismo tipo
        })
        );
  }

  public searchCapital(term: string):Observable<Country[]>{
    return this.http.get<Country[]>(`${ this.apiUrl }/${ this.byCapital }/${ term }`)
      .pipe(
        catchError( error => {
          //console.log(error);
          return of([]) // Asi obtendre un objeto vacio del mismo tipo
        })
        );
  }

  public searchCountry(term: string):Observable<Country[]>{
    return this.http.get<Country[]>(`${ this.apiUrl }/${ this.byCountry }/${ term }`)
      .pipe(
        catchError( error => {
          //console.log(error);
          return of([]) // Asi obtendre un objeto vacio del mismo tipo
        })
        );
  }

  public searchRegion(term: string):Observable<Country[]>{
    return this.http.get<Country[]>(`${ this.apiUrl }/${ this.byRegion }/${ term }`)
      .pipe(
        catchError( error => {
          //console.log(error);
          return of([]) // Asi obtendre un objeto vacio del mismo tipo
        })
        );
  }

}
