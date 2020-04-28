<?php 
include('../../config/config.php');
$cliente = new cliente($conexion);

$proceso = '';
if( isset($_GET['proceso']) && strlen($_GET['proceso'])>0 ){
	$proceso = $_GET['proceso'];
}
$cliente->$proceso( $_GET['cliente'] );
print_r(json_encode($cliente->respuesta));

class cliente{
    private $datos = array(), $db;
    public $respuesta = ['msg'=>'correcto'];
    
    public function __construct($db){
        $this->db=$db;
    }
    public function recibirDatos($cliente){
        $this->datos = json_decode($cliente, true);
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
        $this->almacenar_cliente();
    }
    private function almacenar_cliente(){
        if( $this->respuesta['msg']==='correcto' ){
            if( $this->datos['accion']==='nuevo' ){
                $this->db->consultas('
                    INSERT INTO cliente (nombre,direccion,Telefono,dui) VALUES(
                        "'. $this->datos['nombre'] .'",
                        "'. $this->datos['direccion'] .'",
                        "'. $this->datos['telefono'] .'",
                        "'. $this->datos['dui'] .'"
                       
                    )
                ');
                $this->respuesta['msg'] = 'Registro insertado correctamente';
            } else if( $this->datos['accion']==='modificar' ){
                $this->db->consultas('
                    UPDATE cliente SET
                        nombre     = "'. $this->datos['nombre'] .'",
                        direccion     = "'. $this->datos['direccion'] .'",
                        Telefono  = "'. $this->datos['Telefono'] .'",
                        dui   = "'. $this->datos['dui'] .'"
                    WHERE idcliente = "'. $this->datos['id_cliente'] .'"
                ');
                $this->respuesta['msg'] = 'Registro actualizado correctamente';
            }
        }
    }
    public function buscarcliente($valor = ''){
        $this->db->consultas('
            select cliente.id_cliente, cliente.nombre, cliente.direccion, cliente.Telefono, cliente.dui
            from cliente
            where cliente.nombre like "%'. $valor .'%" or cliente.direccion like "%'. $valor .'%"
        ');
        return $this->respuesta = $this->db->obtener_data();
    }
    public function eliminarcliente($id_cliente = 0){
        $this->db->consultas('
            DELETE cliente
            FROM cliente
            WHERE cliente.id_cliente="'.$id_cliente.'"
        ');
        return $this->respuesta['msg'] = 'Registro eliminado correctamente';
    }
}
?>