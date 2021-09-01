import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import * as firebase from "firebase/app";
import "firebase/auth";
//import { Capitalize, Sweetalert } from '../../functions';
import { UsersModel } from '../../models/users.model';
import { UsersService  } from '../../services/users.service';

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
   }

   /*=============================================
   Envío del formulario
   =============================================*/

   onSubmit(f: NgForm) {

      this.user.returnSecureToken = true;

      //console.log("this.user", this.user);

      this.usersService.registerAuth(this.user)
      .subscribe(resp=>{

         console.log("resp", resp);

      })

      if (f.invalid) {

         return;

      }

   }

}
