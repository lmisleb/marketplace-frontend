import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from '../../../services/products.service';

@Component({
   selector: 'app-product-breadcrumb',
   templateUrl: './product-breadcrumb.component.html',
   styles: []
})

export class ProductBreadcrumbComponent implements OnInit {

   breadcrumb:string = null;

   constructor(private activatedRoute: ActivatedRoute, private productsService: ProductsService) { }

   ngOnInit(): void {

      /*===========================================
      Capturamos el parámetro URL
      =============================================*/

      this.breadcrumb = this.activatedRoute.snapshot.params["param"].replace(/[-]/g, " ");

      /*===========================================
      Actualizar vista del producto
      =============================================*/

      this.productsService.getFilterData("url", this.activatedRoute.snapshot.params["param"])
      .subscribe(resp => {

         for (const i in resp) {

            //Esto es para actualizar las vistas (view) en la base de datos cada vez que se mire a un producto

            let id = Object.keys(resp).toString(); //para obtener el id y se convierte en un string
            //console.log("id", id);

            let value = {
               "views": Number(resp[i].views + 1) // value es un objeto que se le va a sumar 1
            }
            //console.log("view",value);

            // se dispara el patch para sumar una vista al producto
            this.productsService.patchData(id,value)
            .subscribe(resp=>{
               //console.log("resp", resp);
            })

         }

      })

   }

}