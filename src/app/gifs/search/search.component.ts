import { Component, ElementRef, ViewChild } from '@angular/core';
import { GifsService } from '../services/gifs.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
})
export class SearchComponent {
  @ViewChild('TextSearch') //es como usar un querySelector
  textSearch!: ElementRef<HTMLInputElement>; // ! es un non-nul assertion operator

  // INYECTAMOS EL SERVICIO EN EL CONSTRUCTOR PARA TENER ACCESO AL ESTADO GLOBAL
  constructor(private gifsService: GifsService) {}

  search() {
    const value = this.textSearch.nativeElement.value;

    this.gifsService.searchGifs(value);

    this.textSearch.nativeElement.value = '';
  }
}
