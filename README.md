# Frontend Store Online

## Descripción

Frontend de la tienda online.

## Proceso de instalacion

### Pre requisitos

* Node = v20.14
* Npm = v10.7
* Angular = 17.3.11

### Intalacion

1. Clonar el proyecto
   ```
   git clone https://github.com/StoreDevApps/ft_admin.git
   ```
2. Instalar dependencias
   ```
   npm i
   ```

### Otros comandos de administración

* Para iniciar en modo desarrollo
   ```
   ng serve
   ```

* Compilar archivos para desplegar
   ```
   ng build

### Otros comandos de desarrollo

* Crear componente
   ```
   ng g c componentes/Componente
   ```
* Crear componentes para pagina de admin
   ```
   ng g c componentes/pages/admin/admin-Componente
   ```
* Crear componentes para pagina de trabajadores
   ```
   ng g c componentes/pages/worker/trabajadores-Componente
   ```
* Crear componentes para pagina de clientes
   ```
   ng g c componentes/pages/user/clientes-Componente
   ```
* Crear componentes para pagina sin login
   ```
   ng g c componentes/pages/public/public-Componente
   ```
* Crear servicios
   ```
   ng g s services
   ```

## Estructura de archivos

Esta es la estructura para los archivos del proyecto.

```
src/
└── app/
    ├── componentes/
    ├── guards/
    ├── interceptors/
    ├── interface/
    ├── models/
    ├── pages/
    │   ├── admin/
    │   ├── change-forgot-password/
    │   ├── code-forgot-password/
    │   ├── error404/
    │   ├── forgot-password/
    │   ├── login/
    │   ├── public/
    │   ├── sign-up/
    │   ├── user/
    │   └── worker/
    ├── services/
    ├── app.component.html
    ├── app.component.scss
    ├── app.component.spec.ts
    ├── app.component.ts
    ├── app.config.ts
    └── app.routes.ts
```

* app.routes.ts: Archivo de rutas de la aplicación.
* app.config.ts: Archivo de configuración de la aplicación.
* Carpeta de componentes: Contiene los componentes de la aplicación.
* Carpeta guards: Contiene los guards de la aplicación.
* Carpeta interceptors: Contiene los interceptores de la aplicación.
* Carpeta interface: Contiene las interfaces de la aplicación.
* Carpeta pages: Contiene las paginas de la aplicación.
    - Carpeta admin: Contiene las paginas de administración.
        + Layout: Contiene el layout de la página de administración. Es decir, la estructura de la página como el navbar, sidebar, content, etc.
    - Carpeta public: Contiene las paginas publicas. (sin login)
        + Layout: Contiene el layout de la página publica. Es decir, la estructura de la página como el navbar, sidebar, content, etc.
    - Carpeta user: Contiene las paginas de usuario. (con login)
        + Layout: Contiene el layout de la página de usuario. Es decir, la estructura de la página como el navbar, sidebar, content, etc.
    - Carpeta worker: Contiene las paginas de trabajadores.
        + Layout: Contiene el layout de la página de trabajadores. Es decir, la estructura de la página como el navbar, sidebar, content, etc.
* Carpeta services: Contiene los servicios de la aplicación.



## Tabla de Contenido - Carpeta de Comunicaciones

Este documento indexa todas las piezas de evidencia dentro de la carpeta de comunicaciones, proporcionando detalles clave sobre cada archivo, incluyendo su nombre, descripción, tipo, participantes, fecha y hora.

| **#** | **Nombre del Archivo** | **Descripción** | **Tipo de Archivo** | **Participantes** | **Fecha** | **Hora** |
|-------|------------------------|-----------------|---------------------|-------------------|-----------|----------|
| 1     | [Primera_reunion_Analisis_de_requerimientos.png](https://github.com/StoreDevApps/ft_admin/blob/main/Communications/Primera%20reunion%20-%20Analisis%20de%20requerimientos.png) | Captura de pantalla de la primera reunión de análisis de requerimientos. | PNG | Jorge Zambrano, Lizbeth Peña, Alejandra Cotrina, Cliente | 2024-06-19 | 10:18 PM |
| 2     | [campos_productos.xlsx](https://github.com/StoreDevApps/ft_admin/blob/main/Communications/campos%20productos.xlsx) | Documento que contiene la explicación de campos para los productos y elaboración de tablas. | Excel | Jorge Zambrano, Lizbeth Peña, Alejandra Cotrina, Cliente | 2024-06-23 | 04:15 PM |
| 3     | [Reunion_avances.png](https://github.com/StoreDevApps/ft_admin/blob/main/Communications/Reunion%20avances.png) | Se presentaron concepto de ventanas de la plataforma dentro de figma| PNG | Jorge Zambrano, Lizbeth Peña, Alejandra Cotrina | 2024-07-05 | 11:00 PM |
| 4     | [Recepcion_de_datos.jpg](https://github.com/StoreDevApps/ft_admin/blob/main/Communications/Recepcion%20de%20datos.jpg) | El cliente nos proporcionó datos para continuar con el desarrollo | JPG | Jorge Zambrano, Lizbeth Peña, Alejandra Cotrina, Cliente | 2024-07-15 | 05:00 PM |
| 5     | [Reunion_de_avances.png](https://github.com/StoreDevApps/ft_admin/blob/main/Communications/Reunion_de_avances.png) | Se presentaron pantallas funcionaes de la plataforma | PNG | Alejandra Cotrina, Cliente | 2024-07-28 | 08:00 PM |
| 6     | [Reunion_para_avances.png](https://github.com/StoreDevApps/ft_admin/blob/main/Communications/Reunion%20para%20avances.png) | Se mostraron las pantallas de la plataforma hechas hasta el momento y ver su funcionalidad | PNG | Jorge Zambrano, Lizbeth Peña, Alejandra Cotrina, Cliente | 2024-08-10 | 10:00 PM |
| 7     | [Presentacion.jpg](https://github.com/StoreDevApps/ft_admin/blob/main/Communications/Presentacion.jpg) <br> [Manual_de_Instalacion_Sistema.pdf](https://github.com/StoreDevApps/ft_admin/blob/main/Communications/Manual_de_Instalacion_Sistema.pdf)  | Presentacion de las diferentes partes desarrolladas dentro de la plataforma. Se indicaron informacion de sitios desplegados y la entrega del manual de instalación | JPG <br> PDF | Jorge Zambrano, Lizbeth Peña, Alejandra Cotrina, Cliente | 2024-08-14 | 10:00 PM |
| 8     | [Reunion_revision_pendientes.png](https://github.com/StoreDevApps/ft_admin/blob/main/Communications/Reunion_revision_pendientes.png)  | Reunión para revisar las HUs pendientes y definir en cuales se iba a trabajar para esta nueva entrega | JPG | Jorge Zambrano, Lizbeth Peña, Alejandra Cotrina, Cliente | 2024-09-08 | 15:07 PM |
| 9     | [Reunion_presentacion_tercera.png](https://github.com/StoreDevApps/ft_admin/blob/main/Communications/Reunion_presentacion_tercera.png)  | Presentacion de las nuevas secciones desarrolladas dentro de la plataforma | JPG | Jorge Zambrano, Lizbeth Peña, Alejandra Cotrina, Cliente | 2024-09-13 | 19:26 PM |


