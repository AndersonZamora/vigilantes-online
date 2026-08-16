# Vigilantes Online

Aplicación web de seguridad ciudadana que permite reportar, visualizar y gestionar **lugares de riesgo**, denuncias y emergencias en tiempo real sobre un mapa interactivo (Mapbox).

## ¿De qué trata el proyecto?

Vigilantes Online conecta a tres tipos de usuarios dentro de un mismo sistema:

- **Ciudadano (`ciuda`)**: puede ver el mapa de lugares de riesgo, enviar una **denuncia** con su ubicación en tiempo real (con alerta de mal uso), consultar el **historial de sus denuncias**, revisar **información/avisos** publicados por el administrador y calificar el servicio en **críticas**.
- **Sereno (`serene`)**: rol de vigilancia/patrullaje que recibe las alertas y notificaciones generadas por los ciudadanos para atenderlas.
- **Administrador (`admin`)**: gestiona el sistema desde un panel propio — usuarios, serenos, **lugares de riesgo** (con nivel Bajo/Medio/Alto y coordenadas en el mapa), **emergencias** e **información** publicada a los ciudadanos.

La comunicación en tiempo real (nuevas denuncias/alertas) se maneja con **Socket.IO**, y la ubicación/geolocalización de los lugares de riesgo y denuncias se muestra sobre **Mapbox GL**.

## Tecnologías principales

- [React 18](https://react.dev/) + [Vite](https://vitejs.dev/)
- [Redux Toolkit](https://redux-toolkit.js.org/) para el manejo de estado (auth, UI, lugares, emergencias, sirenas/serenos, alertas)
- [React Router DOM](https://reactrouter.com/) (`HashRouter`) con rutas protegidas y enrutadores separados por rol (Admin / Usuario / Sereno)
- [Mapbox GL](https://docs.mapbox.com/mapbox-gl-js/) para mapas y geolocalización
- [Socket.IO Client](https://socket.io/) para notificaciones en tiempo real
- [Axios](https://axios-http.com/) para el consumo de la API (con interceptor de token `x-token`)
- [React Bootstrap](https://react-bootstrap.github.io/) + [MUI](https://mui.com/) + [PrimeReact](https://primereact.org/) + [SweetAlert2](https://sweetalert2.github.io/) para UI y alertas
- [validator](https://www.npmjs.com/package/validator) para validaciones de formularios

## Estructura del proyecto

```
src/
├── api/            # Cliente Axios configurado
├── auth/           # Login, registro y páginas públicas
├── citizen/
│   ├── admin/      # Panel y rutas del administrador
│   ├── serene/     # Panel y rutas del sereno
│   └── users/      # Panel y rutas del ciudadano (emergencias, denuncias, info, críticas)
├── context/        # Contexto de Socket.IO
├── helpers/        # Utilidades (alertas, variables de entorno, etc.)
├── hooks/          # Hooks personalizados (auth, mapbox, sockets, formularios, slices)
├── layout/         # Layouts compartidos
├── router/         # Enrutador raíz según estado de autenticación
├── store/          # Slices de Redux (auth, ui, lugares, emergencias, serenos, alertas)
└── validator/       # Validaciones de formularios por módulo
```

Este repositorio es el **frontend**; requiere una API backend compatible (ver variables de entorno abajo).

## Requisitos previos

- Node.js 16+
- Yarn (el proyecto usa `yarn.lock`)

## Configuración

Crea un archivo `.env` en la raíz con las siguientes variables:

```
VITE_APP_BASE_URL=<url_de_la_api_backend>
VITE_APP_TOKEN=<token_de_mapbox_u_otro_requerido>
```

## Instalación y uso

```bash
# Instalar dependencias
yarn install

# Levantar entorno de desarrollo
yarn dev

# Compilar para producción
yarn build

# Previsualizar el build de producción
yarn preview

# Ejecutar el linter
yarn lint
```

## Roles del sistema

| Rol      | Valor en BD | Acceso principal                                              |
|----------|-------------|-----------------------------------------------------------------|
| Admin    | `admin`     | Gestión de usuarios, serenos, lugares de riesgo, emergencias e información |
| Ciudadano| `ciuda`     | Denuncias, emergencias, información, críticas                  |
| Sereno   | `serene`    | Atención de alertas y perfil                                    |
