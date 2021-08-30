import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Path } from '../../../config';
import { Rating, DinamicRating, DinamicReviews, DinamicPrice, Pagination, Select2Cofig } from '../../../funtions';
import { ProductsService } from '../../../services/products.service';

declare var jQuery:any;
declare var $:any;

@Component({
   selector: 'app-products-showcase',
   templateUrl: './products-showcase.component.html',
   styles: []
})
export class ProductsShowcaseComponent implements OnInit {

   path:string = Path.url;
   products:any[] = [];
   raiting:any[] = [];
   reviews:any[] = [];
   price:any[] = [];
   render:boolean = true;
   preload:boolean = false;
   params:string = null;
   page;
   productFound:number = 0;
   currentRoute:string = null;
   totalPage:number = 0;
   sort;
   sortItems:any[] = [];
   sortValues:any[] = [];

   constructor(private productsService: ProductsService, private activatedRoute: ActivatedRoute) { }

   ngOnInit(): void {

      this.preload = true;

      /*===========================================
      Capturamos el parámetro URL
      =============================================*/

      this.params = this.activatedRoute.snapshot.params["param"].split("&")[0];
      this.sort = this.activatedRoute.snapshot.params["param"].split("&")[1];
      this.page = this.activatedRoute.snapshot.params["param"].split("&")[2];
      this.currentRoute = `products/${this.params}`;

      /*=====================================================
      Evaluamos que el segundo parámetro sea de paginación 
      ======================================================*/

      if(Number.isInteger(Number(this.sort))){

         this.page = this.sort;
         this.sort = undefined;

      }

      /*=============================
      Cuando sort no está definido
      ===============================*/

      if(this.sort == undefined){

         // solo números para la paginación
         this.currentRoute = `products/${this.params}`;

      }else{

         // sort viene con latest, popularity, low, high
         this.currentRoute = `products/${this.params}&${this.sort}`;

      }

      /*===========================================
      Filtrar la data de productos con categoría
      =============================================*/

      this.productsService.getFilterData("category", this.params)
      .subscribe(resp1=>{

         if(Object.keys(resp1).length > 0){

            this.productsFnc(resp1);

         }else{

            /*===========================================
            Para mostrar la subcategoría en breadcrumb
            =============================================*/

            this.productsService.getFilterData("sub_category", this.params)
            .subscribe(resp2 => {
               //se hace un recorrido por el array de objetos de subcategorías
         
               this.productsFnc(resp2);

            })

         }

      })

   }

   /*=============================================================
   Declaramos una función para mostrar el catálogo de productos
   ===============================================================*/

   productsFnc(response){

      this.products = [];

      /*================================================================
      Hacemos un recorrido por la respuesta que nos traiga el filtrado
      ==================================================================*/

      let i;
      let getProducts = [];

      for (i in response) {

         getProducts.push(response[i]);

      }

      /*================================================================
      Definimos el total de productos y la paginación de productos
      ==================================================================*/

      this.productFound = getProducts.length;
      this.totalPage = Math.ceil(this.productFound/6);

      /*================================
      Ordenamos el arreglo de Objetos
      ==================================*/

      if(this.sort == undefined || this.sort == "first"){
         // se ordenan los productos de lo más nuevo a lo más viejo
         getProducts.sort(function(a,b){
            return (b.date_crated - a.date_created)
         })

         this.sortItems = [
            "Sort by first",
            "Sort by latest",
            "Sort by popularity",
            "Sort by price: low to high",
            "Sort by price: high to low"
         ]

         this.sortValues = [
            "first",
            "latest",
            "popularity",
            "high",
            "low"
         ]

      }

      if(this.sort == "latest"){
         // se ordenan los productos de lo más viejo a lo más nuevo
         getProducts.sort(function(a,b){
            return (a.date_crated - b.date_created)
         })

         this.sortItems = [
            "Sort by latest",
            "Sort by first",
            "Sort by popularity",
            "Sort by price: low to high",
            "Sort by price: high to low"
         ]

         this.sortValues = [
            "latest",
            "first",
            "popularity",
            "high",
            "low"
         ]

      }

      if(this.sort == "popularity"){
         // se ordenan los productos por lo más popular
         getProducts.sort(function(a,b){
            return (b.views - a.views)
         })

         this.sortItems = [
            "Sort by popularity",
            "Sort by first",
            "Sort by latest",
            "Sort by price: low to high",
            "Sort by price: high to low"
         ]

         this.sortValues = [
            "popularity",
            "first",
            "latest",
            "low",
            "high"
         ]
      
      }

      if(this.sort == "low"){
         // se ordenan los productos por el precio más bajo al más alto
         getProducts.sort(function(a,b){
            return (a.price - b.price)
         })

         this.sortItems = [
            "Sort by price: low to high",
            "Sort by first",
            "Sort by latest",
            "Sort by popularity",
            "Sort by price: high to low"
         ]

         this.sortValues = [
            "low",
            "first",
            "latest",
            "popularity",
            "high"
         ]

      }

      if(this.sort == "high"){
         // se ordenan los productos por el precio más alto al más bajo
         getProducts.sort(function(a,b){
            return (b.price - a.price)
         })

         this.sortItems = [
            "Sort by price: high to low",
            "Sort by first",
            "Sort by latest",
            "Sort by popularity",
            "Sort by price: low to high"
         ]

         this.sortValues = [
            "high",
            "low",
            "first",
            "latest",
            "popularity"
         ]

      }

      /*============================
      Filtramos hasta 6 productos
      ==============================*/

      getProducts.forEach((product, index)=>{

         /*=============================================
         Evaluamos las 4 condiciones de page
         ===============================================*/

         if(this.page == undefined || isNaN(this.page) || this.page < 1){

            this.page = 1;

         }

         if(this.page > this.totalPage){

            this.page = this.totalPage;
   
         }

         /*=======================================
         Configuramos la paginación desde hasta
         =========================================*/

         let first = Number(index) + ((this.page * 6) - 6);
         let last = 6 * this.page;

         /*=======================================
         Filtramos los productos a mostrar
         =========================================*/

         if(first < last){

            if(getProducts[first] != undefined){

               this.products.push(product);
               //función para el rating dinámico
               this.raiting.push(DinamicRating.fnc(getProducts[first]));
               //función para rellenar las estrellas
               this.reviews.push(DinamicReviews.fnc(this.raiting[index]));
               //función para el precio dinámico y si tiene o no tiene stock
               this.price.push(DinamicPrice.fnc(getProducts[first]));
               this.preload = false;

            }

         }

      })

   }

   /*=====================================================================
   Función que nos avisa cuando termina el renderizado de Angular
   =======================================================================*/

   callback(params) {

      if(this.render){

         this.render = false;

         /*==================================================================================
         Ejecutar funciones globales con respecto a los plugins que utiliza la página
         ====================================================================================*/

         Rating.fnc();
         Pagination.fnc();
         Select2Cofig.fnc();

         /*==============================
         Captura del Select Sort Items
         ================================*/

         $(".sortItems").change(function(){

            //console.log(params); //para obtener el parámetro de la URL
            window.open(`products/${params}&${$(this).val()}`,"_top")

         })

      }

   }

}