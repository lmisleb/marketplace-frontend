import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Path } from '../../../config';
import { CategoriesService } from '../../../services/categories.service';
import { SubCategoriesService } from '../../../services/sub-categories.service';

@Component({
   selector: 'app-products-breadcrumb',
   templateUrl: './products-breadcrumb.component.html',
   styleUrls: []
})

export class ProductsBreadcrumbComponent implements OnInit {

   path:string = Path.url;
   breadcrumb:string = null;

   constructor(private categoriesService: CategoriesService, private subCategoriesService: SubCategoriesService, private activatedRoute: ActivatedRoute) { }

   ngOnInit(): void {

      /*===========================================
      Capturamos el parámetro URL
      =============================================*/

      let params = this.activatedRoute.snapshot.params["param"].split("&")[0];

      /*========================================
      Para mostrar la categoría en breadcrumb
      ==========================================*/

      this.categoriesService.getFilterData("url", params)
      .subscribe(resp1 => {
         //se hace un recorrido por el array de objetos de categorías

         if(Object.keys(resp1).length > 0){

            let i;

            for (i in resp1) {

               this.breadcrumb =  resp1[i].name;

               //Esto es para actualizar las vistas (view) en la base de datos cada vez que se mire una categoría

               let id = Object.keys(resp1).toString(); //lo convertimos a un string
               //console.log("id", id);

               let value = {
                  "view": Number(resp1[i].view + 1) // value es ya un objeto
               }
               //console.log("view",value);

               this.categoriesService.patchData(id,value)
               .subscribe(resp=>{
                  //console.log("resp", resp);
               })
   
            }

         }else{

            /*===========================================
            Para mostrar la subcategoría en breadcrumb
            =============================================*/

            this.subCategoriesService.getFilterData("url", params)
            .subscribe(resp2 => {
               //se hace un recorrido por el array de objetos de subcategorías
         
               let i;

               for (i in resp2) {

                  this.breadcrumb =  resp2[i].name;

                  //Esto es para actualizar las vistas (view) en la base de datos cada vez que se mire una sub-categoría

                  let id = Object.keys(resp2).toString(); //lo convertimos a un string
                  //console.log("id", id);
   
                  let value = {
                     "view": Number(resp2[i].view + 1) // value es ya un objeto
                  }
                  //console.log("view",value);
   
                  this.subCategoriesService.patchData(id,value)
                  .subscribe(resp=>{
                     //console.log("resp", resp);
                  })
   
               }

            })

         }

      })

   }

}