<?php 
include('../../config/config.php');
$clientes = new clientes($conexion);

$proceso = '';
if( isset($_GET['proceso']) && strlen($_GET['proceso'])>0 ){
	$proceso = $_GET['proceso'];
}
$clientes->$proceso( $_GET['clientes'] );
print_r(json_encode($clientes->respuesta));

class clientes{
    private $datos = array(), $db;
    public $respuesta = ['msg'=>'correcto'];
    
    public function __construct($db){
        $this->db=$db;
    }
    public function recibirDatos($clientes){
        $this->datos = json_decode($clientes, true);
        $this->validar_datos();
    }
    private function validar_datos(){
        if( empty($this->datos['nombre']) ){
            $this->respuesta['msg'] = 'por favor ingrese el nombre';
        }
        if( empty($this->datos['direccion']) ){
            $this->respuesta['msg'] = 'por favor ingrese la direccion';
        }
        if( empty($this->datos['Telefono']) ){
            $this->respuesta['msg'] = 'por favor ingrese su Telefono';
        }
        if( empty($this->datos['dui']) ){
            $this->respuesta['msg'] = 'por favor ingrese el dui';
        }
        $this->almacenar_clientes();
    }
    private function almacenar_clientes(){
        if( $this->respuesta['msg']==='correcto' ){
            if( $this->datos['accion']==='nuevo' ){
                $this->db->consultas('
                    INSERT INTO clientess (nombre,direccion,Telefono,dui) VALUES(
                        "'. $this->datos['nombre'] .'",
                        "'. $this->datos['direccion'] .'",
                        "'. $this->datos['telefono'] .'",
                        "'. $this->datos['dui'] .'"
                       
                    )
                ');
                $this->respuesta['msg'] = 'Registro insertado correctamente';
            } else if( $this->datos['accion']==='modificar' ){
                $this->db->consultas('
                    UPDATE clientess SET
                        nombre     = "'. $this->datos['nombre'] .'",
                        direccion     = "'. $this->datos['direccion'] .'",
                        Telefono  = "'. $this->datos['Telefono'] .'",
                        dui   = "'. $this->datos['dui'] .'"
                    WHERE idclientes = "'. $this->datos['id_clientes'] .'"
                ');
                $this->respuesta['msg'] = 'Registro actualizado correctamente';
            }
        }
    }
    public function buscarclientes($valor = ''){
        $this->db->consultas('
            select clientess.id_clientes, clientess.nombre, clientess.direccion, clientess.Telefono, clientess.dui
            from clientess
            where clientess.nombre like "%'. $valor .'%" or clientess.direccion like "%'. $valor .'%"
        ');
        return $this->respuesta = $this->db->obtener_data();
    }
    public function eliminarclientes($id_clientes = 0){
        $this->db->consultas('
            DELETE clientess
            FROM clientess
            WHERE clientess.id_clientes="'.$id_clientes.'"
        ');
        return $this->respuesta['msg'] = 'Registro eliminado correctamente';
    }
}
?>