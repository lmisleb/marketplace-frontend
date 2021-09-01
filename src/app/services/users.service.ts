import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'; //módulo para poder hacer peticiones a una api
import { Api, Register, Login, SendEmailVerification, ConfirmEmailVerification, GetUserData, SendPasswordResetEmail, VerifyPasswordResetCode, ConfirmPasswordReset, ChangePassword } from '../config';
import { UsersModel } from '../models/users.model';

declare var jQuery:any;
declare var $:any;

@Injectable({
   providedIn: 'root'
})

export class UsersService {

   private api: string = Api.url;
   private register: string = Register.url;
   private login: string = Login.url;
   private sendEmailVerification: string = SendEmailVerification.url;
   private confirmEmailVerification: string = ConfirmEmailVerification.url;
   private getUserData: string = GetUserData.url;
   private sendPasswordResetEmail: string = SendPasswordResetEmail.url;
   private verifyPasswordResetCode: string = VerifyPasswordResetCode.url;
   private confirmPasswordReset: string = ConfirmPasswordReset.url;
   private changePassword: string = ChangePassword.url;

   constructor(private http: HttpClient) { }

   /*=============================================
	Registro en Firebase Authentication
	===============================================*/
	
	registerAuth(user: UsersModel){

		return this.http.post(`${this.register}`, user);

	}



}