import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';

@Component({
  selector: 'shared-search-box',
  templateUrl: './search-box.component.html',
  styles: [
  ]
})
export class SearchBoxComponent {
  @Input()
  public placeholder: string = '';

  @Output()
  public onValue: EventEmitter<string> = new EventEmitter();

  @ViewChild('txtInput')
  public tagInput!: ElementRef<HTMLInputElement>;


  public term: string = '';

  emitValue( term:string ){
    // Para usar el valor
    this.onValue.emit(term);
  }


  //emitCharacter():void{
  //
  //    this.onValue.emit(this.term);
  //  }

}
