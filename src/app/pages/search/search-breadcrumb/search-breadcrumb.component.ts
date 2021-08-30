import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
   selector: 'app-search-breadcrumb',
   templateUrl: './search-breadcrumb.component.html',
   styles: []
})
export class SearchBreadcrumbComponent implements OnInit {

   breadcrumb:string = null;

   constructor(private activatedRoute: ActivatedRoute) { }

   ngOnInit(): void {

      /*===========================================
      Capturamos el parámetro URL
      =============================================*/

      this.breadcrumb = this.activatedRoute.snapshot.params["param"].replace(/[_]/g, " ");

   }

}