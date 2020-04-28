export function modulo(){
    var $ = el => document.querySelector(el),
        frmBuscaralquiler = $("#txtBuscaralquiler");
    frmBuscaralquiler.addEventListener('keyup',e=>{
        traerDatos(frmBuscaralquiler.value);
    });
    let modificaralquiler = (alquiler)=>{
        $("#frm-alquiler").dataset.accion = 'modificar';
        $("#frm-alquiler").dataset.idalquiler = alquiler.idalquiler;
        $("#txtidclientealquiler").value = alquiler.idcliente;
        $("#txtidpeliculaalquiler").value = alquiler.idpelicula;
        $("#txtfechaprestamoalquiler").value = alquiler.fechaprestamo;
        $("#txtfechadevolucionalquiler").value = alquiler.fechadevolucion;
        $("#txtvaloralquiler").value = alquiler.valor;
    };
    let eliminaralquiler = (idalquiler)=>{
        fetch(`private/modulos/alquiler/procesos.php?proceso=eliminaralquiler&alquiler=${idalquiler}`).then( resp=>resp.json() ).then(resp=>{
            traerDatos('');
        });
    };
    let traerDatos = (valor)=>{
        fetch(`private/modulos/alquiler/procesos.php?proceso=buscaralquiler&alquiler=${valor}`).then( resp=>resp.json() ).then(resp=>{
            let filas = ''
            resp.forEach(alquiler => {
                filas += `
                    <tr data-idalquiler='${alquiler.idalquiler}' data-alquiler='${ JSON.stringify(alquiler) }'>
                        <td>${alquiler.idcliente}</td>
                        <td>${alquiler.idpelicula}</td>
                        <td>${alquiler.fechaprestamo}</td>
                        <td>${alquiler.fechadevolucion}</td>
                        <td>${alquiler.valor}</td>
                        <td>
                            <input type="button" class="btn btn-outline-danger text-white" value="del">
                        </td>
                    </tr>
                `;
            });
            $("#tbl-buscar-alquiler > tbody").innerHTML = filas;
            $("#tbl-buscar-alquiler > tbody").addEventListener("click",e=>{
                if( e.srcElement.parentNode.dataset.alquiler==null ){
                    let confirmar = confirm(`¿Estas seguro de eliminar este registro? `);

                    if (confirmar == true){
                    eliminaralquiler( e.srcElement.parentNode.parentNode.dataset.idalquiler );
                    alert("Registro eliminado..");
                }
                } else {
                    modificaralquiler( JSON.parse(e.srcElement.parentNode.dataset.alquiler) );
                }
            });
        });
    };
    traerDatos('');
}