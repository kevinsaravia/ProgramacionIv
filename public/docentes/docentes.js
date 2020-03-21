var $ = el => document.querySelector(el),
    frmAlumnos = $("#frmAlumnos");
frmAlumnos.addEventListener("submit",e=>{
    e.preventDefault();
    e.stopPropagation();
    
    let alumnos = {
        accion    : 'nuevo',
        codigo    : $("#txtCodigoDocente").value,
        nombre    : $("#txtNombreDocente").value,
        correo : $("#txtDireccionDocente").value,
        telefono  : $("#txtTelefonoDocente").value
    };
    fetch(`private/Modulos/docentes/procesos.php?proceso=recibirDatos&alumno=${JSON.stringify(alumnos)}`).then( resp=>resp.json() ).then(resp=>{
        $("#respuestaAlumno").innerHTML = `
            <div class="alert alert-success" role="alert">
                ${resp.msg}
            </div>
        `;
    });
});