/*===============================================================================================
Exportamos la ruta para mostrar imágenes
=================================================================================================*/

export let Path = {
 
   url: 'http://localhost:4200/assets/'
   
}

/*===============================================================================================
Exportamos el endPoint de la ApiRest de Firebase
=================================================================================================*/

export let Api = {
 
   url: 'https://marketplace-fbc0e-default-rtdb.firebaseio.com/'
   
}

/*===============================================================================================
Exportamos el endPoint para el registro de usuarios en Firebase Authentication
=================================================================================================*/

export let Register = {

	url: 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBS4i_hK-Cu55EVxXvRjrNeM5ot1c70Pms'

}

/*===============================================================================================
Exportamos el endPoint para el ingreso de usuarios en Firebase Authentication
=================================================================================================*/

export let Login = {

	url: 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=[YOUR-API-KEY]'

}

/*===============================================================================================
Exportamos el endPoint para enviar verificación de correo electrónico
=================================================================================================*/

export let SendEmailVerification = {

	url: 'https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=[YOUR-API-KEY]'

}

/*===============================================================================================
Exportamos el endPoint para confirmar email de verificación
=================================================================================================*/

export let ConfirmEmailVerification = {

	url: 'https://identitytoolkit.googleapis.com/v1/accounts:update?key=[YOUR-API-KEY]'

}

/*===============================================================================================
Exportamos el endPoint para tomar la data del usuario en Firebase auth
=================================================================================================*/

export let GetUserData = {

	url: 'https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=[YOUR-API-KEY]'

}

/*===============================================================================================
Exportamos el endPoint para Resetear la contraseña
=================================================================================================*/

export let SendPasswordResetEmail = {

 url: 'https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=[YOUR-API-KEY]'

}

/*===============================================================================================
Exportamos el endPoint para confirmar el cambio de la contraseña
=================================================================================================*/

export let VerifyPasswordResetCode = {

	url: 'https://identitytoolkit.googleapis.com/v1/accounts:resetPassword?key=[YOUR-API-KEY]'

}

/*===============================================================================================
Exportamos el endPoint para enviar la contraseña
=================================================================================================*/

export let ConfirmPasswordReset = {

	url:'https://identitytoolkit.googleapis.com/v1/accounts:resetPassword?key=[YOUR-API-KEY]'

}

/*===============================================================================================
Exportamos el endPoint para cambiar la contraseña
=================================================================================================*/

export let ChangePassword = {

	url:'https://identitytoolkit.googleapis.com/v1/accounts:update?key=[YOUR-API-KEY]'

}

/*===============================================================================================
Exportamos el endPoint del servidor para administrar archivos
=================================================================================================*/

export let Server = {

	url:'http://localhost/marketplace-account/src/assets/img/index.php?key=[YOUR-API-KEY]'

}