<?php 
include('../../config/config.php');
$docente = new docente($conexion);

$proceso = '';
if( isset($_GET['proceso']) && strlen($_GET['proceso'])>0 ){
	$proceso = $_GET['proceso'];
}
$docente->$proceso( $_GET['docente'] );
print_r(json_encode($docente->respuesta));

class docente{
    private $datos = array(), $db;
    public $respuesta = ['msg'=>'correcto'];
    
    public function __construct($db){
        $this->db=$db;
    }
    public function recibirDatos($docente){
        $this->datos = json_decode($docente, true);
        $this->validar_datos();
    }
    private function validar_datos(){
        if( empty($this->datos['codigo']) ){
            $this->respuesta['msg'] = 'por favor ingrese el codigo del docente';
        }
        if( empty($this->datos['nombre']) ){
            $this->respuesta['msg'] = 'por favor ingrese el nombre del docente';
        }
        if( empty($this->datos['correo']) ){
            $this->respuesta['msg'] = 'por favor ingrese el correo del docente';
        }
        $this->almacenar_docente();
    }
    private function almacenar_docente(){
        if( $this->respuesta['msg']==='correcto' ){
            if( $this->datos['accion']==='nuevo' ){
                $this->db->consultas('
                    INSERT INTO docente (codigo,nombre,correo,telefono) VALUES(
                        "'. $this->datos['codigo'] .'",
                        "'. $this->datos['nombre'] .'",
                        "'. $this->datos['correo'] .'",
                        "'. $this->datos['telefono'] .'"
                    )
                ');
                $this->respuesta['msg'] = 'Registro insertado correctamente';
            } else if( $this->datos['accion']==='modificar' ){
                $this->db->consultas('
                    UPDATE docente SET
                        codigo     = "'. $this->datos['codigo'] .'",
                        nombre     = "'. $this->datos['nombre'] .'",
                        correo       = "'. $this->datos['correo'] .'",
                        telefono   = "'. $this->datos['telefono'] .'"
                    WHERE idDocente = "'. $this->datos['idDocente'] .'"
                ');
                $this->respuesta['msg'] = 'Registro actualizado correctamente';
            }
        }
    }
    public function buscarDocente($valor = ''){
        $this->db->consultas('
            select docente.idDocente, docente.codigo, docente.nombre, docente.correo, docente.telefono
            from docente
            where docente.codigo like "%'. $valor .'%" or docente.nombre like "%'. $valor .'%" or docente.correo like "%'. $valor .'%"
        ');
        return $this->respuesta = $this->db->obtener_data();
    }


    public function eliminarDocente($idDocente = 0){

        $this->db->consultas('
            DELETE docente
            FROM docente
            WHERE docente.idDocente="'.$idDocente.'"
        ');
        return $this->respuesta['msg'] = 'Registro eliminado correctamente';
    }
}
?>