const url = 'http://localhost:5000/medicamentos';

export const addMedicamentos = async medicamento=>{

  console.log(medicamento);

  try {
    await fetch(url,{
        method:'POST',
        body:JSON.stringify(medicamento),
        headers:{
            'Content-Type':'application/json'
        }
     });    
     window.location.href ="/paginas/productos.html";

  } catch (error) {
    console.log(error);
  }
}

export const getMedicamentos = async ()=>{

    try {
        const res   = await fetch(url);
        const datos = await res.json();
        // console.log(datos)
        return datos;
    } catch (error) {
        console.log(error);
    }


}