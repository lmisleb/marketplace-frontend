import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Error404Component } from './pages/error404/error404.component';
import { HomeComponent } from './pages/home/home.component';
import { ProductComponent } from './pages/product/product.component';
import { ProductsComponent } from './pages/products/products.component';
import { SearchComponent } from './pages/search/search.component';

const routes: Routes = [

   { path: '', component: HomeComponent },
   { path: 'products/:param', component: ProductsComponent }, //se le incluye un parámetro para hacer la búsqueda por producto
   { path: 'product/:param', component: ProductComponent },
   { path: 'search/:param', component: SearchComponent },
   { path: '**', pathMatch:'full', component: Error404Component  }
   
];

@NgModule({
   declarations: [],
   imports: [RouterModule.forRoot(routes)],
   exports: [RouterModule]
})
export class AppRoutingModule { }