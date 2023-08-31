import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, delay, map, of, tap } from 'rxjs';
import { Country } from '../interfaces/country.interface';
import { CacheStore } from '../interfaces/cache-store.interface';
import { Region } from '../interfaces/region.type';

@Injectable({providedIn: 'root'})
export class CountriesService {

  private apiUrl: string = 'https://restcountries.com/v3.1';

  private byCapital: string = 'capital';
  private byCountry: string = 'name';
  private byRegion: string = 'region';
  private byAlpha: string = 'alpha';

  public cacheStore: CacheStore = {
    byCapital: { term: '', countries: [] },
    byCountry: { term: '', countries: [] },
    byRegion: { region: '', countries: [] },
  }

  constructor(private http: HttpClient) {
    this.loadFromLocalStorage();
   }

  private getCountriesRequest( url: string ):Observable<Country[]>{
    return this.http.get<Country[]>( url )
      .pipe(
        catchError(() => of([]) ),
        delay(1000)
      );
  }

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
    const url = `${ this.apiUrl }/${ this.byCapital }/${ term }`;
    return this.getCountriesRequest(url)
    .pipe(
      tap( countries => this.cacheStore.byCapital = { term, countries } ),
      tap( () => this.saveToLocalStorage() )
    );
  }

  public searchCountry(term: string):Observable<Country[]>{
    const url = `${ this.apiUrl }/${ this.byCountry }/${ term }`;
    return this.getCountriesRequest(url)
    .pipe(
      tap( countries => this.cacheStore.byCountry = { term, countries } ),
      tap( () => this.saveToLocalStorage() )
    );
  }

  public searchRegion(region: Region):Observable<Country[]>{
    const url = `${ this.apiUrl }/${ this.byRegion }/${ region }`;
    return this.getCountriesRequest(url)
    .pipe(
      tap( countries => this.cacheStore.byRegion = { region, countries } ),
      tap( () => this.saveToLocalStorage() )
    );
  }

  private saveToLocalStorage(){
    localStorage.setItem('cacheStore', JSON.stringify(this.cacheStore));
  }

  private loadFromLocalStorage(){
    if(!localStorage.getItem('cacheStore')) return;
    this.cacheStore = JSON.parse( localStorage.getItem('cacheStore')! );
  }

}
