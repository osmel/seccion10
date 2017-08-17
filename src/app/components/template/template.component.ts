import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-template',
  
  //templateUrl: './template_sin_envioDatos.html',   //este es un posteo sin enviar datos, es decir con el "ngModel  sin nada"
  
  //templateUrl: './template_unidireccional.html',   //[ngModel]="usuario.nombre" este es un posteo enviando datos, y recibiendo de forma unidireccional. 
  												   //es decir escribiendo solo en la vista, pero sin modificar el modelo	

  templateUrl: './template.component.html',   // [(ngModel)]: Es vidireccional, tanto cambia en el modelo como en la vista
  
  styleUrls: ['./template.component.css']
})
export class TemplateComponent implements OnInit {

   usuario:Object = {
   		nombre:"osmel",
   		apellido:"calderon",
   		correo: "osmel.calderon@gmail.com"
   }	

  constructor() { }

  ngOnInit() {
  }


  
  Guardar(formulario: any){  //en este caso el posteo fue sin enviar parametros, por tanto no llegan valores
  	  console.log('hola se esta haciendo posteo');
  	  console.log(formulario);
  	  console.log("valor de la vista", formulario.value);
  	  console.log("usuario Modelo", this.usuario);
  }


  funGuardar(){  //en este caso el posteo fue sin enviar parametros, por tanto no llegan valores
  	  console.log('hola se esta haciendo posteo');
  }

}
