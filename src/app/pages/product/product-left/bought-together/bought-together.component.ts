import { Component, OnInit, Input } from '@angular/core'; //el input es para transferir los datos de un componente padre a uno hijo
import { Path } from '../../../../config';
import { DinamicPrice } from '../../../../funtions';
import { ProductsService } from '../../../../services/products.service';

declare var $:any;

@Component({
   selector: 'app-bought-together',
   templateUrl: './bought-together.component.html',
   styles: []
})

export class BoughtTogetherComponent implements OnInit {

   @Input() childItem: any; // para mostrar los datos de un componente padre a uno hijo con el nombre del atributo que se le asigne en el html

   path:string = Path.url;
   products:any[] = [];
   price:any[] = [];
   cargando:boolean = false;
   render:boolean = true;

   constructor(private productsService: ProductsService) { }

   ngOnInit(): void {

      this.cargando = true;

      //console.log("this.childItem", this.childItem["title_list"]);
      this.productsService.getFilterData("title_list", this.childItem["title_list"])
         .subscribe(resp => {
            //console.log("resp", resp);
            this.productsFnc(resp);

         })

   }

   /*==============================================
   Declaramos función para mostrar los productos
   ================================================*/

   productsFnc(response) {

      this.products.push(this.childItem); // se le agrega los datos de una vez al array del componente padre

      /*=================================================================
      Hacemos un recorrido por la respuesta que nos traiga el filtrado
      ===================================================================*/

      let i;
      let getProduct = [];

      for (i in response) {

         getProduct.push(response[i]);

      }

      /*===========================================================
      Ordenamos de mayor a menor vistas en el arreglo de objetos
      =============================================================*/

      getProduct.sort(function(a,b){
         return (b.views - a.views)
      })

      /*===========================
      Filtramos un solo producto
      =============================*/

      getProduct.forEach((product, index) => {

         if(index < 1){

            this.products.push(product);

         }

         //console.log("this.product", this.product);

         this.cargando = false;

      })

      for(const i in this.products){

         /*===========================
         Price
         =============================*/

         this.price.push(DinamicPrice.fnc(this.products[i]));

         //console.log("this.price", this.price);

      }

   }

   callback() {

      if(this.render) {

         this.render = false;

         let price:string = $(".endPrice .end-price");
         let total = 0;

         for(let i = 0; i < price.length; i++){

            total += Number($(price[i]).html())

         }

         $(".ps-block__total strong").html(`$${total.toFixed(2)}`)

      }

   }

}