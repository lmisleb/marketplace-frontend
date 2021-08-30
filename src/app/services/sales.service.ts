import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'; //módulo para poder hacer peticiones a una api
import { Api } from "../config";

@Injectable({
  providedIn: 'root'
})
export class SalesService {

  private api:string = Api.url;

  constructor(private http:HttpClient) { }

  getData(){
    return this.http.get(`${this.api}sales.json`); //trae la colección de ventas
  }

}