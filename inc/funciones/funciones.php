<?php

function  obtenerContactos(){
     include 'bd.php'; //esto llama el php con los datos de la conexion a bd
     try{
           $consulta=$conn->query("SELECT `ag_id`,`ag_nombre`,`ag_nom_empresa`,`ag_telefono` FROM `agendaphp` WHERE 1");
          
          return $consulta;
     }catch(Exception $e)
          {    
               echo "error!!".$e->getMessage();
               return false;

          }
}
function  obtenerContacto($id){
     include 'bd.php'; //esto llama el php con los datos de la conexion a bd
     try{
           $consulta=$conn->query("SELECT `ag_id`,`ag_nombre`,`ag_nom_empresa`,`ag_telefono` FROM `agendaphp` WHERE ag_id=$id");
          
          return $consulta;
     }catch(Exception $e)
          {    
               echo "error!!".$e->getMessage();
               return false;

          }
}