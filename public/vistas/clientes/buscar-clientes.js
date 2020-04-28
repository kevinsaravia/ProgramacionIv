export function modulo(){
    var $ = el => document.querySelector(el),
        frmBuscarclientes = $("#txtBuscarclientes");
    frmBuscarclientes.addEventListener('keyup',e=>{
        traerDatos(frmBuscarclientes.value);
    });
    let modificarclientes = (clientes)=>{
        $("#frm-clientes").dataset.accion = 'modificar';
        $("#frm-clientes").dataset.id_cliente = clientes.id_cliente;
        $("#txtnombreclientes").value = clientes.nombre;
        $("#txtdireccionclientes").value = clientes.direccion;
        $("#txttelefonoclientes").value = clientes.telefono;
        $("#txtduiclientes").value = clientes.dui;
    };
    let eliminarclientes = (id_cliente)=>{
        fetch(`private/modulos/clientes/procesos.php?proceso=eliminarclientes&clientes=${id_cliente}`).then( resp=>resp.json() ).then(resp=>{
            traerDatos('');
        });
    };
    let traerDatos = (valor)=>{
        fetch(`private/modulos/clientes/procesos.php?proceso=buscarclientes&clientes=${valor}`).then( resp=>resp.json() ).then(resp=>{
            let filas = ''
            resp.forEach(clientes => {
                filas += `
                    <tr data-idcliente='${clientes.id_cliente}' data-clientes='${ JSON.stringify(clientes) }'>
                        <td>${clientes.nombre}</td>
                        <td>${clientes.direccion}</td>
                        <td>${clientes.telefono}</td>
                        <td>${clientes.dui}</td>
                        <td>
                            <input type="button" class="btn btn-outline-danger text-white" value="del">
                        </td>
                    </tr>
                `;
            });
            $("#tbl-buscar-clientes > tbody").innerHTML = filas;
            $("#tbl-buscar-clientes > tbody").addEventListener("click",e=>{
                if( e.srcElement.parentNode.dataset.clientes==null ){

                 let confirmar =confirm(`¿Estas seguro de eliminar este registro? `);

                 if (confirmar = true){
                    eliminarclientes( e.srcElement.parentNode.parentNode.dataset.idclientes );
                    alert("registro Eliminado correctamente..");
                }
                } else {
                    modificarclientes( JSON.parse(e.srcElement.parentNode.dataset.clientes) );
                }
            });
        });
    };
    traerDatos('');
}