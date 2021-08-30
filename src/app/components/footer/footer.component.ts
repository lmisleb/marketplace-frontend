import { Component, OnInit } from '@angular/core';
import { Path } from '../../config';
import { CategoriesService } from '../../services/categories.service';
import { SubCategoriesService } from '../../services/sub-categories.service';

declare var jQuery:any;
declare var $:any;

@Component({
   selector: 'app-footer',
   templateUrl: './footer.component.html',
   styles: []
})
export class FooterComponent implements OnInit {

   path:string = Path.url;
   categories:object = null;
   render:boolean = true;
   categoriesList:Array<any> = [];

   constructor(private categoriesService: CategoriesService, private subcategoriesService: SubCategoriesService) { }

   ngOnInit(): void {

      /*=================================
        Tomamos la data de la categorías
        ===================================*/

      this.categoriesService.getData()
      .subscribe(resp => {

         this.categories = resp;
         //console.log("this.categories", this.categories);

         /*=================================================
         Recorrido por el objeto de la data de categorias
         ===================================================*/
   
         let i;   
         for(i in resp){
   
            /*====================================
            Separamos los nombres de categorias
            ======================================*/
   
            this.categoriesList.push(resp[i].name)
            
         }

      })

   }

   /*===============================================================
   Función que nos avisa cuando termina el renderizado de Angular
   =================================================================*/

   callback(){

      if(this.render){

         this.render = false;
         let arraySubcategories = [];

         /*==============================
         Separar las categorías
         ================================*/

         this.categoriesList.forEach(category=>{
            //console.log("category", category);

            /*==============================================================================
            Tomamos la colección de las sub-categorías filtrando los nombres de categoría
            ================================================================================*/

            this.subcategoriesService.getFilterData("category", category).subscribe(resp => {

               /*=================================================================================================================================================
               Hacemos un recorrido por la colección general de subcategorias y clasificamos las subcategprías y url de acuerdo a la categoría que correspondan
               ===================================================================================================================================================*/

               let i;

               for(i in resp){

                  //console.log("resp", resp);

                  arraySubcategories.push({
                     "category": resp[i].category,
                     "subcategory": resp[i].name,
                     "url": resp[i].url
                  })

               }

               /*==============================================================================================
               Recorremos el array de objetos nuevo para buscar conincidencias con los nombres de categorias
               ================================================================================================*/

               for(i in arraySubcategories){

                  //console.log("arraySubcategories", arraySubcategories);

                  if(category == arraySubcategories[i].category){

                     $(`[category-footer ='${category}']`).after(

                        `<a href="products/${arraySubcategories[i].url}">${arraySubcategories[i].subcategory}</a>`

                     )

                  }

               }
            
            })

         })
      
      }

   }

}