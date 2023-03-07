# Clase 36 Proyecto Final
Este proyecto es un servidor web basado en Express que utiliza Passport para la autenticación y autorización de usuarios, y tiene un sistema de Cluster que permite la ejecución simultánea de múltiples procesos en una sola máquina. También se utiliza MongoDB para almacenar la información de los usuarios y sus compras.

## Servidor.js
El archivo server.js es el archivo principal del servidor. En este archivo se importa la aplicación de Express desde el archivo app.js y se configura el modo de Cluster, dependiendo del valor del argumento -m (modo) pasado por la línea de comandos.

El archivo también define una ruta principal, '/', que redirecciona a la ruta '/session/login'. Si el modo de Cluster está habilitado, se inician múltiples procesos y se registran eventos de muerte de proceso para cada uno de ellos. Si el modo de Cluster no está habilitado, se inicia el servidor en el puerto 8080.

## App.js
El archivo app.js es donde se define la aplicación de Express y se configura Passport. La aplicación utiliza los middleware express.urlencoded, express.json y express.static para procesar las solicitudes, y también utiliza express-session para administrar la sesión del usuario.

La aplicación también define el motor de vistas y las rutas principales de la aplicación.

## RouterSession.js
El archivo routerSession.js define las rutas relacionadas con la autenticación y el registro de usuarios. Este archivo define las rutas '/session/signup' y '/session/login', que muestran los formularios de registro e inicio de sesión, respectivamente. El archivo también define la ruta '/session/logout', que cierra la sesión del usuario.

El archivo utiliza Passport para la autenticación y autorización de usuarios, y utiliza bcrypt para la encriptación de contraseñas. Cuando un usuario se registra, el archivo verifica si la dirección de correo electrónico ya está en uso antes de crear una nueva entrada de usuario en la base de datos. También se utiliza nodemailer para enviar un correo electrónico al administrador del sistema cuando un nuevo usuario se registra.

## RouterHome.js
El archivo routerHome.js define las rutas principales de la aplicación después de que un usuario se haya autenticado. Este archivo define las rutas '/home', '/home/info' y '/home/cart', que muestran la página principal, la información del usuario y el carrito de compras, respectivamente.

El archivo utiliza Passport para la autorización de usuarios, y genera productos falsos para llenar el carrito de compras. También utiliza nodemailer y Twilio para enviar correos electrónicos y mensajes de texto cuando se realiza una compra.