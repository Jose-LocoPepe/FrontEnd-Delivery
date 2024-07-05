<!-- PROYECTO -->
<br />
<div align="center">
  <a href="https://google.cl">
    <img src="https://i.imgur.com/PcEE9Go.png" alt="Logo" >
  </a>

  <h3 align="center">Vuelta al menu en 365 platos - Maestros Solucionadores.</h3>

  <p align="center">
    Aplicación de delivery "Vuelta al menu en 365 platos ".
  </p>
</div>

# Frontend - Aplicacion de delivery "Vuelta al menu en 356 Platos"

Esta aplicación es un proyecto para el ramo de "Desarrollo de soluciones móviles" del 1°Semestre 2024. 


## Tecnologías Utilizadas 🖥️
- [Expo](https://expo.dev/)
- [React Native - Expo Go](https://reactnative.dev/docs/environment-setup)
- [NodeJS](https://nodejs.org/en)


# Getting Started
>**Note**: Asegúrate de instalar [Node](https://nodejs.org/en) en tu computador, usando la versión LTS.

Accede a la página web de [Expo](https://expo.dev/go) y crea una cuenta, luego descarga la aplicación de expo go en tu dispositivo físico (Android, iOS), o emulador.


## Instalación inicial 💿
>**Note**: Debes tener conectado tu computador y el dispositivo donde tienes instalado Expo Go en la misma red (ya sea por Wifi o Ethernet, deben estar en la misma sección de red).


Abre el proyecto en tu editor de código preferido y abre una nueva terminal.
Ejecuta el siguiente comando para poder instalar las dependencias del proyecto.
```bash
npm install
```

Debes copiar el archivo env.
```bash
copy .env.example .env
```

Cambiamos los siguientes parámetros en el .env con las variables de entorno adecuadas:
```bash
HOST_LOCAL,HOST_EMULATOR = Escribe aquí la dirección Ip de tu red del computador en comillas junto con el puerto en donde tienes ejecutanse tu backend. Por ejemplo: 'http://192.168.1.1:8081/api' o entrar en el archivo ApiDelivery.tsx en la carpeta src/Data/sources/remote/api/ApiDelivery y escribir directamente en baseURL: 'http://192.168.0.15:3307/api/'

GOOGLE_MAPS_API_KEY = Escribe una key válida de google maps
```
* Copia tu API Key de google maps en tu **app.json**, donde se encuentra el campo `android.config.googleMaps.apiKey` y en `ios.config.googleMapsApiKey`


Inicia sesión con tu cuenta de expo:
```bash
npx expo login 

# Si tienes dudas ejecuta el comando de ayuda:
npx expo login -h
```

Para empezar tu proyecto ejecuta en tu terminal:
```bash
npx expo start
```

Una vez que aparezca el código QR, utiliza tu aplicación de Expo Go para escanearlo.

* Si no logras ejecutar el proyecto con el código QR, intenta ingresar manualmente tu URL. EJ: exp://IP_ADDRESS:PORT - PORT es el puerto en donde se está ejecutando Metro, - IP_ADDRESS es la dirección ip asignada a tu computador

## Versionado 📌

Usamos [GitHub](https://github.com/Jose-LocoPepe/Backend-App-Delivery) para el versionado.

## Autores ✒️

###### José Bautista

###### Fernando Valenzuela

###### Nicolas Mardones

###### Joel Huilca

###### Marcelo Soto


## Licencia 📄

Este proyecto está bajo la Licencia de &copy; Maestros Solucionadores.
