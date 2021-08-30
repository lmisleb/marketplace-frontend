import { Component, OnInit } from '@angular/core';
import { Path } from '../../config';
import { ProductsService } from '../../services/products.service';

@Component({
   selector: 'app-header-promotion',
   templateUrl: './header-promotion.component.html',
   styles: [],
})
export class HeaderPromotionComponent implements OnInit {

   path:string = Path.url;
   category:object = null;
   url:object = null;
   top_banner:any = null;
   imgBackground:string = '';
   H3_tag:string = '';
   H4_tag:string = '';
   P1_tag:string = '';
   P2_tag:string = '';
   Span_tag:string = '';
   Button_tag:string = '';
   preload:boolean = false;

   constructor( private productsService: ProductsService ) {}  // invocamos el servicio

   ngOnInit(): void {

      this.preload = true;

      this.productsService.getData()
      .subscribe(resp => {
         
         //console.log("Resp:", resp[Object.keys(resp)[1]]);

         /*====================================================
         Tomar la longitud del Objeto
         ====================================================*/

         const len = Object.keys(resp).length;
         //console.log("len", len);

         /*====================================================
         Generar un número aleatorio
         ====================================================*/

         let index = Math.floor(Math.random() * len) + 1;
         //console.log("index", index);

         /*====================================================
         Devolvemos a la vista un banner aleatorio
         ====================================================*/

         this.top_banner = JSON.parse(resp[Object.keys(resp)[index]].top_banner);
         //console.log(this.top_banner["H4 tag"]);
         //console.log(this.top_banner);
         this.category = resp[Object.keys(resp)[index]].category;
         //console.log(this.category);
         this.url = resp[Object.keys(resp)[index]].url;
         this.imgBackground = `url(${this.path}/img/products/${this.category}/top/${this.top_banner["IMG tag"]})`;
         //this.imgBackground = `url(assets/img/banner/top/${this.top_banner["IMG tag"]})`;
         this.H3_tag = this.top_banner["H3 tag"];
         this.H4_tag = this.top_banner["H4 tag"];
         this.P1_tag = this.top_banner["P1 tag"];
         this.P2_tag = this.top_banner["P2 tag"];
         this.Span_tag = this.top_banner["Span tag"];
         this.Button_tag = this.top_banner["Button tag"];
         this.preload = false;

      })

   }

}

//-------------------------------------------------------------------------------------------------------------------------------------------------------------

// import { Component, OnInit } from '@angular/core';
// import { Path } from '../../config';
// import { ProductsService } from '../../services/products.service';

// @Component({
//   selector: 'app-header-promotion',
//   templateUrl: './header-promotion.component.html',
//   styleUrls: []
// })
// export class HeaderPromotionComponent implements OnInit {

// 	path:String = Path.url;	
// 	top_banner:Object = null;
// 	category:Object = null;
// 	url:Object = null;
// 	preload:Boolean = false;

// 	constructor(private productsService: ProductsService ) { }

// 	ngOnInit(): void {

// 		this.preload = true;

// 		this.productsService.getData()
// 		.subscribe(resp =>{
			
// 			//console.log("resp", resp[Object.keys(resp)[1]]);

// 			/*=============================================
// 			Tomar la longitud del objeto
// 			===============================================*/

// 			let i;
// 			let size = 0;

// 			for(i in resp){

// 				size++			

// 			}

// 			/*=============================================
// 			Generar un número aleatorio 
// 			===============================================*/

// 			let index = Math.floor(Math.random()*size);

// 			/*=============================================
// 			Devolvemos a la vista un banner aleatorio
// 			===============================================*/

// 			this.top_banner = JSON.parse(resp[Object.keys(resp)[index]].top_banner);
//          console.log("this.top_banner", this.top_banner);
// 			this.category = resp[Object.keys(resp)[index]].category;
//          console.log("this.category", this.category);
// 			this.url = resp[Object.keys(resp)[index]].url;
//          console.log("this.url", this.url);
// 			this.preload = false;

// 		})

// 	}

// }