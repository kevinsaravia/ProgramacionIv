export function modulo(){
    var $ = el => document.querySelector(el),
        frmBuscarpelicula = $("#txtBuscarpelicula");
    frmBuscarpelicula.addEventListener('keyup',e=>{
        traerDatos(frmBuscarpelicula.value);
    });
    let modificarpelicula = (pelicula)=>{
        $("#frm-pelicula").dataset.accion = 'modificar';
        $("#frm-pelicula").dataset.idpelicula = pelicula.idpelicula;
        $("#txtdescripcionpelicula").value = pelicula.descripcion;
        $("#txtsinopsispelicula").value = pelicula.sinopsis;
        $("#txtgeneropelicula").value = pelicula.genero;
        $("#txtduracionpelicula").value = pelicula.duracion;
        
    };
    let eliminarpelicula = (idpelicula)=>{
        fetch(`private/modulos/pelicula/procesos.php?proceso=eliminarpelicula&pelicula=${idpelicula}`).then( resp=>resp.json() ).then(resp=>{
            traerDatos('');
        });
    };
    let traerDatos = (valor)=>{
        fetch(`private/modulos/pelicula/procesos.php?proceso=buscarpelicula&pelicula=${valor}`).then( resp=>resp.json() ).then(resp=>{
            let filas = ''
            resp.forEach(pelicula => {
                filas += `
                    <tr data-idpelicula='${pelicula.idpelicula}' data-pelicula='${ JSON.stringify(pelicula) }'>
                        <td>${pelicula.descripcion}</td>
                        <td>${pelicula.sinopsis}</td>
                        <td>${pelicula.genero}</td>
                        <td>${pelicula.duracion}</td>
                        <td>
                            <input type="button" class="btn btn-outline-danger text-white" value="del">
                        </td>
                    </tr>
                `;
            });
            $("#tbl-buscar-pelicula > tbody").innerHTML = filas;
            $("#tbl-buscar-pelicula > tbody").addEventListener("click",e=>{
                if( e.srcElement.parentNode.dataset.pelicula==null ){
                    let confirmar = confirm(`¿Estas seguro de eliminar este registro? `);

                    if (confirmar == true){
                    eliminarpelicula( e.srcElement.parentNode.parentNode.dataset.idpelicula );
                    alert("Registro eliminado..");
                }
                } else {
                    modificarpelicula( JSON.parse(e.srcElement.parentNode.dataset.pelicula) );
                }
            });
        });
    };
    traerDatos('');
}