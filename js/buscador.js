import { getMedicamentos } from "./api.js";

let baseDeDatos = []
let bdFiltro = []
async function mostrar(){
     baseDeDatos = await getMedicamentos();
    //  console.log(baseDeDatos)



const listadoArticulosDOM = document.querySelector("#listado-medicamentos");
const botonAtrasDOM = document.querySelector("#atras");
const informacionPaginaDOM = document.querySelector("#informacion-pagina");
const botonSiguienteDOM = document.querySelector("#siguiente");
const formulario = document.querySelector("#formulario");
const  nombre = document.querySelector('#nombre')
const categoria = document.querySelector('#categoria');
const presentacion = document.querySelector("#presentacion");
const resetFiltros = document.querySelector('#resetFiltros');
const limpiaBusqueda = document.querySelector('#limpiar-busqueda')
const tablaDatos = document.querySelector('#tablaDatos')
const paginador = document.querySelector('#paginador')
const btnsResult = document.querySelector('#btns-result')
const spinner = document.querySelector('#spinner')
const seccionData = document.querySelector('#seccionData')

const elementosPorPagina = 10;
let paginaActual = 1;
let categoriaSelected =''
let presentacionSelected =''

 // Funciones
function funcionesAll(){
    categoria.addEventListener('change',selectCat);    
    presentacion.addEventListener('change',selectPresent);   
    resetFiltros.addEventListener('click',resetearForm);
    limpiaBusqueda.addEventListener('click',limpiarResultados)
    formulario.addEventListener('submit',formFiltrar);
}
funcionesAll();
	

// submit buscador
function formFiltrar(e){
      
    e.preventDefault()
    paginaActual = 1
    spinner.classList.remove('ocultar')
    tablaDatos.classList.add('ocultar')
    paginador.classList.add('ocultar')
    btnsResult.classList.add('ocultar')
    if(document.querySelector('.noEncuentraDatos')){
        document.querySelector('.noEncuentraDatos').remove()
    }

    if(document.querySelector('.noEncuentraDatosBtn')){
        document.querySelector('.noEncuentraDatosBtn').remove()
    }
    // seccionData.lastChild.remove()
    setTimeout(() => {
        spinner.classList.add('ocultar')
        console.log(nombre.value)
        console.log(categoriaSelected)
        bdFiltro = []
        if(categoriaSelected){
            bdFiltro = baseDeDatos.filter(filtrarCategoria)
        }
        if(presentacionSelected){
            bdFiltro = baseDeDatos.filter(filtrarPresentacion)
        }
        if(categoriaSelected && presentacionSelected){
            bdFiltro = baseDeDatos.filter(filtrarCategoria).filter(filtrarPresentacion)
        }
        if(nombre.value){
            bdFiltro = baseDeDatos.filter(filtrarNombre).filter(filtrarCategoria).filter(filtrarPresentacion)
        }
      
     
        console.log(bdFiltro)
        renderizar()
        
        let load = false
        if(bdFiltro.length  === 0){
            load = false;
        }else{
            load = true;
        }
    
    
        const loadData = new Promise((resolve,reject)=>{         
            
              if(load){
                resolve('Carga datos');
              }else{
                reject('No carga datos')
              }
            })
            
            loadData
                .then(res=>{
                    console.log(res)
                    tablaDatos.classList.remove('ocultar')
                    paginador.classList.remove('ocultar')
                    btnsResult.classList.remove('ocultar')
                    spinner.classList.add('ocultar')
                   
                })
                .catch(error=>{ 
                    console.log(error)
                    const mensaje = document.createElement('H3')
                    mensaje.textContent = 'No se encontraron resultados para la búsqueda'
                    mensaje.classList.add('noEncuentraDatos')
                    const enlace = document.createElement('A')
                    enlace.textContent = 'Regresar a Medicamentos'
                    enlace.href='productos.html'
                    enlace.classList.add('botones')
                    enlace.classList.add('volver-medicine')
                    enlace.classList.add('noEncuentraDatosBtn')
                    seccionData.appendChild(mensaje)
                    seccionData.appendChild(enlace)
                })
    }, 2000);
  
  

}

function filtrarNombre(medicine){     
   if(nombre){
     return medicine.nombre === (nombre.value).toUpperCase().trim();
    }
    return medicine;
 }
 
 function selectCat(){    
    var selectedOption = this.options[categoria.selectedIndex];
    categoriaSelected =  selectedOption.text;
    
  }

  function selectPresent(){    
    var selectedOption = this.options[presentacion.selectedIndex];
    presentacionSelected =  selectedOption.text;
   
  }
 function filtrarCategoria(medicine){    
   if(categoriaSelected){
     return medicine.categoria === categoriaSelected;
    }
    return medicine;
 }

 function filtrarPresentacion(medicine){    
    if(presentacionSelected){
      return medicine.presentacion === presentacionSelected;
     }
     return medicine;
  }
  

	//  Función que pasa a la siguiente página	 
	
	 function avanzarPagina() {
        // Incrementar "paginaActual"
        paginaActual = paginaActual + 1;
        // Redibujar
        renderizar();
    }

   
    //   Función que retrocedea la página anterior
     
    function retrocederPagina() {
        // Disminuye "paginaActual"
        paginaActual = paginaActual - 1;
        // Redibujar
        renderizar();
    }

    
    //   Función que devuelve los datos de la página deseada   
   
    function obtenerRebanadaDeBaseDeDatos(pagina = 1) {
        const corteDeInicio = (paginaActual - 1) * elementosPorPagina;
        const corteDeFinal = corteDeInicio + elementosPorPagina;
        return bdFiltro.slice(corteDeInicio, corteDeFinal);
    }

    
    // Función que devuelve el número total de páginas disponibles
    
    function obtenerPaginasTotales() {
        return Math.ceil(bdFiltro.length / elementosPorPagina);
    }

    /**
     * Función que gestiona los botones del paginador habilitando o
     * desactivando dependiendo de si nos encontramos en la primera
     * página o en la última.
     */
    function gestionarBotones() {
        // Comprobar que no se pueda retroceder
        if (paginaActual === 1) {
        botonAtrasDOM.setAttribute("disabled", true);
        botonAtrasDOM.classList.add("btn-pag-disable")
        } else {
        botonAtrasDOM.removeAttribute("disabled");
        botonAtrasDOM.classList.remove("btn-pag-disable")
        }
        // Comprobar que no se pueda avanzar
        if (paginaActual === obtenerPaginasTotales()) {
        botonSiguienteDOM.setAttribute("disabled", true);
        botonSiguienteDOM.classList.add("btn-pag-disable")
        } else {
        botonSiguienteDOM.removeAttribute("disabled");
        botonSiguienteDOM.classList.remove("btn-pag-disable")
        }
    }
 
 
	//    Función que se encarga de dibujar el nuevo DOM a partir de las variables	
	
	 function renderizar() {
        // Limpiamos los artículos anteriores del DOM
        listadoArticulosDOM.innerHTML = "";
        // Obtenemos los artículos paginados
        const rebanadaDatos = obtenerRebanadaDeBaseDeDatos(paginaActual);
        //// Dibujamos
        // Deshabilitar botones pertinentes (retroceder o avanzar página)
        gestionarBotones();
        // Informar de página actual y páginas disponibles
        informacionPaginaDOM.textContent = `${paginaActual}/${obtenerPaginasTotales()}`;
        // Crear un artículo para cada elemento que se encuentre en la página actual
        rebanadaDatos.forEach(function (datosArticulo) {
          // Clonar la plantilla de artículos
        //   const miArticulo = plantillaArticulo.cloneNode(true);
        //   // Rellenamos los datos del nuevo artículo
        //   const codigo = miArticulo.querySelector("#codigo-medicamento");
        //   codigo.textContent = datosArticulo.codigo;
        //   const nombre_medicamento = miArticulo.querySelector("#nombre");
        //   nombre_medicamento.textContent = datosArticulo.nombre+" "+datosArticulo.concentracion+" "+datosArticulo.medida+" "+datosArticulo.presentacion;
        //   const categoria = miArticulo.querySelector("#categoria");
        //   categoria.textContent = datosArticulo.categoria;
        //   const imagen = miArticulo.querySelector("#img-medicamento");
        //   imagen.src = datosArticulo.imagen;
        //   const precio = miArticulo.querySelector("#precio");
        //   precio.textContent = formatoMoneda(datosArticulo.precio);
        //   // Lo insertamos dentro de "listadoArticulosDOM"
        //   listadoArticulosDOM.appendChild(miArticulo);
        listadoArticulosDOM.innerHTML += `
           <tr>           
            <td id="nombre">${datosArticulo.nombre}</td>
            <td id="img-medicamento"><img src="${datosArticulo.imagen}" width="60" height="60"/></td>
            <td id="categoria">${datosArticulo.categoria}</td>        
            <td id="precio">${formatoMoneda(datosArticulo.precio)}</td>          
            <td id="cantidad">${datosArticulo.presentacion}</td>
            <td id="codigo-medicamento">${datosArticulo.codigo}</td>
            
           </tr>
       `
        });
    }


    // Eventos
 
    botonAtrasDOM.addEventListener("click", retrocederPagina);
    botonSiguienteDOM.addEventListener("click", avanzarPagina);

  
    // Inicio

    // renderizar(); // Mostramos la primera página nada más que carge la página

   //FORMATO MONEDA
    function formatoMoneda(valor)
    {
       return new Intl.NumberFormat("en-US", { style: "currency", minimumFractionDigits: 2, currency: "USD" }).format(
            valor
            ) 
    }

    function resetearForm(e){
        e.preventDefault();
        nombre.value =''  
        categoria.selectedIndex = 0   
        presentacion.selectedIndex = 0 
        presentacionSelected = '' 
        categoriaSelected =''
       
    }

    function limpiarResultados(e){
        e.preventDefault();
        bdFiltro=[]
        renderizar()
        nombre.value =''  
        categoria.selectedIndex = 0   
        presentacion.selectedIndex = 0 
        presentacionSelected = '' 
        categoriaSelected =''
        informacionPaginaDOM.textContent =''
        tablaDatos.classList.add('ocultar')
        paginador.classList.add('ocultar')
        btnsResult.classList.add('ocultar')
    }

}

mostrar()