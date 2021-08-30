import { Component, OnInit } from '@angular/core';
import { Path } from '../../../config';
import { OwlCarouselConfig, CarouselNavigation, SlickConfig, ProductLightbox, CountDown, Rating, ProgressBar } from '../../../funtions';
import { ProductsService } from '../../../services/products.service';
import { SalesService } from '../../../services/sales.service';

declare var jQuery:any;
declare var $:any;

@Component({
   selector: 'app-home-hot-today',
   templateUrl: './home-hot-today.component.html',
   styleUrls: []
})
export class HomeHotTodayComponent implements OnInit {

   path:string = Path.url;
   indexes:any[] = [];
   products:any[] = [];
   render:boolean = true;
   renderBestSeller:boolean = true;
   preload:boolean = false;
   topSales:any[] = [];
   topSalesBlock:any[] = [];

   constructor(private productsService: ProductsService, private salesService: SalesService) { }

   ngOnInit(): void {

      this.preload = true;
      let getProduct = [];
      let hoy = new Date();
      let fechaOferta = null;

      /*=======================================================
      Tomamos la data de los productos
      =========================================================*/
      
      this.productsService.getData()
      .subscribe(resp => {
         //console.log("resp", resp);

         /*=======================================================
         Recorremos cada producto para separar ofertas y stocks
         =========================================================*/
   
         let i;
         for(i in resp){
   
            getProduct.push({
   
               "offer": JSON.parse(resp[i].offer),
               "stock": resp[i].stock
   
            })

            this.products.push(resp[i]); //para tomar cuales son las imagenes
   
         }
   
         //console.log("getProduct", getProduct);
         //console.log("this.products", this.products);
   
         /*=========================================================================================
         Separaramos los productos con fechas de ofertas mayores a la actual y que tengan stocks
         ===========================================================================================*/
         
         for(i in getProduct){

            fechaOferta = new Date(

               parseInt(getProduct[i]["offer"][2].split("-")[0]),
               parseInt(getProduct[i]["offer"][2].split("-")[1]) - 1,
               parseInt(getProduct[i]["offer"][2].split("-")[2])
            
            )

            //console.log("fechaOferta", fechaOferta);

            if(hoy < fechaOferta && getProduct[i]["stock"] > 0){

               this.indexes.push(i); //para mostrar los productos en la galeria que tengan fecha de ofertas y tengan stock
               this.preload = false;
               
            }
            
         }

         //console.log("fechaOferta", fechaOferta);
         //console.log("indexes", this.indexes);

      })

      /*=================================================================================
      Tomamos la data de las ventas / Esto es para mostrar en el tablero de los top 20
      ===================================================================================*/

      let getSales = [];

      this.salesService.getData()
      .subscribe(resp => {
         //console.log("sales", resp);

         /*=======================================================
         Recorremos para separar los producto y las cantidades
         =========================================================*/
   
         let i;
         for(i in resp){
   
            getSales.push({
   
               "product": resp[i].product,
               "quantity": resp[i].quantity
   
            })
   
         }

         //console.log("getSales", getSales);

         /*=======================================================
         Ordenamos de mayor a menor el array de objetos
         =========================================================*/

         getSales.sort(function(a,b){

            return(b.quantity - a.quantity)

         })

         //console.log("getSales", getSales);

         /*=============================================================================
         Sacamos del arreglo los productos repetidos dejando solo los de mayor ventas
         ===============================================================================*/

         let fillterSales = [];

         getSales.forEach( sale => {

            if( !fillterSales.find(resp => resp.product == sale.product)){

               const {product, quantity} = sale; //destructuring

               fillterSales.push({product, quantity})

            }

         })

         //console.log("fillterSales", fillterSales);

         /*=================================================================================
         Cruzamos la data de las ventas con la de los productos para buscar coincidencias
         ===================================================================================*/

         let block = 0;

         fillterSales.forEach((sale,index) =>{

            /*================================
            Filtramos las 20 mejores ventas
            ==================================*/

            if(index < 20){

               block ++;
   
               this.productsService.getFilterData("name", sale.product).subscribe(resp=>{
                  //console.log("resp", resp);

                  let i;
                  for(i in resp){

                     this.topSales.push(resp[i])

                  }

                  //console.log("this.topSales", sale.product);
                  //console.log("this.topSales", this.topSales);
               
               })

            }

         })
         
         /*==================================================================
         Enviamos el máximo de bloques para mostrar 4 productos por bloque
         ====================================================================*/
         
         for(let i = 0; i < Math.round(block/4); i++){

            this.topSalesBlock.push(i)

         }

         //console.log("this.topSalesBlock", this.topSalesBlock);

      })

   }

