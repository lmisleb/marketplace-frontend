import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import * as firebase from "firebase/app";
import "firebase/auth";
//import { Capitalize, Sweetalert } from '../../funtions';

import { Capitalize } from '../../funtions';
import { UsersModel } from '../../models/users.model';
import { UsersService } from '../../services/users.service';


declare var jQuery: any;
declare var $: any;

@Component({
   selector: 'app-register',
   templateUrl: './register.component.html',
   styles: []
})

export class RegisterComponent implements OnInit {

   user: UsersModel;

   constructor(private usersService: UsersService) {

      this.user = new UsersModel();

   }

   ngOnInit(): void {

      /*===========================================
      Validar formulario de Bootstrap 4
      =============================================*/

      // Disable form submissions if there are invalid fields
      (function () {
         'use strict';
         window.addEventListener('load', function () {
            // Get the forms we want to add validation styles to
            var forms = document.getElementsByClassName('needs-validation');
            // Loop over them and prevent submission
            var validation = Array.prototype.filter.call(forms, function (form:any) {
               form.addEventListener('submit', function (event:any) {
                  if (form.checkValidity() === false) {
                     event.preventDefault();
                     event.stopPropagation();
                  }
                  form.classList.add('was-validated');
               }, false);
            });
         }, false);
      })();

   }

   /*==================================================
   Capitalizar la primera letra del nombre y apellido
   ====================================================*/

   capitalize(input:any){

      input.value = Capitalize.fnc(input.value)

   }

   /*===============================================
   Validación de expresión regular del formulario
   =================================================*/

   validate(input:any){

      let pattern:any;
   
      if($(input).attr("name") == "username"){
   
         pattern = /^[A-Za-z]{2,8}$/;

         input.value = input.value.toLowerCase();

         this.usersService.getFilterData("username", input.value)
         .subscribe(resp=>{

            //console.log("resp", resp);
            //return;
           
            if(Object.keys(resp).length > 0){
   
               $(input).parent().addClass('was-validated')
      
                  input.value = "";
      
                  //Sweetalert.fnc("error", "Username already exists", null)
   
               return;
            
            }
   
         })
   
      }

      if($(input).attr("name") == "password"){
   
         pattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{4,}$/;
   
      }

      if(!pattern.test(input.value)){

         $(input).parent().addClass('was-validated')
   
         input.value = "";
       
      }

   }

   /*===========================================
   Envío del formulario
   =============================================*/

   onSubmit(f: NgForm) {

      /*===========================================
      Registro en Firebase Authentication
      =============================================*/

      this.user.returnSecureToken = true;
      //console.log("this.user", this.user);

      this.usersService.registerAuth(this.user)
      .subscribe(resp => {
         //console.log("resp", resp);

         if (resp["email"] == this.user.email) {

            this.user.displayName = `${this.user.first_name} ${this.user.last_name}`;
            this.user.method = "direct";
            this.user.idToken = resp["idToken"];
            this.user.needConfirm = false;

            /*=============================================
            Registro en Firebase Database
            =============================================*/

            this.usersService.registerDatabase(this.user)
               .subscribe(resp1 => {

                  console.log("resp1", resp1);

               })

         }

      })

      if (f.invalid) {

         return;

      }

   }

}
