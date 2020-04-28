export function modulo(){
    var $ = el => document.querySelector(el),
        frmBuscarpeliculas = $("#txtBuscarpeliculas");
    frmBuscarpeliculas.addEventListener('keyup',e=>{
        traerDatos(frmBuscarpeliculas.value);
    });
    let modificarpeliculas = (peliculas)=>{
        $("#frm-peliculas").dataset.accion = 'modificar';
        $("#frm-peliculas").dataset.id_peliculas = peliculas.id_peliculas;
        $("#txtdescripcionpeliculas").value = peliculas.descripcion;
        $("#txtsinopsispeliculas").value = peliculas.sinopsis;
        $("#txtgeneropeliculas").value = peliculas.genero;
        $("#txtduracionpeliculas").value = peliculas.duracion;
    };
    let eliminarpeliculas = (id_peliculas)=>{
        fetch(`private/modulos/peliculas/procesos.php?proceso=eliminarpeliculas&peliculas=${id_peliculas}`).then( resp=>resp.json() ).then(resp=>{
            traerDatos('');
        });
    };
    let traerDatos = (valor)=>{
        fetch(`private/modulos/peliculas/procesos.php?proceso=buscarpeliculas&peliculas=${valor}`).then( resp=>resp.json() ).then(resp=>{
            let filas = ''
            resp.forEach(peliculas => {
                filas += `
                    <tr data-idpeliculas='${peliculas.id_peliculas}' data-peliculas='${ JSON.stringify(peliculas) }'>
                        <td>${peliculas.descripcion}</td>
                        <td>${peliculas.sinopsis}</td>
                        <td>${peliculas.genero}</td>
                        <td>${peliculas.duracion}</td>
                        <td>
                            <input type="button" class="btn btn-outline-danger text-white" value="del">
                        </td>
                    </tr>
                `;
            });
            $("#tbl-buscar-peliculas > tbody").innerHTML = filas;
            $("#tbl-buscar-peliculas > tbody").addEventListener("click",e=>{
                if( e.srcElement.parentNode.dataset.peliculas==null ){

                 let confirmar =confirm(`¿Estas seguro de eliminar este registro? `);

                 if (confirmar = true){
                    eliminarpeliculas( e.srcElement.parentNode.parentNode.dataset.idpeliculas );
                    alert("registro Eliminado correctamente..");
                }
                } else {
                    modificarpeliculas( JSON.parse(e.srcElement.parentNode.dataset.peliculas) );
                }
            });
        });
    };
    traerDatos('');
}