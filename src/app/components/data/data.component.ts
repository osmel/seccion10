import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl,  Validators, FormArray } from '@angular/forms';


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
        ])
  										
  		});

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


}

