import { Component, OnInit } from '@angular/core';
import { Path } from '../../../config';
import { OwlCarouselConfig, BackgroundImage } from '../../../funtions';
import { ProductsService } from '../../../services/products.service';

@Component({
   selector: 'app-home-banner',
   templateUrl: './home-banner.component.html',
   styleUrls: []
})
export class HomeBannerComponent implements OnInit {

   path:string = Path.url;
   banner_home:any[] = [];
   category:any[] = [];
   url:any[] = [];
   render:boolean = true;
   preload:boolean = false;

   constructor( private productsService: ProductsService ) { }

   ngOnInit(): void {

      let index:number = 0;
      let startAt:string = "";
      let limitToFirst:number = 5;
      this.preload = true;

      this.productsService.getData()
      .subscribe(resp => {

         /*====================================================
         Tomar la longitud del Objeto
         ====================================================*/

         const len = Object.keys(resp).length;

         /*====================================================
         Generar un número aleatorio
         ====================================================*/

         if(len > 5){

            index = Math.floor(Math.random() * (len - 5));

         }

         /*====================================================
         Seleccionar productos con límite
         ====================================================*/

         startAt = Object.keys(resp)[index];

         this.productsService.getLimitData( startAt, limitToFirst )
         .subscribe(resp=>{

            let i;
            for(i in resp){

               this.banner_home.push(JSON.parse(resp[i].horizontal_slider));
               this.category.push(resp[i].category);
               this.url.push(resp[i].category);
               this.preload = false;
               
            }
            
         })

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
         BackgroundImage.fnc();
   
      }

   }

}