<?php 
include('../../config/config.php');
$alquiler = new alquiler($conexion);

$proceso = '';
if( isset($_GET['proceso']) && strlen($_GET['proceso'])>0 ){
	$proceso = $_GET['proceso'];
}
$alquiler->$proceso( $_GET['alquiler'] );
print_r(json_encode($alquiler->respuesta));

class alquiler{
    private $datos = array(), $db;
    public $respuesta = ['msg'=>'correcto'];
    
    public function __construct($db){
        $this->db=$db;
    }
    public function recibirDatos($alquiler){
        $this->datos = json_decode($alquiler, true);
        $this->validar_datos();
    }
    private function validar_datos(){
        if( empty($this->datos['codigo']) ){
            $this->respuesta['msg'] = 'por favor ingrese el codigo del alquiler';
        }
        if( empty($this->datos['nombre']) ){
            $this->respuesta['msg'] = 'por favor ingrese el nombre del alquiler';
        }
        if( empty($this->datos['correo']) ){
            $this->respuesta['msg'] = 'por favor ingrese el correo del alquiler';
        }
        $this->almacenar_alquiler();
    }
    private function almacenar_alquiler(){
        if( $this->respuesta['msg']==='correcto' ){
            if( $this->datos['accion']==='nuevo' ){
                $this->db->consultas('
                    INSERT INTO alquiler (codigo,nombre,correo,telefono) VALUES(
                        "'. $this->datos['codigo'] .'",
                        "'. $this->datos['nombre'] .'",
                        "'. $this->datos['correo'] .'",
                        "'. $this->datos['telefono'] .'"
                    )
                ');
                $this->respuesta['msg'] = 'Registro insertado correctamente';
            } else if( $this->datos['accion']==='modificar' ){
                $this->db->consultas('
                    UPDATE alquiler SET
                        codigo     = "'. $this->datos['codigo'] .'",
                        nombre     = "'. $this->datos['nombre'] .'",
                        correo       = "'. $this->datos['correo'] .'",
                        telefono   = "'. $this->datos['telefono'] .'"
                    WHERE idalquiler = "'. $this->datos['idalquiler'] .'"
                ');
                $this->respuesta['msg'] = 'Registro actualizado correctamente';
            }
        }
    }
    public function buscaralquiler($valor = ''){
        $this->db->consultas('
            select alquiler.idalquiler, alquiler.codigo, alquiler.nombre, alquiler.correo, alquiler.telefono
            from alquiler
            where alquiler.codigo like "%'. $valor .'%" or alquiler.nombre like "%'. $valor .'%" or alquiler.correo like "%'. $valor .'%"
        ');
        return $this->respuesta = $this->db->obtener_data();
    }


    public function eliminaralquiler($idalquiler = 0){

        $this->db->consultas('
            DELETE alquiler
            FROM alquiler
            WHERE alquiler.idalquiler="'.$idalquiler.'"
        ');
        return $this->respuesta['msg'] = 'Registro eliminado correctamente';
    }
}
?>