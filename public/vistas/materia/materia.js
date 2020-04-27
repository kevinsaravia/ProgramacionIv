export function modulo(){
    var $ = el => document.querySelector(el),
        frmmateria = $("#frm-materia");
    frmmateria.addEventListener("submit",e=>{
        e.preventDefault();
        e.stopPropagation();
        
        let materia = {
            accion    : frmmateria.dataset.accion,
            idmateria  : frmmateria.dataset.idmateria,
            codigo    : $("#txtCodigomateria").value,
            nombre    : $("#txtNombremateria").value
            
        };
        fetch(`private/modulos/materia/procesos.php?proceso=recibirDatos&materia=${JSON.stringify(materia)}`).then( resp=>resp.json() ).then(resp=>{
            $("#respuestamateria").innerHTML = `
                <div class="alert alert-success" role="alert">
                    ${resp.msg}
                </div>
            `;
        });
    });
    frmmateria.addEventListener("reset",e=>{
        $("#frm-materia").dataset.accion = 'nuevo';
        $("#frm-materia").dataset.materia = '';
    });
}