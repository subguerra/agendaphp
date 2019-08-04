//const formularioContacto=$(''); masomennos usando jqquery
const formularioContactos=document.querySelector('#contacto');
const listadoContactos=document.querySelector('#listado-contactos tbody');
const inputBuscador=document.querySelector('#buscar');


eventListeners();
function eventListeners()
{// cuando el formulario de crear o editar se ejecuta
    formularioContactos.addEventListener('submit',leerFormulario);// en este se pasa el nombre dela funcion
    if(listadoContactos){
    listadoContactos.addEventListener('click',eliminarContacto);
    }
    inputBuscador.addEventListener('input',buscarContactos); 
    numeroContactos();
}

function leerFormulario(e){
    e.preventDefault();//funcion recomendada para que no carge la funccion default del boton al ser enviado  en  0; quitan los valores de la url

    //leer los datos de los imputs
    const nombre=document.querySelector('#nombre').value,
          empresa=document.querySelector('#empresa').value,
          telefono=document.querySelector('#telefono').value,
          accion=document.querySelector('#accion').value;

    
    if(nombre==='' || empresa==='' || telefono==='' )
    {// 2 parametros texto y clase
        mostrarNotificacion("todos los campos son obligatorios","error");
    }else{// pasa la validacion pasar, llamado a ajax
       // mostrarNotificacion("exitoso","correcto");
       const infoContacto=new FormData();//la mejor forma de leer un formulario para posteriormente enviarlos por ajax
       infoContacto.append('nombre',nombre);
       infoContacto.append('empresa',empresa);
       infoContacto.append('telefono',telefono);
       infoContacto.append('accion',accion);
       console.log(...infoContacto);// los puntos son para que se haga una copia del console
       if(accion==='crear')
       {//crearemos un nuevo elemento
            insertarBD(infoContacto);
       }else{//editaremos un elemento
            //leemos el id
            const idResgistro=document.querySelector('#id').value;
            infoContacto.append('id',idResgistro);
            actualizarRegistro(infoContacto);
       }

    }


}

function insertarBD(infoContacto)
{//llamado ajax
    
//crear el objeto
    const xhr = new XMLHttpRequest();
//abrir la conexion
    xhr.open('POST','inc/modelos/modelo-contactos.php',true);
//pasar los datos
    xhr.onload=function(){
        if(this.status===200){
            //console.log("conexion"+ status);
            //console.log(JSON.parse(xhr.responseText));
            //leemos la respuesta de php
            const respuesta=JSON.parse(xhr.responseText);
            // leemo cada datos y lo insertamos en html con templade strngs
            const nuevoContacto=document.createElement('tr'); //creamos un nueo renlo dentro de la tabla de cntactos
            //ingresamos los datos al nuevo elemnto de la tabla
            nuevoContacto.innerHTML=`
                <td>${respuesta.datos.nombre}</td>
                <td>${respuesta.datos.empresa}</td>
                <td>${respuesta.datos.telefono}</td>
            `;// cerramos el templde string
            //creams un contenedor para el renglon
              const contenedorAcciones= document.createElement('td');

            //creamos el elemnto de boton editar
            const iconoEditar=document.createElement('i');
            iconoEditar.classList.add('fas','fa-pen-square');//le agregamos dos classes el nuevo elemento
            // como el icono esta dentro de un etiqueta a tenemos que crearla y agregar elicono dentro de la etiqueta a
            const btnEditar=document.createElement('a');// que seri un elemnto a href
            btnEditar.appendChild(iconoEditar);// agregamos un hijo  a est variable 
            btnEditar.href=`editar.php?id=${respuesta.datos.id_insertado}`;// agregamos la ruta para editar el id del renglon
            btnEditar.classList.add('btn','btn-editar');
            //lo agregamos al padre
            contenedorAcciones.appendChild(btnEditar);//le agregamos el bton creado al contenedor de botones
            // ahora creamos el icono de eliminar----
            const iconoEliminar=document.createElement('i');
            iconoEliminar.classList.add('fas','fa-trash-alt');//le agregamos dos classes el nuevo elemento
            // ahora creamos el boton de eliminar
             const btnEliminar=document.createElement('button');
             btnEliminar.appendChild(iconoEliminar);
             btnEliminar.setAttribute('data-id',respuesta.datos.id_insertado);
             btnEliminar.classList.add('btn','btn-borrar');
             //gregamos al elemnto padre
             contenedorAcciones.appendChild(btnEliminar);
             // agregamos el contenedor de botones al los nuevos contacto al tr
             nuevoContacto.appendChild(contenedorAcciones);
            //agregamos el tr al tbody y ahoora aparece en el html
            listadoContactos.appendChild(nuevoContacto);
            //resetear el formilario
            document.querySelector('form').reset();
            //mostrar notificacion
            mostrarNotificacion('contacto creado exitosamente','correcto');//lanzamos mensaje con los css de .correcto
            numeroContactos();//para actualizar el contador de contactos

        }

    }
//enviar datos
    xhr.send(infoContacto);
//leer lo errores
}

