export function modulo(){
    var $ = el => document.querySelector(el),
        frmpeliculas = $("#frm-peliculas");
    frmpeliculas.addEventListener("submit",e=>{
        e.preventDefault();
        e.stopPropagation();
        
        let peliculas = {
            accion    : frmpeliculas.dataset.accion,
            idpeliculas  : frmpeliculas.dataset.idalumno,
            descripcion    : $("#txtdescripcionpeliculas").value,
            sinopsis : $("#txtsinopsispeliculas").value,
            genero  : $("#txtgeneropeliculas").value,
            duracion  : $("#txtduracionpeliculas").value
        };
        fetch(`private/modulos/peliculas/procesos.php?proceso=recibirDatos&peliculas=${JSON.stringify(peliculas)}`).then( resp=>resp.json() ).then(resp=>{
            $("#respuestapeliculas").innerHTML = `
                <div class="alert alert-success" role="alert">
                    ${resp.msg}
                </div>
            `;
        });
    });
    frmpeliculas.addEventListener("reset",e=>{
        $("#frm-peliculas").dataset.accion = 'nuevo';
        $("#frm-peliculas").dataset.idpeliculas = '';
    });
}