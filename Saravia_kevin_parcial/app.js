document.addEventListener("DOMContentLoaded", e=>{
    const form = document.querySelector("#frmConversores");
    form.addEventListener("submit", event=>{
        event.preventDefault();
  
        let de = document.querySelector("#cboDe").value,
            a = document.querySelector("#cboA").value,
            cantidad = document.querySelector("#txtCantidadConversor").value,
            opcion = document.getElementById('cboConvertir');

            
        let divisas = {
            "dolar":1,
            "colones":8.75,
            "yenes":111.27,
            "rupia":69.75,
            "lempiras":24.36,
            "peso":19.36,
            "bitcoin":0.00026},

            longitud = {
            "m":1,
            "cm":100,
            "pulgada":39.3701,
            "pie":3.28084,
            "varas":1.1963081929167,
            "yardas":1.09361,
            "km":0.001,
            "millas":0.000621371};


        let $res = document.querySelector("#lblRespuesta");
        if(opcion.value == "divisas"){
        $res.innerHTML = `Respuesta: ${ (divisas[a]/divisas[de]*cantidad).toFixed(2) }`;
        } else if(opcion.value == "longitud"){
        $res.innerHTML = `Respuesta: ${ (longitud[a]/longitud[de]*cantidad).toFixed(2) }`;
        };
    });
  });
  
  function seleccionar() {
    let opcion = document.getElementById('cboConvertir'),
    de1 = document.getElementById('cboDe'),
    a1 = document.getElementById('cboA');
    de1.value="";
    a1.value="";
    de1.innerHTML="";
    a1.innerHTML="";
  
    if(opcion.value == "divisas"){
      var  array = ["dolar!Dolar","colones!Colones(SV)","yenes!Yenes","rupia!Rupia","lempiras!Lempiras","peso!Peso(MX)","bitcoin!Bitcoin"];
    } else if(opcion.value == "longitud"){
      var array = ["m!Metros","cm!Centimetros","pulgada!Pulgada","pie!Pie","varas!Varas","yardas!Yardas","km!Kilometros","millas!Millas"];
    };
  
    for(var i=0;i<array.length;i++){ 
      var repair = array[i].split("!");
      var newop = document.createElement("option");
      newop.value = repair[0]
      newop.innerHTML = repair[1];
      de1.options.add(newop);
    };
    for(var i=0;i<array.length;i++){ 
      var repair = array[i].split("!");
      var newop = document.createElement("option");
      newop.value = repair[0]
      newop.innerHTML = repair[1];
      a1.options.add(newop);
    };
   }