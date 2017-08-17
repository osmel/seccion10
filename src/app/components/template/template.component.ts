import { Component, OnInit } from '@angular/core';

import {NgForm} from '@angular/forms'   

@Component({
  selector: 'app-template',
  
  //templateUrl: './template_sin_envioDatos.html',   //este es un posteo sin enviar datos, es decir con el "ngModel  sin nada"
  
  //templateUrl: './template_unidireccional.html',   //[ngModel]="usuario.nombre" este es un posteo enviando datos, y recibiendo de forma unidireccional. 
  												   //es decir escribiendo solo en la vista, pero sin modificar el modelo	

  templateUrl: './template.component.html',   // [(ngModel)]: Es vidireccional, tanto cambia en el modelo como en la vista

   //styleUrls: ['./template.component.css']
   styles: [
   ` 
   	.ng-invalid.ng-touched:not(form) {
   		border:1px solid red;
   	} 
   `
   ]
})
export class TemplateComponent implements OnInit {

   usuario:Object = {
   		nombre:null, //"osmel",
   		apellido:null, //"calderon",
   		correo: null, // "osmel.calderon@gmail.com"
   		pais:"", //"Cu"
   		sexo:"Hombre", //"Cu"
   		asignatura: "M",
   		acepta: false
   }	

   paises= [{
   	 codigo:"Cri",
   	 nombre: "Costa Rica"
    },
    {
   	 codigo:"Cu",
   	 nombre: "Cuba"
    }
   ]

   sexos=["Hombre", "Mujer"]

   asignaturas= [{
   	 id:"M",
   	 nombre: "Matematica"
    },
    {
   	 id:"C",
   	 nombre: "Computación"
    }
   ]



  constructor() { }

  ngOnInit() {
  }


  
  Guardar(formulario: NgForm){  //en este caso el posteo fue sin enviar parametros, por tanto no llegan valores
  	  console.log('hola se esta haciendo posteo');
  	  console.log(formulario);
  	  console.log("valor de la vista", formulario.value);
  	  console.log("usuario Modelo", this.usuario);
  }


  funGuardar(){  //en este caso el posteo fue sin enviar parametros, por tanto no llegan valores
  	  console.log('hola se esta haciendo posteo');
  }

}
