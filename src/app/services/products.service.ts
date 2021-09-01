import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'; //módulo para poder hacer peticiones a una api
import { Api } from "../config";

@Injectable({
   providedIn: 'root'
})

export class ProductsService {

   private api:string = Api.url;

   constructor(private http:HttpClient) { }

   //Colección de productos
   getData(){
      return this.http.get(`${this.api}products.json`);
   }

   //Colección limitada a partir de un registro hasta tantos registros de productos
   getLimitData(startAt:string, limitToFirst:number){
      return this.http.get(`${this.api}products.json?orderBy="$key"&startAt="${startAt}"&limitToFirst=${limitToFirst}&print=pretty`);
   }

   //Colección filtrada de productos
   getFilterData(orderBy:string, equalTo:string){
      return this.http.get(`${this.api}products.json?orderBy="${orderBy}"&equalTo="${equalTo}"&print=pretty`);
   }

   //Colección filtrada y limitada de productos
   getFilterDataWithLimit(orderBy:string, equalTo:string, limitToFirst:number){
      return this.http.get(`${this.api}products.json?orderBy="${orderBy}"&equalTo="${equalTo}"&limitToFirst=${limitToFirst}&print=pretty`);
   }

   //Colección por búsqueda
   getSearchData(orderBy:string, param:string){
      return this.http.get(`${this.api}products.json?orderBy="${orderBy}"&startAt="${param}"&endAt="${param}\uf8ff"&print=pretty`);
   }

   //id lo que me identifica al documento y value, lo que voy a actualizar
   patchData(id:string, value:object){
      return this.http.patch(`${this.api}products/${id}.json`,value);
   }

}