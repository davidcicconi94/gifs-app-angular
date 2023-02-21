import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import { Result, SearchGifs } from '../interfaces/gifs.interface';

@Injectable({
  providedIn: 'root', // eleva el servicio a un nivel GLOBAL
})
export class GifsService {
  public apiKey: string = 'V5D5BZhA1hV37EJXHgKQaqwCIcf7rIDA';
  public baseUrl: string = 'https://api.giphy.com/v1/gifs';

  private _background: string[] = [];
  public results: Result[] = [];

  get background() {
    return [...this._background];
  }

  constructor(private http: HttpClient) {
    if (localStorage.getItem('background'))
      this._background = JSON.parse(localStorage.getItem('background')!);

    if (localStorage.getItem('results'))
      this.results = JSON.parse(localStorage.getItem('results')!);
  }

  searchGifs(query: string) {
    // Paso los strings a minusculas, para que no haya problemas al agregar el mismo elemento pero de diferente capital
    query = query.trim().toLowerCase();

    if (!this._background.includes(query)) {
      this._background.unshift(query); // unshift agrega uno o mas elementos al inicio del array

      // Limito el array a 5 elementos, para no hacer un historial de infinitos items
      this._background = this._background.splice(0, 10);

      localStorage.setItem('background', JSON.stringify(this._background));
    }

    // Parámetros para la URL
    const params = new HttpParams()
      .set('api_key', this.apiKey)
      .set('limit', '10')
      .set('q', query);

    // Estas peticiones http retornan Observables
    this.http
      .get<SearchGifs>(`${this.baseUrl}/search`, { params })
      .subscribe((res: SearchGifs) => {
        this.results = res.data;

        localStorage.setItem('results', JSON.stringify(this.results));
      });
  }
}
