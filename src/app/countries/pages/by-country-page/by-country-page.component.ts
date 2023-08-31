import { Component, OnInit } from '@angular/core';
import { Country } from '../../interfaces/country.interface';
import { CountriesService } from '../../services/countries.service';

@Component({
  selector: 'app-by-country-page',
  templateUrl: './by-country-page.component.html',
  styles: [
  ]
})
export class ByCountryPageComponent implements OnInit {

  public countries: Country[] = [];

  public isLoading: boolean = false;
  public initialValue: string = '';

  constructor( private countriesServices: CountriesService ){

  }

  searchByCountry( term:string ):void{
    this.countriesServices.searchCountry( term )
    .subscribe( countries => {
      this.countries = countries;
      this.isLoading = false;
    } );
  }

  ngOnInit(): void {
    this.countries = this.countriesServices.cacheStore.byCountry.countries;
    this.initialValue = this.countriesServices.cacheStore.byCountry.term;
  }

}
