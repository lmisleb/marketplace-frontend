import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeResourceUrl, SafeUrl } from '@angular/platform-browser';

@Pipe({
   name: 'urlsecure'
})
export class UrlsecurePipe implements PipeTransform {

   constructor(private domSanitizer: DomSanitizer){

   }

   transform(value: string, ...args: unknown[]): SafeResourceUrl {

      return this.domSanitizer.bypassSecurityTrustResourceUrl(value) // pipe que permite el uso de URL seguras en el DOM

   }

}