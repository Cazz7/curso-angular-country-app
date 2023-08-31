import { Component, ElementRef, EventEmitter, Input, Output, ViewChild, OnInit, OnDestroy } from '@angular/core';
import { Subject, Subscription, debounceTime } from 'rxjs';

@Component({
  selector: 'shared-search-box',
  templateUrl: './search-box.component.html',
  styles: [
  ]
})
export class SearchBoxComponent implements OnInit, OnDestroy {


  private debouncer: Subject<string> = new Subject<string>();
  //private debouncer2 = new Subject<string>(); Otra forma de declarar
  private debouncerSubscription?: Subscription;

  @Input()
  public placeholder: string = '';

  @Input()
  public initialValue: string = '';

  @Output()
  public onValue: EventEmitter<string> = new EventEmitter();

  @Output()
  public onDebounce: EventEmitter<string> = new EventEmitter();

  @ViewChild('txtInput')
  public tagInput!: ElementRef<HTMLInputElement>;


  public term: string = '';

  emitValue( term:string ){
    // Para usar el valor
    this.onValue.emit(term);
  }

  onKeyPressed( searchTerm : string ){
    // Próxima emisión
    this.debouncer.next( searchTerm );
  }

  ngOnInit(): void {
    // Hasta que el usuario no deja de emitor valores por
    // un segundo. Ahí manda el valor al suscribe
    this.debouncerSubscription = this.debouncer
    .pipe(
      debounceTime(1000)
     )
    .subscribe(
      value => {
        this.onDebounce.emit( value ) // Emitimos el value del observable
      }
    );
  }

  // Cuando la instancia del componente va a ser destruida
  // cada vez que salgo de la página
  ngOnDestroy(): void {
    this.debouncerSubscription?.unsubscribe( );
  }

}