   /*===============================================================
   Función que nos avisa cuando termina el renderizado de Angular
   =================================================================*/

   callback(){

      if(this.render){

         this.render = false;

         /*=======================================================
         Seleccionamos del DOM los elementos de la galería mixta 
         =========================================================*/

         let galleryMix_1:string = $(".galleryMix_1");
         let galleryMix_2:string = $(".galleryMix_2");
         let galleryMix_3:string = $(".galleryMix_3");

         /*============================================================
         Seleccionar del DOM los elementos de las ofertas
         ==============================================================*/

         let offer_1:string = $(".offer_1");
         let offer_2:string = $(".offer_2");
         let offer_3:string = $(".offer_3");

         /*============================================================
         Seleccionar del DOM los elementos de las estrellas
         ==============================================================*/

         let reviews_1:string = $(".reviews_1");
         let reviews_2:string = $(".reviews_2");
         let reviews_3:string = $(".reviews_3");

         /*============================================================
         GALERIA
         ==============================================================*/
      
         for(let i = 0; i < galleryMix_1.length; i++){

            /*=================================================================
            Recorremos las fotografías de cada producto
            ===================================================================*/

            for(let f = 0; f < JSON.parse($(galleryMix_1[i]).attr("gallery")).length; f++){

               /*===========================
               Agregar imágenes grandes
               =============================*/

               $(galleryMix_2[i]).append(
            
                  `<div class="item">
                     <a href="${this.path}img/products/${$(galleryMix_1[i]).attr("category")}/gallery/${JSON.parse($(galleryMix_1[i]).attr("gallery"))[f]}">
                        <img src="${this.path}img/products/${$(galleryMix_1[i]).attr("category")}/gallery/${JSON.parse($(galleryMix_1[i]).attr("gallery"))[f]}" alt="">
                     </a>
                  </div>`

               )

               /*===========================
               Agregar imágenes pequeñas
               =============================*/

               $(galleryMix_3[i]).append(

                  `<div class="item">
                     <img src="${this.path}img/products/${$(galleryMix_1[i]).attr("category")}/gallery/${JSON.parse($(galleryMix_1[i]).attr("gallery"))[f]}" alt="">
                  </div>`

               )

            }

            /*================================================
            OFERTAS
            ==================================================*/

            let offer = JSON.parse($(offer_1[i]).attr("offer")); //arreglo manipulable

            /*================================================
            Capturamos el precio de cada producto
            ==================================================*/

            let price = Number($(offer_1[i]).attr("price"));

            /*================================================
            Preguntamos si es un descuento
            ==================================================*/

            if(offer[0] == "Disccount"){

               $(offer_1[i]).html(

                  `<span>Save <br> $${((price * offer[1]) / 100).toFixed(2)}</span>`

               )

               $(offer_2[i]).html(`$${(price - ((price * offer[1]) / 100)).toFixed(2)}`);

            }

            /*================================================
            Preguntamos si es un precio fijo
            ==================================================*/

            if(offer[0] == "Fixed"){

               $(offer_1[i]).html(

                  `<span>Save <br> $${(price - offer[1]).toFixed(2)}</span>`

               )

               $(offer_2[i]).html(`$${offer[1]}`);

            }

            /*================================================
            Agregamos la fecha al descontador de fecha
            ==================================================*/

            $(offer_3[i]).attr("data-time",
            
               new Date(

                  parseInt(offer[2].split("-")[0]),
                  parseInt(offer[2].split("-")[1]) - 1,
                  parseInt(offer[2].split("-")[2])
            
               )
            
            )

            /*===============================================================
            ESTRELLAS calculamos el total de calificaciones de las reseñas
            =================================================================*/

            let totalReview:number = 0;

            for(let f = 0; f < JSON.parse($(reviews_1[i]).attr("reviews")).length; f++){

               totalReview += Number(JSON.parse($(reviews_1[i]).attr("reviews"))[f]["review"])

            }

            /*==============================================================
            Imprimimos el total de las calificaciones para cada producto
            ================================================================*/

            let rating = Math.round(totalReview / JSON.parse($(reviews_1[i]).attr("reviews")).length);
         
            $(reviews_3[i]).html(rating);

            for(let f = 1; f <= 5; f++){ //f define la cantidad de estrellas

               $(reviews_2[i]).append(

                  `<option value="2">${f}</option>`

               )

               if(rating == f){

                  $(reviews_2[i]).children('option').val(1)

               }

            }

         }

         /*==================================================================================
         Ejecutar funciones globales con respecto a los plugins que utiliza la página
         ====================================================================================*/

         OwlCarouselConfig.fnc();
         CarouselNavigation.fnc();
         SlickConfig.fnc();
         ProductLightbox.fnc();
         CountDown.fnc();
         Rating.fnc();
         ProgressBar.fnc();

      }

   }

