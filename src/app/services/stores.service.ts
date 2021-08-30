import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'; //módulo para poder hacer peticiones a una api
import { Api } from "../config";

@Injectable({
   providedIn: 'root'
})

export class StoresService {

   private api:string = Api.url;

   constructor(private http: HttpClient) { }

   getData(){
      return this.http.get(`${this.api}stores.json`); //trae la colección de tiendas
   }

   getFilterData(orderBy: string, equalTo: string) {
      return this.http.get(`${this.api}stores.json?orderBy="${orderBy}"&equalTo="${equalTo}"&print=pretty`); //colección filtrada de tiendas
   }

}