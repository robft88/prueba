import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UtilService {

  constructor() { }

  public setAltAttribute(name: string): string {
    return name.toLowerCase().replace(/ /gi, '-').normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  }
}
