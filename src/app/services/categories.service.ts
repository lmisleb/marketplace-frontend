import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'; //módulo para poder hacer peticiones a una api
import { Api } from "../config";

@Injectable({
   providedIn: 'root'
})
export class CategoriesService {

   private api:string = Api.url;

   constructor( private http:HttpClient ) { }

   getData(){
	   return this.http.get(`${this.api}categories.json`); //trae la colección de categories
   }

   getFilterData(orderBy:string, equalTo:string){
      return this.http.get(`${this.api}categories.json?orderBy="${orderBy}"&equalTo="${equalTo}"&print=pretty`); //trae la colección de categories filtrada
   }

   patchData(id:string, value:object){
      return this.http.patch(`${this.api}categories/${id}.json`,value); //id lo que me identifica al documento y value, lo que voy a actualizar
   }

}