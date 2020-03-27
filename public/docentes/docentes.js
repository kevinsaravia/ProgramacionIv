export function modulo(){
    var $ = el => document.querySelector(el),
        frmDocentes = $("#frm-docentes");
    frmDocentes.addEventListener("submit",e=>{
        e.preventDefault();
        e.stopPropagation();
        
        let docente = {
            accion    : frmDocentes.dataset.accion,
            idDocente  : frmDocentes.dataset.iddocente,
            codigo    : $("#txtCodigoDocente").value,
            nombre    : $("#txtNombreDocente").value,
            correo       : $("#txtCorreoDocente").value,
            telefono  : $("#txtTelefonoDocente").value
        };
        fetch(`private/modulos/docentes/procesosDOC.php?proceso=recibirDatos&docente=${JSON.stringify(docente)}`).then( resp=>resp.json() ).then(resp=>{
            $("#respuestaDocente").innerHTML = `
                <div class="alert alert-success" role="alert">
                    ${resp.msg}
                </div>
            `;
        });
    });
    frmDocentes.addEventListener("reset",e=>{
        $("#frm-docente").dataset.accion = 'nuevo';
        $("#frm-docente").dataset.iddocente = '';
    });
}