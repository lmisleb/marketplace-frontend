import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Path } from '../../../config';
import { OwlCarouselConfig, CarouselNavigation, Rating, DinamicRating, DinamicReviews, DinamicPrice } from '../../../funtions';
import { ProductsService } from '../../../services/products.service';

@Component({
   selector: 'app-best-sales-item',
   templateUrl: './best-sales-item.component.html',
   styleUrls: []
})
export class BestSalesItemComponent implements OnInit {

   path:string = Path.url;
   bestSalesItem:any[] = [];
   render:boolean = true;
   raiting:any[] = [];
   reviews:any[] = [];
   price:any[] = [];
   preload:boolean = false;

   constructor(private productsService: ProductsService, private activatedRoute: ActivatedRoute) { }

   ngOnInit(): void {

      this.preload = true;

      /*===========================================
      Capturamos el parámetro URL
      =============================================*/

      let params = this.activatedRoute.snapshot.params["param"].split("&")[0];

      /*===========================================
      Filtrar la data de productos con categoría
      =============================================*/
      
      this.productsService.getFilterData("category", params)
      .subscribe(resp1=>{
         //console.log("resp1:", resp1);

         if(Object.keys(resp1).length > 0){

            this.productsFnc(resp1);

         }else{

            /*===========================================
            Para mostrar la subcategoría en breadcrumb
            =============================================*/

            this.productsService.getFilterData("sub_category", params)
            .subscribe(resp2 => {
               //se hace un recorrido por el array de objetos de subcategorías
         
               this.productsFnc(resp2);
   
            })

         }

      })

   }

   /*=======================================================
   Declaramos una función para mostrar las mejores ventas
   =========================================================*/

   productsFnc(response){

      this.bestSalesItem = [];

      /*================================================================
      Hacemos un recorrido por la respuesta que nos traiga el filtrado
      ==================================================================*/

      let i;
      let getSales = [];

      for (i in response) {

         getSales.push(response[i]);

      }

      /*========================================================
      Ordenamos de mayor a menor ventas el arreglo de objetos
      ==========================================================*/

      getSales.sort(function(a,b):any{

         return (b.sales - a.sales)

      })

      /*============================
      Filtramos solo 10 productos
      ==============================*/

      getSales.forEach((product, index)=>{

         if(index < 10){

            this.bestSalesItem.push(product);
            //función para el rating dinámico
            this.raiting.push(DinamicRating.fnc(this.bestSalesItem[index]));
            //función para rellenar las estrellas
            this.reviews.push(DinamicReviews.fnc(this.raiting[index]));
            //función para el precio dinámico y si tiene o no tiene stock
            this.price.push(DinamicPrice.fnc(this.bestSalesItem[index]));
            this.preload = false;

         }

      })

   }

   /*=====================================================================
   Función que nos avisa cuando termina el renderizado de Angular
   =======================================================================*/

   callback(){

      if(this.render){

         this.render = false;

         /*==================================================================================
         Ejecutar funciones globales con respecto a los plugins que utiliza la página
         ====================================================================================*/
   
         OwlCarouselConfig.fnc();
         CarouselNavigation.fnc();
         Rating.fnc();

      }

   }

}