function actualizarRegistro(datos){
    //crear el objeto
    const xhr=new XMLHttpRequest();
    //abrir la conexion
    xhr.open('POST','inc/modelos/modelo-contactos.php',true);
    //leer la respuesta
    xhr.onload=function(){
        if(this.status==200){
            //console.log(JSON.parse(xhr.responseText));
            const respuesta=JSON.parse(xhr.responseText);
            if(respuesta.respuesta==='correcto'){
                //hacemos una respuesta de correcto
                mostrarNotificacion('Contacto editado correctamente','correcto');
            }else{
                //error
                mostrarNotificacion('hubo un error de edicion','error');
            }
            // despues de 3 segundo independiente de la respuesta redireccinonar a pag principl
            setTimeout(()=>{
                    window.location.href='index.php';
            },4000);
                       
        }
    }
    //enviar la peticion
    xhr.send(datos);
}

function eliminarContacto(e){
    //console.log(e.target.parentElement.classList.contains('btn-borrar'));//sirve para llamar el boton qque fue clickeado en el evento  se usa para acceder a un elemento desde el hijo al padre
    if(e.target.parentElement.classList.contains('btn-borrar'))
    {
        const id=e.target.parentElement.getAttribute('data-id');
        
        // prguntaos a usurio si esta seguro
        const respuesta=confirm("Esta seguro de eliminar este contacto?");//confirm es nativo del navegador 
        
        if(respuesta){
            //lammamos a ajax

            //crear objeto
            const xhr=new XMLHttpRequest();

            //brir conexion
            xhr.open('GET',`inc/modelos/modelo-contactos.php?id=${id}&accion=borrar`, true);
            
            
            //leer la respuesta
            xhr.onload=function(){
                if(this.status===200){
                    const resultado=JSON.parse(xhr.responseText);
                    if(resultado.respuesta==='correcto'){
                        e.target.parentElement.parentElement.parentElement.remove();//eliminamos el elemento desde el hijo 
                        mostrarNotificacion('elemento borrado','error');            //usando el identificador del evento e
                        numeroContactos();//para actualizar el contador de contactos
                    }else{
                            mostrarNotificacion('Hubo un error...','error');
                        }        
                }
            }
            //enviar la peticion
            xhr.send();
        }
        
    }

}

function mostrarNotificacion(mensaje,clase){
    const notificacion=document.createElement('div');
    notificacion.classList.add(clase,'notificacion','sombra');
    notificacion.textContent=mensaje; 
    

    //formulario
    formularioContactos.insertBefore(notificacion,document.querySelector('form legend'));
    // ocultar y mostrar la notificacion
    setTimeout(() =>{
        notificacion.classList.add('visible');
        setTimeout(()=>{
            notificacion.classList.remove('visible');
            setTimeout(()=>{},200);
            notificacion.remove();
        },3000);
    },100);    
    
}
// buscador de registros
function buscarContactos(e){//analizar para siweb-------------------------
    
    const expresion=new RegExp(e.target.value,"i");// el i es para que no sea sencibles a mayusculas y minusculas
          registros=document.querySelectorAll('tbody tr');

          registros.forEach(registro=>{
            registro.style.display='none';//con esto ocultamos todos los registros en pantalla
            //y luego los vamos a mostrar
            
            if(registro.childNodes[1].textContent.replace(/\s/g," ").search(expresion)!=-1){//con esto llamamos al prier elemento de cada regsitro en donde se guarda el nombre de contacto, y la expresion regular es para los espacios
                registro.style.display='table-row';//pintamos el renglon del registro.

            }
            
          }
          );
     numeroContactos();//imprimimos el numero de contactos

}
function numeroContactos(){//numero de contactos visibles  de la tabla
    const totalContactos=document.querySelectorAll('tbody tr');//consultamos todos los tr de la tabla
    const contenedorNumero=document.querySelector('.total-contactos span');//ubicamos el elmento donde queremos imprimir
    let total=0;
    totalContactos.forEach(contacto =>{//
        if(contacto.style.display===''||contacto.style.display==='table-row'){
            total++;
        }

    });
    contenedorNumero.textContent=total;//imprimimos la variable en html

}
function bug(mensaje){console.log(mensaje);}

