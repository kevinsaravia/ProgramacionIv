export function modulo(){
    var $ = el => document.querySelector(el),
        frmclientes = $("#frm-clientes");
    frmclientes.addEventListener("submit",e=>{
        e.preventDefault();
        e.stopPropagation();
        
        let clientes = {
            accion    : frmclientes.dataset.accion,
            idclientes  : frmclientes.dataset.idalumno,
            nombre    : $("#txtnombreclientes").value,
            direccion : $("#txtDireccionclientes").value,
            telefono  : $("#txtTelefonoclientes").value,
            dui  : $("#txtduiclientes").value
        };
        fetch(`private/modulos/clientes/procesos.php?proceso=recibirDatos&clientes=${JSON.stringify(clientes)}`).then( resp=>resp.json() ).then(resp=>{
            $("#respuestaclientes").innerHTML = `
                <div class="alert alert-success" role="alert">
                    ${resp.msg}
                </div>
            `;
        });
    });
    frmclientes.addEventListener("reset",e=>{
        $("#frm-clientes").dataset.accion = 'nuevo';
        $("#frm-clientes").dataset.idalumno = '';
    });
}