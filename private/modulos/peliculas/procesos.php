<?php 
include('../../config/config.php');
$peliculas = new peliculas($conexion);

$proceso = '';
if( isset($_GET['proceso']) && strlen($_GET['proceso'])>0 ){
	$proceso = $_GET['proceso'];
}
$peliculas->$proceso( $_GET['peliculas'] );
print_r(json_encode($peliculas->respuesta));

class peliculas{
    private $datos = array(), $db;
    public $respuesta = ['msg'=>'correcto'];
    
    public function __construct($db){
        $this->db=$db;
    }
    public function recibirDatos($peliculas){
        $this->datos = json_decode($peliculas, true);
        $this->validar_datos();
    }
    private function validar_datos(){
        if( empty($this->datos['nombre']) ){
            $this->respuesta['msg'] = 'por favor ingrese el nombre de la peliculas';
        }
        if( empty($this->datos['codigo']) ){
            $this->respuesta['msg'] = 'por favor ingrese el codigo de la peliculas';
        }
        
        $this->almacenar_peliculas();
    }
    private function almacenar_peliculas(){
        if( $this->respuesta['msg']==='correcto' ){
            if( $this->datos['accion']==='nuevo' ){
                $this->db->consultas('
                    INSERT INTO peliculas (nombre,codigo) VALUES(
                        "'. $this->datos['nombre'] .'",
                        "'. $this->datos['codigo'] .'"
                        
                    )
                ');
                $this->respuesta['msg'] = 'Registro insertado correctamente';
            } else if( $this->datos['accion']==='modificar' ){
                $this->db->consultas('
                    UPDATE peliculas SET
                        codigo     = "'. $this->datos['codigo'] .'",
                        nombre     = "'. $this->datos['nombre'] .'"
                    WHERE idpeliculas = "'. $this->datos['idpeliculas'] .'"
                ');
                $this->respuesta['msg'] = 'Registro actualizado correctamente';
            }
        }
    }
    public function buscarpeliculas($valor = ''){
        $this->db->consultas('
            select peliculas.id.peliculas, peliculas.codigo, peliculas.nombre
            from peliculas
            where peliculas.codigo like "%'. $valor .'%" or peliculas.nombre like "%'. $valor .'%"
        ');
        return $this->respuesta = $this->db->obtener_data();
    }
    public function eliminarpeliculas($id.peliculas = 0){
        $this->db->consultas('
            DELETE peliculas
            FROM peliculas
            WHERE peliculas.idpeliculas="'.$idpeliculas.'"
        ');
        return $this->respuesta['msg'] = 'Registro eliminado correctamente';
    }
}
?>