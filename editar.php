<?php include 'inc/layout/header.php';
      include 'inc/funciones/funciones.php';
  $id=filter_var($_GET['id'],FILTER_VALIDATE_INT);//VALIDA QUE LO ENVIADO ES UN ENTERO
 if(!$id){
      die('NO ES VALIDO EL ID');//VALIAMOS EL ID QUE NO SEA UN STRING
 }
 $resultado=obtenerContacto($id);
 $contacto=$resultado->fetch_assoc();//cuardamos como un array asociativo
 
?>

<div class="contenedor-barra">
     <div class="contenedor barra">
          <a href="index.php" class="btn volver">volver</a>
          <h1>Editar contacto</h1>
     </div>
</div>
<div class="bg-amarillo contenedor sombra">
     <form id="contacto" action="#">
          <legend>
               Edite el contacto <span>Todos los campos son obigatorios</span>
               
          </legend>
          <?php include 'inc/layout/formulario.php';//llama a formulario?>
     </form>
</div>


<?php include 'inc/layout/footer.php';?>