# PROYECTO
Administrador de medicamentos de la drogueria 

## CONTENIDO DE ESTE ARCHIVO
   
* Introducción
* Requisitos
* Instalación


## INTRODUCCIÓN

El módulo de registro es el index y se puede realizar el registro de un medicamento nuevo de acuerdo
a las indicaciones o validaciones que presenta

* Para obtener una descripción completa del módulo registro, visite la página del proyecto:
http://127.0.0.1:5500/index.html

El módulo de indicaciones se le muestra como registrar un nuevo medicamento ya que se tiene unas condiciones para
la creación de uno

* Para obtener una descripción completa del módulo indicaciones, visite la página del proyecto:
http://127.0.0.1:5500/paginas/indicaciones.html

El módulo de lista de productos puede visualizar los medicamentos que estan registrados en la base de datos,
tiene su paginación por 15 tarjetas y tiene tambien un menú lateral para registra un medicamento nuevo y buscar
un producto

* Para obtener una descripción completa del módulo productos, visite la página del proyecto:
http://127.0.0.1:5500/paginas/productos.html

El módulo de buscador tiene 3 filtros para realizar un búsqueda por nombre, categoria y presentación donde se le 
presenta en una tabla que esta tiene paginación por 10 y tiene tambien un menú lateral para registra un medicamento nuevo y buscar
un producto

* Para obtener una descripción completa del módulo indicaciones, visite la página del proyecto:
http://127.0.0.1:5500/paginas/buscador.html

## REQUISITOS

Este módulo requiere los siguientes módulos:

* Node (https://nodejs.org/en)
* Json-server (https://www.npmjs.com/package/json-server)

* Para ver los productos de la base de datos del archivo db.json 
digitar en consola el comando (json-server db.json -p 5000)

## INSTALACIÓN
 
* Instale Node como lo haría normalmente con un módulo en windows
https://kinsta.com/es/blog/como-instalar-node-js/

* En WindoWs PowerShell en modo administrador digitar el siguiente comando Set-ExecutionPolicy Unrestricted 
y luego dar Si

* Instale json-server En WindoWs PowerShell en modo administrador digitar el comando (npm install json-server)