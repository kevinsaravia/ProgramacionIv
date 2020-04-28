export function modulo(){
    var $ = el => document.querySelector(el),
        frmalquiler = $("#frm-alquiler");
    frmalquiler.addEventListener("submit",e=>{
        e.preventDefault();
        e.stopPropagation();
        
        let alquiler = {
            accion    : frmalquiler.dataset.accion,
            idalquiler  : frmalquiler.dataset.idalquiler,
            idcliente    : $("#txtidclientealquiler").value,
            idpelicula    : $("#txtidpeliculaalquiler").value,
            fechaprestamo      : $("#txtfechaprestamoalquiler").value,
            fechadevolucion  : $("#txtfechadevolucionalquiler").value,
            valor  : $("#txtvaloralquiler").value
        };
        fetch(`private/modulos/alquiler/procesos.php?proceso=recibirDatos&alquiler=${JSON.stringify(alquiler)}`).then( resp=>resp.json() ).then(resp=>{
            $("#respuestaalquiler").innerHTML = `
                <div class="alert alert-success" role="alert">
                    ${resp.msg}
                </div>
            `;
        });
    });
    frmalquiler.addEventListener("reset",e=>{
        $("#frm-alquiler").dataset.accion = 'nuevo';
        $("#frm-alquiler").dataset.idalquiler = '';
    });
}