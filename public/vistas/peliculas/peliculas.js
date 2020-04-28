export function modulo(){
    var $ = el => document.querySelector(el),
        frmpelicula = $("#frm-pelicula");
    frmpelicula.addEventListener("submit",e=>{
        e.preventDefault();
        e.stopPropagation();
        
        let pelicula = {
            accion    : frmpelicula.dataset.accion,
            idpelicula  : frmpelicula.dataset.idpelicula,
            descripcion    : $("#txtdescripcionpelicula").value,
            sinopsis    : $("#txtsinopsispelicula").value,
            genero    : $("#txtgeneropelicula").value,
            duracion    : $("#txtduracionpelicula").value
            
        };
        fetch(`private/modulos/pelicula/procesos.php?proceso=recibirDatos&pelicula=${JSON.stringify(pelicula)}`).then( resp=>resp.json() ).then(resp=>{
            $("#respuestapelicula").innerHTML = `
                <div class="alert alert-success" role="alert">
                    ${resp.msg}
                </div>
            `;
        });
    });
    frmpelicula.addEventListener("reset",e=>{
        $("#frm-pelicula").dataset.accion = 'nuevo';
        $("#frm-pelicula").dataset.pelicula = '';
    });
}