import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl,  Validators, FormArray } from '@angular/forms';
import { Observable } from 'rxjs/Rx';


@Component({
  selector: 'app-data',
  templateUrl: './data.component.html',
  styleUrls: ['./data.component.css']
})
export class DataComponent implements OnInit {
   
   //crear un elemento que será el responsable del manejo de mi forma completamente
    forma:FormGroup;

    usuario:Object = {  //poner "any" para evitar errores
   		nombrecompleto: {
   				nombre:"osmel",
		   		apellido:"calderon"
   		},
   		correo: "osmel.calderon@gmail.com",  //null,

      //pasatiempos: ["correr", "dormir", "comer"]
   }	

  constructor() { 
  	 //console.log(this.usuario);

  	 	this.forma = new FormGroup({

  			 nombrecompleto : new FormGroup({
  			 	nombre: new FormControl('', [Validators.required, Validators.minLength(3)]),
  				apellido: new FormControl('', [ Validators.required, Validators.minLength(3),  this.noHerrera  ]) //Validators.required
  			 }),

  			correo: new FormControl('', 
  									  [  Validators.required, 
  										Validators.pattern("[a-z0-9._%+-]+@[a-z0-9._%+-]+\.[a-z]{2,3}$")
  									  ]
  									),
        pasatiempos: new FormArray([
            new FormControl("correr", Validators.required),
            new FormControl("dormir", Validators.required),
            new FormControl("comer", Validators.required)
        ]),
        username: new FormControl("", [Validators.required, Validators.minLength(3)], this.existeUsuario),
        pass1: new FormControl("", [Validators.required, Validators.minLength(3)]),
        pass2: new FormControl()
  										
  		});

       this.forma.controls['pass2'].setValidators([
         Validators.required, 
         this.noIgual.bind(this.forma)  //esto equivale a decir que dentro de la funcion noIgual "this" va a ser "this.forma"
       ])

  		//this.forma.setValue(this.usuario); //esto me ahora tener que inicializar cada valor

  	 	/*Cargar la data pasandole cada atributo
  	 	this.forma = new FormGroup({

  			 nombrecompleto : new FormGroup({
  			 	nombre: new FormControl(this.usuario.nombrecompleto.nombre, [Validators.required, Validators.minLength(3)]),
  				apellido: new FormControl(this.usuario.nombrecompleto.apellido, [Validators.required])
  			 }),

  			correo: new FormControl(this.usuario.correo, 
  									  [  Validators.required, 
  										Validators.pattern("[a-z0-9._%+-]+@[a-z0-9._%+-]+\.[a-z]{2,3}$")
  									  ]
  									)
  										
  		});

  		*/


  	 	/*
  	 	 Con agrupamiento

  		this.forma = new FormGroup({

  			 nombrecompleto : new FormGroup({
  			 	nombre: new FormControl('', [Validators.required, Validators.minLength(3)]),
  				apellido: new FormControl('', [Validators.required])
  			 }),

  			correo: new FormControl('', 
  									  [  Validators.required, 
  										Validators.pattern("[a-z0-9._%+-]+@[a-z0-9._%+-]+\.[a-z]{2,3}$")
  									  ]
  									)
  										
  		});

  		*/



		/* Sin agrupar

		this.forma = new FormGroup({
			nombre: new FormControl('', [Validators.required, Validators.minLength(3)]),
  			apellido: new FormControl('', [Validators.required]),
  			correo: new FormControl('', 
  									  [  Validators.required, 
  										Validators.pattern("[a-z0-9._%+-]+@[a-z0-9._%+-]+\.[a-z]{2,3}$")
  									  ]
  									)
										
  		});  									
		*/  


  //esto retorna un observador(que esta pendiente de la data), por tanto me suscribo
   /*este se dispara por cualquier cambio del formulario(en cualquier campo)
   this.forma.valueChanges 
     .subscribe( data=>{
         console.log(data);
     });
     */
     //para un campo especifico


     //valores del campo
   this.forma.controls['username'].valueChanges 
     .subscribe( data=>{
         console.log(data);
     });


     //status del campo
   this.forma.controls['username'].statusChanges
     .subscribe( data=>{
         console.log(data);
     });




  }

  ngOnInit() {
  }


  agregarPasatiempo() {
      //castear a un array de elemento
       (<FormArray>this.forma.controls['pasatiempos']).push(   //push para adicionar un new formControls
           new FormControl("", Validators.required)
       )

       //console.log("sad");

       /*
          new FormControl("jugar", Validators.required),
           new FormControl("bailar", Validators.required),
           new FormControl("reir", Validators.required)

       */

  }



guardarCambios(){
	console.log('posteando');
	console.log(this.forma);
	console.log(this.forma.value);

	//reseteando los datos
	//this.forma.reset(this.usuario);

	//resetear y poner los valores por defectos
	//pero esto no sirve porque no restablece las validaciones nuevamente, pristine, untouch, etc
	//this.forma.setValue(this.usuario);
	
	//la forma correcta de resetear, y restaurar los datos por defecto
	//this.forma.reset(this.usuario);


	//resetear, y limpiar los datos o cambiarlos a vacio
	/*this.forma.reset({
		 nombrecompleto:{
  			 	  nombre: "",
  				apellido: ""
  		 },
  		 correo: ""
	
	});

	//otra forma de resetear es 
	this.forma.controls['correo'].setValue('nuevoCorreo@gmail.com');
	this.forma.get('nombrecompleto.nombre').setValue('nombrenuevo');
	this.forma.get('nombrecompleto.apellido').setValue('apellidosnuevo');
	
	*/
}



//validaciones personalizadas
//va a retornar un string que es de tipo booleano
//para declarar pares de valores
noHerrera( control:FormControl):{ [s:string]:boolean } {
   if (control.value ==="herrera") { //validacion fallo
     return { 
       noherrera:true
     }
   } else { ////validacion exitosa
       return null;
   }

}


noIgual ( control:FormControl): { [s:string]:boolean } {   //lo correcto es { [s:string]:boolean }    pero puedes usar "any"
   //como lo voy a poner en el pass2 entonces control.value=pass2

   
   /* 
   como nuestras validaciones estan en un contexto aparte, pues no reconoce al objeto "this"
   en el momento que esta corriendo esta funcion estará corriendo en otro contexto donde  "this" no existe
   para esto debemos especificar bind

      this.noIgual.bind(this.forma)  //esto equivale a decir que dentro de esta funcion noIgual "this" va a ser "this.forma"
  */

    let miforma:any = this;  //en este caso como fue pasado por bind this ahora es "this.forma"
   
   if (control.value !== miforma.controls["pass1"].value) { //validacion fallo //this.forma.get("pass1").value
     return { 
       esIgual:true
     }
   } else { ////validacion exitosa
       return null;
   }
   

   //console.log(this);

}



/*Validacion personalizada asyncrona. Este me va a retornar una promesa o un observable(para el observable necesitamos import { Observable } from 'rxjs/Rx';).
*/

existeUsuario ( control:FormControl): Promise<any> | Observable<any> {   

    //necesitamos hacer un proceso asyncrono que retorne "null si pasa", o un "objeto sino pasa"
   let promesa = new Promise(
             (resolve, reject) =>{
                 setTimeout( ()=>{
                        if (control.value=="osmel") {
                             resolve({   //si existe enviamos "existe:true"   
                                existe:true   
                             })
                        } else {  // caso contrario null
                              resolve(null)
                        }

                 }, 3000)
             }
   )
   return promesa;

   

}

}

