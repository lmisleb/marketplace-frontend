import { Component, OnInit } from '@angular/core';
import { Path } from '../../../config';
import { OwlCarouselConfig, Rating } from '../../../funtions';
import { CategoriesService } from '../../../services/categories.service';
import { SubCategoriesService } from '../../../services/sub-categories.service';
import { ProductsService } from '../../../services/products.service';

declare var jQuery:any;
declare var $:any;

@Component({
   selector: 'app-home-showcase',
   templateUrl: './home-showcase.component.html',
   styleUrls: []
})
export class HomeShowcaseComponent implements OnInit {

   path:string = Path.url;
   categories:any[] = [];
   preload:boolean = false;
   render:boolean = true;

   constructor(private categoriesService: CategoriesService,
      private subCategoriesService: SubCategoriesService,
      private productsService: ProductsService) { }

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
            for (i in resp) {

               getCategories.push(resp[i])

            }
            //console.log("getCategories", getCategories);

            /*=======================================================
            Ordenamos de mayor a menor el array de objetos
            =========================================================*/

            getCategories.sort(function (a, b) {

               return (b.view - a.view)

            })
            //console.log("getCategories", getCategories);

            /*=======================================================
            Filtramos hasta 6 categor??as
            =========================================================*/

            getCategories.forEach((category, index) => {

               if (index < 6) {

                  this.categories[index] = getCategories[index];
                  this.preload = false;

               }

            })

         })

   }

   /*===============================================================
   Funci??n que nos avisa cuando termina el renderizado de Angular
   =================================================================*/

   callback(indexes) {

      if (this.render) {

         this.render = false;

         let arraySubCategories = [];
         let arrayProducts = [];
         let preloadSV = 0;

         /*===============================
         Separar las categor??as
         =================================*/

         this.categories.forEach(category => {
            //console.log("category", category.name);

            /*=======================================================================================
            Tomamos la colecci??n de las sub-categor??as filtrando con los nombres de las categor??as
            =========================================================================================*/

            this.subCategoriesService.getFilterData("category", category.name)
               .subscribe(resp => {
                  //console.log("resp", resp);

                  let i;
                  for (i in resp) {

                     arraySubCategories.push({

                        "category": resp[i].category,
                        "subcategory": resp[i].name,
                        "url": resp[i].url

                     })

                  }
                  //console.log("arraySubCategories", arraySubCategories);

                  /*===============================================================================================
                  Recorremos este nuevo array de objetos para buecar coincidencias con los nombres de categor??as
                  =================================================================================================*/

                  for (i in arraySubCategories) {

                     if (category.name == arraySubCategories[i].category) {

                        $(`[category-showcase='${category.name}']`).append(

                           `<li><a href="products/${arraySubCategories[i].url}">${arraySubCategories[i].subcategory}</a></li>`

                        )

                     }

                  }

               })

            /*=======================================================================================
            Tomamos la colecci??n de los productos filtrando con las url??s de categor??as
            =========================================================================================*/

            this.productsService.getFilterDataWithLimit("category", category.url, 6)
            .subscribe(resp => {
               //console.log("resp", resp);

               let i;
               for (i in resp) {

                  arrayProducts.push({

                     "category": resp[i].category,
                     "url": resp[i].url,
                     "name": resp[i].name,
                     "image": resp[i].image,
                     "price": resp[i].price,
                     "offer": resp[i].offer,
                     "reviews": resp[i].reviews,
                     "stock": resp[i].stock,
                     "vertical_slider": resp[i].vertical_slider

                  })

               }

               /*===========================================================================================
               Recorremos el array de objetos nuevo para buecar coincidencias con las url??s de categor??as
               =============================================================================================*/

               for (i in arrayProducts) {

                  if (category.url == arrayProducts[i].category) {

                     /*============================================
                     Definimos si el producto tiene oferta o no
                     ==============================================*/

                     let price: string;
                     let type: string;
                     let value: number;
                     let offer: number;
                     let disccount: string = "";
                     let offerDate;
                     let today = new Date();

                     if (arrayProducts[i].offer != "") { //si viene oferta

                        offerDate = new Date(

                           parseInt(JSON.parse(arrayProducts[i].offer)[2].split("-")[0]),
                           parseInt(JSON.parse(arrayProducts[i].offer)[2].split("-")[1]) - 1,
                           parseInt(JSON.parse(arrayProducts[i].offer)[2].split("-")[2])
                     
                        )
   
                        if(today < offerDate){

                           type = JSON.parse(arrayProducts[i].offer)[0];  // tipo Disccount o Fixed
                           value = JSON.parse(arrayProducts[i].offer)[1]; //valor
   
                           if (type == "Disccount") {
   
                              //Disccount
                              offer = Number((arrayProducts[i].price - ((arrayProducts[i].price * value) / 100)).toFixed(2));
   
                           } else {
   
                              //Fixed
                              offer = Number((value));
                              //value = Math.round((offer * 100) / arrayProducts[i].price); //mostrar el porcentaje que est?? pagando
                              value = Math.round(100 - (offer * 100 / arrayProducts[i].price)); //o mostrar el porcentaje que se va a ahorrar
   
                           }
   
                           disccount = `<div class="ps-product__badge">-${value}%</div>`;
   
                           //si hay ofertas
                           price = `<p class="ps-product__price sale">$${offer} <del>$${arrayProducts[i].price} </del></p>`;

                        }else{

                           price = `<p class="ps-product__price">$${arrayProducts[i].price} `;

                        }

                     } else {

                        //si no hay ofertas
                        price = `<p class="ps-product__price">$${arrayProducts[i].price} `;

                     }

                     /*======================================================
                     Calculamos el total de calificaciones de las rese??as
                     ========================================================*/

                     let totalReview: number = 0;

                     for (let f = 0; f < JSON.parse(arrayProducts[i].reviews).length; f++) {

                        totalReview += Number(JSON.parse(arrayProducts[i].reviews)[f]["review"])

                     }

                     /*==============================================================
                     Imprimimos el total de las calificaciones para cada producto
                     ================================================================*/

                     let rating = Math.round(totalReview / JSON.parse(arrayProducts[i].reviews).length);

                     /*======================================================
                     Definimos si el producto tiene stock
                     ========================================================*/

                     if (arrayProducts[i].stock == 0) {

                        disccount = `<div class="ps-product__badge out-stock">Out Of Stock</div>`;

                     }

                     /*======================================================
                     Imprimimos en el html los productos
                     ========================================================*/

                     $(`[category-pb='${arrayProducts[i].category}']`).append(

                        `<div class="ps-product ps-product--simple">

                        <div class="ps-product__thumbnail">
         
                           <a href="product/${arrayProducts[i].url}">
         
                              <img src="${this.path}img/products/${arrayProducts[i].category}/gallery/${arrayProducts[i].image}" alt="">
         
                           </a>
         
                           ${disccount}
         
                        </div>
         
                        <div class="ps-product__container">
         
                           <div class="ps-product__content" data-mh="clothing">
         
                              <a class="ps-product__title" href="product/${arrayProducts[i].url}">${arrayProducts[i].name}</a>
         
                              <div class="ps-product__rating">
         
                                 <select class="ps-rating productRating" data-read-only="true">
         
                                    <!-- Se imprimen las estrellas -->
         
                                 </select>
         
                                 <span>${rating}</span>
         
                              </div>
         
                              ${price}
         
                           </div>
         
                        </div>
      
                     </div>`

                     )

                     /*============================================================
                     Clasificamos la cantidad de estrellas seg??n la calificaci??n
                     ==============================================================*/

                     let arrayRating: string = $(".productRating");

                     for (let i = 0; i < arrayRating.length; i++) {

                        for (let f = 1; f <= 5; f++) { //f define la cantidad de estrellas

                           $(arrayRating[i]).append(

                              `<option value="2">${f}</option>`

                           )

                           if (rating == f) {

                              $(arrayRating[i]).children('option').val(1)

                           }

                        }

                     }

                     /*==================================================================================
                     Ejecutar funciones globales con respecto a angular
                     ====================================================================================*/

                     Rating.fnc();

                     /*======================================================
                     Imprimimos los productos en el vertical Slider
                     ========================================================*/

                     $(`[category-sl='${arrayProducts[i].category}']`).append(

                        `<a href="product/${arrayProducts[i].url}">

                           <img src="${this.path}img/products/${arrayProducts[i].category}/vertical/${arrayProducts[i].vertical_slider}" alt="">

                        </a>`

                     )

                     /*====================================================
                     Ejecutar funciones globales con respecto a angular
                     ======================================================*/

                     preloadSV++;

                     if(preloadSV == (indexes + 1) * 6){

                        $(`[category-sl]`).addClass('ps-carousel--product-box');
                        $(`[category-sl]`).addClass('owl-slider');

                        $(`[category-sl]`).owlCarousel({

                           items: 1,
                           autoplay: true,
                           autoplayTimeout: 7000,
                           loop: true,
                           nav: true,
                           margin: 0,
                           dots: true,
                           navSpeed: 500,
                           dotsSpeed: 500,
                           dragEndSpeed: 500,
                           navText:["<i class='icon-chevron-left'></i>","<i class='icon-chevron-right'></i>"]

                        })


                     }
                     
                     //OwlCarouselConfig.fnc();

                  }

               }

            })

         })

      }

   }

}