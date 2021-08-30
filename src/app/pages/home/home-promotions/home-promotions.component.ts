import { Component, OnInit } from '@angular/core';
import { Path } from '../../../config';
import { ProductsService } from '../../../services/products.service';

@Component({
   selector: 'app-home-promotions',
   templateUrl: './home-promotions.component.html',
   styleUrls: []
})
export class HomePromotionsComponent implements OnInit {

   path:string = Path.url;
   banner_default:Array<any> = [];
   category:Array<any> = [];
   url:Array<any> = [];
   preload:boolean = false;

   constructor(private productsService: ProductsService) { }

   ngOnInit(): void {

      let index:number = 0;
      let startAt:string = "";
      let limitToFirst:number = 2;
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

         if (len > 2) {

            index = Math.floor(Math.random() * (len - 2));

         }

         /*====================================================
         Seleccionar productos con límite
         ====================================================*/

         startAt = Object.keys(resp)[index];

         this.productsService.getLimitData(startAt, limitToFirst)
         .subscribe(resp => {

            let i;
            for (i in resp) {

               this.banner_default.push(resp[i].default_banner);
               this.category.push(resp[i].category);
               this.url.push(resp[i].category);
               this.preload = false;

            }

         })

      })

   }

}
