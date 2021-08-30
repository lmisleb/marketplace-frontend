import { Component, OnInit } from '@angular/core';
import { Path } from '../../../config';
import { CategoriesService } from '../../../services/categories.service';

@Component({
   selector: 'app-home-top-categories',
   templateUrl: './home-top-categories.component.html',
   styleUrls: []
})
export class HomeTopCategoriesComponent implements OnInit {

   path:string = Path.url;
   categories:Array<any> = [];
   preload:boolean = false;

   constructor(private categoriesService: CategoriesService) { }

   ngOnInit(): void {

      this.preload = true;

      /*=======================================================
      Tomamos la data de las categorias
      =========================================================*/

      let getCategories = [];

      this.categoriesService.getData()
      .subscribe(resp => {
         //console.log("resp", resp);

         /*=======================================================
         Recorremos las categorias
         =========================================================*/
   
         let i;
         for(i in resp){
   
            getCategories.push(resp[i])
   
         }
         //console.log("getCategories", getCategories);

         /*=======================================================
         Ordenamos de mayor a menor el array de objetos
         =========================================================*/

         getCategories.sort(function(a,b){

            return(b.view - a.view)

         })
         //console.log("getCategories", getCategories);

         /*=======================================================
         Filtramos hasta 6 categorías
         =========================================================*/

         getCategories.forEach((category,index) =>{

            if(index < 6){

               this.categories[index] = getCategories[index];
               this.preload = false;

            }

         })

      })

   }

}