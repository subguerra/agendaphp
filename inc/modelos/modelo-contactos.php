<?php
if(isset($_POST['accion'])){
if($_POST['accion']=='crear'){
     //creara un nuevo registro en la bd
     require_once('../funciones/bd.php'); //llama a la pagina de bd desde su carpeta
     
     json_encode($_POST);// vuelve a convertir la cadena a un json
     // validamos las entradas por seguridad con filtrs de sanitacion
     $nombre=filter_var($_POST['nombre'],FILTER_SANITIZE_STRING);// PROPIO DE PHP7 PARA VALDAR DATOS Y EVITAR INYECCIONES DE SQL
     $empresa=filter_var($_POST['empresa'],FILTER_SANITIZE_STRING);
     $telefono=filter_var($_POST['telefono'],FILTER_SANITIZE_STRING);
     
     
     try
     {
          $stmt=$conn->prepare("INSERT INTO agendaphp (ag_nombre,ag_nom_empresa,ag_telefono) VALUES (?,?,?);"); //insertamos a base de datos con sql
          // como trabajamos con statements entonces samos esta sintaxis 
          //$stmt->bind_param("cada tipo de varibles a insertar ",las variables,variable2,..);
          $stmt->bind_param("sss",$nombre,$empresa,$telefono);// inserta los valores ala conexion stmt
          $stmt->execute(); //ejecuta 
          if($stmt->affected_rows==1) //valida que un renglon en la tabla fue afectado
          {
               $respuesta=array(
                    'respuesta'=>'correcto',
                    'info'=>$stmt->affected_rows,  // retorna cuantos regitrs fueron afectados en bd
                    
                    'datos'=>array(
                         'nombre'=>$nombre,
                         'empresa'=>$empresa,
                         'telefono'=>$telefono,
                         'id_insertado'=>$stmt->insert_id // regresa el numero del id inertdo     
                    )
               );
          }else{
               $respuesta=array(
                    'respuesta'=>'incorrecto');
          }
          $stmt->close(); //cierra conexion
          $conn->close();
     }catch(Exception $e )// si tienes un error guardalo en E
          {$respuesta=array(// lo convertimos a un array asociativo 
               'error' =>$e-> getMessage()//guarda el error
          );

     }

     echo json_encode($respuesta);//con esta funcion estamos retornando por json los que esta en los array de respuesta.
  
}
}

if(isset($_GET['accion'])){
if($_GET['accion']=='borrar'){
     require_once('../funciones/bd.php');
     
     //echo json_encode($_GET);
     $id=filter_var($_GET['id'],FILTER_SANITIZE_NUMBER_INT);// PARA VALIDAR QUE RECIVE UN NUMERO
     try{
          $stmt=$conn->prepare("DELETE FROM `agendaphp` WHERE `agendaphp`.`ag_id` = ?");// usando tambien statements
          
          $stmt->bind_param("i",$id);// entero
          $stmt->execute();//ejecuta query
          if($stmt->affected_rows==1){
               $respuesta=array(
                    'respuesta'=>'correcto'
               );//---------------
          }else{
               $respuesta=array(
                    'respuesta'=>'no se pudo comprobar'
               );
          }
          $stmt->close();
          $conn->close();
     }catch(Exception $e){
          $respuesta=array(
               'error'=>$e->getMessage()
          );
     }
     echo json_encode($respuesta);
}//cierre accion
}//cierra isset

if(isset($_POST['accion'])){
if($_POST['accion']=='editar'){
     //para la opcion de editar
     require_once('../funciones/bd.php'); //llama a la pagina de bd desde su carpeta
     
     json_encode($_POST);// vuelve a convertir la cadena a un json
     // validamos las entradas por seguridad con filtrs de sanitacion
     $nombre=filter_var($_POST['nombre'],FILTER_SANITIZE_STRING);// PROPIO DE PHP7 PARA VALDAR DATOS Y EVITAR INYECCIONES DE SQL
     $empresa=filter_var($_POST['empresa'],FILTER_SANITIZE_STRING);
     $telefono=filter_var($_POST['telefono'],FILTER_SANITIZE_STRING);
     $id=filter_var($_POST['id'],FILTER_SANITIZE_NUMBER_INT);
     try{ 
          $stmt=$conn->prepare("UPDATE `agendaphp` SET `ag_nombre` = ?, `ag_nom_empresa` = ?, `ag_telefono` = ? WHERE `agendaphp`.`ag_id` = ?;");
          $stmt->bind_param("sssi",$nombre,$empresa,$telefono,$id);
          $stmt->execute();
          if($stmt->affected_rows==1){
               $respuesta=array(
                    'respuesta'=>'correcto'
               );
          }else{
               $respuesta=array(
                    'respuesta'=>'error'
               );
          }
          $stmt->close();
          $conn->close();

     } catch(Exception $e){
          $respuesta=array(
               'error'=>$e->getMessage()
          );
     }
     echo json_encode($respuesta);
}
}

