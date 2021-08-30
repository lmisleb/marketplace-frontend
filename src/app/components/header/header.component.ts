import { Component, OnInit } from '@angular/core';
import { Path } from '../../config';
import { Search } from '../../funtions';
import { CategoriesService } from '../../services/categories.service';
import { SubCategoriesService } from '../../services/sub-categories.service';

declare var $:any;

@Component({
   selector: 'app-header',
   templateUrl: './header.component.html',
   styles: []
})
export class HeaderComponent implements OnInit {

   path:string = Path.url;
   categories:object = null;
   arrayTitleList:any[] = [];
   render:boolean = true;

   constructor( private categoriesService: CategoriesService, private subcategoriesService: SubCategoriesService ) { } // invocamos el servicio

   ngOnInit(): void {

      /*====================================================
      Tomamos la data de la categorías
      ====================================================*/

      this.categoriesService.getData()
      .subscribe(resp => {

         this.categories = resp;
         //console.log("this.categories", this.categories);

         /*=====================================================================
         Recorremos la colección de categorías para tomar la lista de títulos
         =======================================================================*/

         let i;

         for(i in resp){

            this.arrayTitleList.push( JSON.parse(resp[i].title_list)); //.push permite agregar índices a un array
            //console.log("array", this.arrayTitleList);

         }

      })

   }

   /*================================
   Declaramos función del buscador
   ==================================*/

   goSearch(search:string){
      
      if(search.length == 0 || Search.fnc(search) == undefined){
         
         return;
         
      }

      window.open(`search/${Search.fnc(search)}`, '_top')

   }

   /*=====================================================================
   Función que nos avisa cuando termina el renderizado de Angular
   =======================================================================*/

   callback(){

      if(this.render){

         this.render = false;
         let arraySubcategories = [];

         /*=============================================
         Hacemos un recorrido por la lista de titulos
         ===============================================*/

         this.arrayTitleList.forEach( titleList => {
            //console.log("titleList", titleList);

            /*===================================================
            Separarmos individualmente cada uno de los titulos
            =====================================================*/

            for(let i = 0; i < titleList.length; i++){

               //console.log("titleList", titleList[i]);

               /*===================================================
               Filtramos la lista de titulos en la sub-categories
               =====================================================*/

               this.subcategoriesService.getFilterData("title_list", titleList[i]).subscribe(resp => {

                  arraySubcategories.push(resp);
                  //console.log("arraySubcategories", arraySubcategories);

                  /*===================================================
                  Recorremos la coleccion general de sub-categories
                  =====================================================*/

                  let f;
                  let g;
                  let arrayTitleName = [];

                  for(f in arraySubcategories){

                     /*===================================================
                     Recorremos la coleccion particular de sub-categories
                     =====================================================*/
                     //console.log("arraySubcategories", arraySubcategories[f]);

                     for(g in arraySubcategories[f]){

                        /*===================================================================================================================
                        Creamos un array de objetos clasificando cada sub-categories con la respectiva lista de títulos a la que pertenece
                        =====================================================================================================================*/
                        //console.log("arraySubcategories[f]", arraySubcategories[f]);

                        arrayTitleName.push({
                           "titleList": arraySubcategories[f][g].title_list,
                           "subcategory": arraySubcategories[f][g].name,
                           "url": arraySubcategories[f][g].url
                        })

                     }

                     //console.log("arrayTitleName",arrayTitleName);

                     /*======================================================================================
                     Recorremos el array de objetos nuevo para buscar coincidencias con la lista de titulo
                     ========================================================================================*/
                  
                     for(f in arrayTitleName){

                        if(titleList[i] == arrayTitleName[f].titleList){

                           //console.log("arrayTitleName[f].subcategory",arrayTitleName[f].subcategory);
                           //console.log("titleList[i]",titleList[i]);

                           /*======================================================================
                           Imprimir el nombre de subcategoria debajo del listado correspondiente
                           ========================================================================*/

                           //para seleccionar en el dom un atributo con su respectivo valor
                           $(`[titleList ='${titleList[i]}']`).append(

                              `<li>
                                 <a href="products/${arrayTitleName[f].url}">${arrayTitleName[f].subcategory}</a>
                              </li>`

                           ) 

                        }

                     }

                  }

               })

            }         
            
         })

      }

   }

   // #yourInput

   // (keyup.enter)="sendit(yourInput.value)"

   // sendit(inputValue) {
   //    console.log(inputValue);
   // }


   // goSearch(search:string){
   //    console.log("search", search);

   //    if(search.length == 0 || Search.fnc(search) == undefined){
   //       console.log("search", search);
   //       return;
         
   //    }
   //    console.log("search after if", search);
   //    window.open(`search/${Search.fnc(search)}`, '_top')

   // }

}