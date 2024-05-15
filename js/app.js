// import { baseDeDatos } from "./data.js";
import{addMedicamentos} from "./api.js"
// console.log(baseDeDatos)

const nombre = document.querySelector('#nombre');
// nombre.toUpperCase()
const categoria = document.querySelector('#categoria');
const imagen = document.querySelector('#imagen');
const codigo = document.querySelector('#codigo');
const precio = document.querySelector('#precio');
const cantidad = document.querySelector('#cantidad');
const medida = document.querySelector('#medida');
const concentracion = document.querySelector('#concentracion');
const presentacion = document.querySelector("#presentacion");
const resetBtn = document.querySelector('#resetBtn');
const formulario = document.querySelector('#formulario');

funcionesAll();
function funcionesAll(){
    // document.addEventListener('DOMContentLoaded',loadDocument)
    nombre.addEventListener('blur',datos);
    categoria.addEventListener('change',selectCat);
    imagen.addEventListener('change',selectImg);
    codigo.addEventListener('blur',datos);
    precio.addEventListener('blur',validarPrecio);
    cantidad.addEventListener('blur',datos);
    medida.addEventListener('blur',datos);
    concentracion.addEventListener('blur',datos);
    presentacion.addEventListener('change',selectPresent);   
    resetBtn.addEventListener('click',resetearForm);
    formulario.addEventListener('submit',formEnviar);
}
const datosObj = {
    nombre:'',
    categoria:'',
    imagen:'',
    codigo:'',
    precio:'',
    cantidad:'',
    medida:'',
    concentracion:'',
    presentacion:''
    
    } 
    
    
    // let productos = []
    // productos = [...productos,datosObj]       
    // console.log('Productos: ',productos)
    function datos(e){     
        datosObj[e.target.name] = (e.target.value).trim(); 
     
        // console.log(datosObj)
    }

    function selectCat(){    
        var selectedOption = this.options[categoria.selectedIndex];
        datosObj.categoria =  selectedOption.text;
      }

      function selectPresent(){    
        var selectedOption = this.options[presentacion.selectedIndex];
        datosObj.presentacion =  selectedOption.text;
      }

      function selectImg(){
        // console.log(this.value);
        datosObj.imagen = "../img/"+document.getElementById('imagen').files[0].name
    }

    function formEnviar(e){
        e.preventDefault();
        
        const {nombre,categoria,imagen,codigo,precio,cantidad,medida,concentracion,presentacion} = datosObj;
    
        const expRegular = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]{2}).{8}$/;
       
      

        // if(precio != ''){
        //     console.log(datosObj.precio)
        //     validarPrecio()
           
        // }

        if(nombre ==='' || categoria ==='' || imagen ==='' || codigo ==='' || precio ==='' || cantidad ==='' || medida ==='' || concentracion ==='' || presentacion ===''){
            // msg('Todos los campos son obligatorios','error');
           console.log(datosObj)
           ConfirmarIndicaciones()
           return;
        } 

        if(nombre.length > 20){
            msg('El Nombre No debe ser superior a 20 caracteres','error');
            return;
        }

        if(!codigo.match(expRegular)){
            // console.log(codigo)
            msg('El Código debe contener al menos una minúscula, una mayuscula, un número y 8 caracteres como mínimo','error');
            return
        }
        
      

        console.log(datosObj)
  
        addMedicamentos(datosObj) 
        msg('Registro creado Correctamente!');         
            
        // window.location.href ="/paginas/productos.html";
        formulario.reset();
    
        limpiarObj();
       
        
    
    }

    function ConfirmarIndicaciones() {
        var respuesta = confirm('Uno o mas campos estan vacios o no cumple con las condiciones, ¿Desea ir a la pagina de indicaciones?');
        if (respuesta == true) {
            window.location.href ="/paginas/indicaciones.html";
            return false;
        } else {
            // window.location.href = "miclubapp.com/plataform/";
            return true;
        }
    }

    function validarPrecio(){   
        // console.log(precio.value)        

        const ExpRegSoloNumeros="^[0-9]+$";
        if(precio.value.match(ExpRegSoloNumeros)==null){
             msg("El precio contiene un Numero Invalido","error");
            //  precio.value = "$0.00"
            return
          }else{
            const precioMoneda = precio.value;           
            const precioFormateado = formatoMoneda(precioMoneda)
          if(precioFormateado !="NaN")
            document.querySelector('#precio').value =  precioFormateado;
            datosObj.precio = precioMoneda;
        }
     
       
       
    }

    function formatoMoneda(valor)
    {
       return new Intl.NumberFormat("en-US", { style: "currency", minimumFractionDigits: 2, currency: "USD" }).format(
            valor
            ) 
    }
    function limpiarObj(){
        datosObj.nombre = '';
        datosObj.categoria = '';
        datosObj.imagen = '';
        datosObj.codigo = '';
        datosObj.precio = '';
        datosObj.cantidad = '';
        datosObj.medida = '';
        datosObj.concentracion = '';
        datosObj.presentacion ='';
    }

 function msg(mensaje,tipo){
    const div = document.createElement('div');
    div.classList.add('Mensaje');

    if(tipo === 'error'){
    div.classList.add('msgError');
    }else{
        div.classList.add('msgExitoso');
    }
    div.textContent = mensaje;
    document.querySelector('#contenido').appendChild(div)
    setTimeout(() => {
        div.remove();
    }, 5000);
}

function resetearForm(e){
    e.preventDefault();   
    // nombre.value = "";
    // categoria.value = "";
    // imagen.value = "";
    // codigo.value = "";
    // precio.value = "";
    // cantidad.value = "";
    // medida.value = "";
    // concentracion.value = "";
    // presentacion.value = "";
    limpiarObj();
    formulario.reset();
   
   
}