export function modulo(){
    var $ = el => document.querySelector(el),
        frmBuscarmateria = $("#txtBuscarmateria");
    frmBuscarmateria.addEventListener('keyup',e=>{
        traerDatos(frmBuscarmateria.value);
    });
    let modificarmateria = (materia)=>{
        $("#frm-materia").dataset.accion = 'modificar';
        $("#frm-materia").dataset.id.materia = materia.id.materia;
        $("#txtnombremateria").value = materia.nombre;
        $("#txtcodigomateria").value = materia.codigo;
       
    };
    let eliminarmateria = (id.materia)=>{
        fetch(`private/modulos/materia/procesos.php?proceso=eliminarmateria&materia=${id.materia}`).then( resp=>resp.json() ).then(resp=>{
            traerDatos('');
        });
    };
    let traerDatos = (valor)=>{
        fetch(`private/modulos/materia/procesos.php?proceso=buscarmateria&materia=${valor}`).then( resp=>resp.json() ).then(resp=>{
            let filas = ''
            resp.forEach(materia => {
                filas += `
                    <tr data-idmateria='${materia.id.materia}' data-materia='${ JSON.stringify(materia) }'>
                        <td>${materia.nombre}</td>
                        <td>${materia.codigo}</td>
                        
                        <td>
                            <input type="button" class="btn btn-outline-danger text-white" value="del">
                        </td>
                    </tr>
                `;
            });
            $("#tbl-buscar-materia > tbody").innerHTML = filas;
            $("#tbl-buscar-materia > tbody").addEventListener("click",e=>{
                if( e.srcElement.parentNode.dataset.alumno==null ){

                 let confirmar =confirm(`¿Estas seguro de eliminar este registro? `);

                 if (confirmar = true){
                    eliminarmateria( e.srcElement.parentNode.parentNode.dataset.idmateria );
                    alert("registro Eliminado correctamente..");
                }
                } else {
                    modificarmateria( JSON.parse(e.srcElement.parentNode.dataset.materia) );
                }
            });
        });
    };
    traerDatos('');
}