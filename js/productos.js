import { getMedicamentos } from "./api.js";

let baseDeDatos = []
async function mostrar(){
     baseDeDatos = await getMedicamentos();
     console.log(baseDeDatos)



const listadoArticulosDOM = document.querySelector("#listado-articulos");
const botonAtrasDOM = document.querySelector("#atras");
const informacionPaginaDOM = document.querySelector("#informacion-pagina");
const botonSiguienteDOM = document.querySelector("#siguiente");
const plantillaArticulo = document.querySelector("#plantilla-articulo").content.firstElementChild;
const elementosPorPagina = 15;
let paginaActual = 1;



	 // Funciones

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
        return baseDeDatos.slice(corteDeInicio, corteDeFinal);
    }

    
    // Función que devuelve el número total de páginas disponibles
    
    function obtenerPaginasTotales() {
        return Math.ceil(baseDeDatos.length / elementosPorPagina);
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
          const miArticulo = plantillaArticulo.cloneNode(true);
          // Rellenamos los datos del nuevo artículo
          const nombre_medicamento = miArticulo.querySelector("#nombre");
          nombre_medicamento.textContent = datosArticulo.nombre.toUpperCase()+" "+datosArticulo.concentracion+" "+datosArticulo.medida+" "+datosArticulo.presentacion;
          const categoria = miArticulo.querySelector("#categoria");
          categoria.textContent = datosArticulo.categoria;
          const imagen = miArticulo.querySelector("#img-medicamento");
          imagen.src = datosArticulo.imagen;
          const precio = miArticulo.querySelector("#precio");
          precio.textContent = formatoMoneda(datosArticulo.precio);
          // Lo insertamos dentro de "listadoArticulosDOM"
          listadoArticulosDOM.appendChild(miArticulo);
        });
    }


    // Eventos
 
    botonAtrasDOM.addEventListener("click", retrocederPagina);
    botonSiguienteDOM.addEventListener("click", avanzarPagina);

  
    // Inicio

    renderizar(); // Mostramos la primera página nada más que carge la página

   //FORMATO MONEDA
    function formatoMoneda(valor)
    {
       return new Intl.NumberFormat("en-US", { style: "currency", minimumFractionDigits: 2, currency: "USD" }).format(
            valor
            ) 
    }

}

mostrar()