   callbackBestSeller(topSales:string){

      if(this.renderBestSeller){

         this.renderBestSeller = false;
         //console.log("topSales", topSales);

         /*========================================================
         Capturamos la cantidad de bloques que existen en el DOM
         ==========================================================*/

         let topSaleBlock:string = $(".topSaleBlock");
         let top20Array = [];

         /*=================================================================
         Ejecutamos un SetTimeOut de un segundo por cada bloque de espera
         ===================================================================*/

         setTimeout(function(){

            for(let i = 0; i < topSaleBlock.length; i++){

               /*=================================================
               Removemos el preload
               ===================================================*/

               $(".preload").remove();

               /*=================================================
               Agrupamos la cantidad de 4 productos por bloque
               ===================================================*/
   
               top20Array.push(
   
                  topSales.slice(i * topSaleBlock.length, ((i * topSaleBlock.length) + topSaleBlock.length))
   
               )
               //console.log("top20Array", top20Array);
               /*===================================================
               Hacemos un recorrido por el nuevo array de objetos
               =====================================================*/

               let f;
               for(f in top20Array[i]){

                  /*======================================================
                  Definimos si el precio del producto tiene oferta o no
                  ========================================================*/

                  let price:string;
                  let type:string;
                  let value:number;
                  let offer:number;
                  let offerDate;
                  let today = new Date();

                  //console.log(top20Array[i][f]);

                  if(top20Array[i][f].offer != ""){ //si viene oferta

                     offerDate = new Date(

                        parseInt(JSON.parse(top20Array[i][f].offer)[2].split("-")[0]),
                        parseInt(JSON.parse(top20Array[i][f].offer)[2].split("-")[1]) - 1,
                        parseInt(JSON.parse(top20Array[i][f].offer)[2].split("-")[2])
                  
                     )

                     if(today < offerDate){

                        type = JSON.parse(top20Array[i][f].offer)[0];  //Disccount o Fixed
                        type = JSON.parse(top20Array[i][f].offer)[0];  //tipo Disccount o Fixed
                        value = JSON.parse(top20Array[i][f].offer)[1]; //valor
   
                        if(type == "Disccount"){
                           
                           //Disccount
                           offer = Number((top20Array[i][f].price - ((top20Array[i][f].price * value)/100)).toFixed(2));
   
                        }else{
   
                           //Fixed
                           offer = Number((value));
   
                        }
   
                        //si hay ofertas
                        price = `<p class="ps-product__price sale">${offer} <del>$${top20Array[i][f].price} </del></p>`;
                        price = `<p class="ps-product__price sale">$${offer} <del>$${top20Array[i][f].price} </del></p>`;

                     }else{

                        price = `<p class="ps-product__price">$${top20Array[i][f].price} `;

                     }

                  }else{

                     //si no hay ofertas
                     price = `<p class="ps-product__price">$${top20Array[i][f].price} `;

                  }

                  /*=================================================
                  Mostramos en la vista los productos clasificados
                  ===================================================*/

                  $(topSaleBlock[i]).append(

                     `<div class="ps-product--horizontal">

                        <div class="ps-product__thumbnail">
                           <a href="product/${top20Array[i][f].url}">
                              <img src="assets/img/products/${top20Array[i][f].category}/${top20Array[i][f].image}" alt="${top20Array[i][f].name}">
                           </a>
                        </div>
   
                        <div class="ps-product__content">
   
                           <a class="ps-product__title" href="product/${top20Array[i][f].url}">${top20Array[i][f].name}</a>
   
                           ${price}
   
                        </div>
   
                     </div>`

                  )

               }

            }

            /*=================================================
            Modificamos el estilo del plugín OWL Carousel
            ===================================================*/

            $(".owl-dots").css({"bottom":"0"})
            $(".owl-dot").css({"background":"#ddd"})

         }, (topSaleBlock.length * 1000))
      
      }

   }

}