<div class="campos">
                <div class="campo">
                    <label for="nombre">Nombre:</label>
                    <input type="text" placeholder="Nombre contacto" id="nombre" 
                    value="<?php echo($contacto['ag_nombre']) ?$contacto['ag_nombre']:''; //pregunta si se importo un contacto para imprimir sus valores?>"
                    >
                </div>
                <div class="campo">
                    <label for="empresa">Empresa:</label>
                    <input type="text" placeholder="Nombre empresa" id="empresa"
                    value="<?php echo($contacto['ag_nom_empresa']) ?$contacto['ag_nom_empresa']:''; //pregunta si se importo un contacto para imprimir sus valores?>"
                    >
                </div>
                <div class="campo">
                    <label for="telefono">Telefono:</label>
                    <input type="tel" placeholder="Telefono" id="telefono"
                    value="<?php echo($contacto['ag_telefono']) ?$contacto['ag_telefono']:''; //pregunta si se importo un contacto para imprimir sus valores?>"
                    ><!--validcion de numero de telefono type tel-->
                </div>
                
            </div>
            <div class="campo enviar">
            <?php
                $textoBtn=($contacto['ag_id'])?'Guardar':'Añadir';
                $accion=($contacto['ag_id'])?'editar':'crear';
            ?>
                    <input type="hidden" id="accion" value="<?php echo $accion;?>">
                    <?php if(isset($contacto['ag_id'])){?>
                        <input type="hidden" id="id" value="<?php echo $contacto['ag_id'];?>">  
                    <?php }?>

                    <input type="submit"  value="<?php echo $textoBtn;?>">
                    
            </div>