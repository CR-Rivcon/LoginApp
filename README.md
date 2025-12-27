# LoginApp - Aplicación de Gestión de Tareas

## 📋 Descripción del Proyecto

LoginApp es una aplicación móvil desarrollada con React Native y Expo que permite a los usuarios autenticarse y gestionar sus tareas personales de forma remota. La aplicación cuenta con un sistema de autenticación completo conectado a un backend REST API, y una interfaz intuitiva para crear, visualizar y administrar una lista de tareas con soporte para captura de fotos y geolocalización.

### Características Principales

- **Sistema de Autenticación**: Login y logout con JWT almacenado localmente
- **Gestión de Tareas**: CRUD completo de tareas conectado a backend REST API
- **Captura de Fotografías**: Integración con cámara del dispositivo para adjuntar imágenes a las tareas
- **Geolocalización**: Captura automática de coordenadas GPS al crear tareas
- **Perfil de Usuario**: Visualización de información del usuario autenticado
- **Navegación por Tabs**: Interfaz intuitiva con navegación entre diferentes secciones
- **Backend Integration**: Todas las operaciones (crear, listar, actualizar, eliminar) se realizan contra la API REST

## 👥 Información del Proyecto

**Estudiantes:**
- Chirlett Jaqueline Teixeira Pino
- Cristopher Andrés Rivera Concha

**Profesor:** Boris Marcelo Belmar Muñoz

**Asignatura:** Desarrollo de Aplicaciones Móviles

**Institución:** Instituto Profesional San Sebastian

### Roles del Equipo

El código fue desarrollado en conjunto mediante VS Code y Live Share para edición online en paralelo, permitiendo la colaboración en tiempo real entre ambos integrantes del equipo.

### Uso de IA Declarado

Se utilizó Copilot de GitHub con modelo Claude 4.5 para corregir errores asociados a sintaxis, cierre de bloques, tabulaciones y fallas en la redacción de las variables y constantes. Sin embargo, el código se desarrolló basado en la sesión de clases online del ramo Desarrollo Móvil, emitida el día miércoles 3 de diciembre de 2025.

## 🚀 Instalación y Ejecución

### Requisitos Previos

- Node.js instalado
- npm o yarn
- Expo Go (para pruebas en dispositivo móvil)

### Pasos de Instalación

1. Clonar el repositorio:
```bash
git clone <url-del-repositorio>
cd LoginApp
```

2. Instalar dependencias:
```bash
npm install
```

3. Configurar variables de entorno:

Copia el archivo `.env.example` a `.env.local`:
```bash
cp .env.example .env.local
```

Edita `.env.local` y configura la URL del backend:
```
EXPO_PUBLIC_API_URL=https://todo-list.dobleb.cl
```

4. Iniciar la aplicación:
```bash
npx expo start
```

5. Abrir la aplicación:
   - Escanear el código QR con Expo Go (Android/iOS)
   - Presionar `a` para abrir en emulador Android
   - Presionar `i` para abrir en simulador iOS

## 📱 Estructura de la Aplicación

```
LoginApp/
├── app/
│   ├── (tabs)/
│   │   ├── index.tsx        # Pantalla principal (Lista de tareas)
│   │   ├── profile.tsx      # Menú principal
│   │   └── perfil.tsx       # Detalles del perfil
│   ├── login.tsx            # Pantalla de login
│   └── _layout.tsx          # Layout principal con protección de rutas
├── components/
│   ├── context/
│   │   └── auth_context.tsx # Contexto de autenticación global
│   ├── new-task.tsx         # Formulario para crear tareas con foto y GPS
│   ├── task-item.tsx        # Componente de item de tarea con imagen
│   └── ui/                  # Componentes de interfaz reutilizables
├── services/
│   ├── auth-service.ts      # Servicio de autenticación con API
│   └── todo-service.ts      # Servicio CRUD de tareas con API
├── utils/
│   └── storage.ts           # Funciones de almacenamiento con AsyncStorage
└── constants/
    ├── config.ts            # Configuración de variables de entorno
    ├── theme.ts             # Tema y colores
    └── types.tsx            # Definiciones de tipos TypeScript
```

## 🛠️ Tecnologías Utilizadas

- **React Native**: Framework para desarrollo móvil
- **Expo**: Plataforma de desarrollo y herramientas
- **TypeScript**: Lenguaje de programación tipado
- **Expo Router**: Navegación basada en archivos
- **AsyncStorage**: Almacenamiento local persistente para tokens
- **Axios**: Cliente HTTP para consumo de API REST
- **jose**: Librería para decodificación y validación de JWT
- **Expo Camera**: Integración con cámara del dispositivo
- **Expo Image Picker**: Selección y captura de imágenes
- **Expo Location**: Servicios de geolocalización GPS

## 📺 Demo

[Video de funcionamiento](https://ipciisa-my.sharepoint.com/:f:/g/personal/cristopher_rivera_concha_estudiante_ipss_cl/IgBCuIvUwhGsQJj7ileg9cM4AfD5TlOwhRVkm3Fh0bKyg80?e=xr3YfD)

## 📝 Funcionalidades

### Autenticación
- Login de usuarios contra API REST
- Autenticación mediante JWT (JSON Web Token)
- Decodificación y validación de tokens con librería `jose`
- Almacenamiento seguro del token en AsyncStorage
- Persistencia de sesión entre reinicios de app
- Cierre de sesión con limpieza de token
- Protección de rutas según estado de autenticación

### Gestión de Tareas (CRUD Completo)
- **Crear**: Nuevas tareas con título, foto y ubicación GPS enviadas al backend
- **Leer**: Listar todas las tareas del usuario autenticado desde el backend
- **Actualizar**: Marcar tareas como completadas/no completadas mediante API
- **Eliminar**: Borrar tareas desde el backend
- Visualización personalizada por usuario (solo sus tareas)
- Todas las operaciones sincronizadas con el servidor

### Captura de Multimedia
- Integración con cámara del dispositivo
- Captura de fotografías desde la app
- Permisos de cámara gestionados automáticamente
- Visualización de imágenes en las tareas

### Geolocalización
- Captura automática de coordenadas GPS al crear tareas
- Solicitud de permisos de ubicación
- Precisión balanceada para optimizar batería
- Visualización de latitud y longitud en cada tarea

### Perfil de Usuario
- Visualización del email del usuario autenticado
- Información extraída del token JWT
- Navegación entre secciones mediante tabs

### Manejo de Imagenes
- Funcionalidad para subida de imagenes, alojadas en servidor externo conectado por backend
- Optimizacion en manejo de imagenes para reducir el tamaño de subia

### Utilizacion de CustoHook
- Creacion de custom hook llamado use-todo-list.ts
- Separacion del manejo de la logica de negocio de front
- Mejora en experiencia del desarollador al limpiar interfaz de logica y funcionalidades

## � API Backend

La aplicación consume la API REST documentada en:
**https://todo-list.dobleb.cl/docs**

### Endpoints Utilizados:
- `POST /auth/login` - Autenticación de usuarios
- `GET /todos` - Listar tareas del usuario
- `POST /todos` - Crear nueva tarea
- `PUT /todos/:id` - Actualizar tarea existente
- `DELETE /todos/:id` - Eliminar tarea

Todos los endpoints protegidos requieren el header:
```
Authorization: Bearer <token-jwt>
```

## 📄 Licencia

Este proyecto fue desarrollado con fines académicos para la asignatura de Desarrollo de Aplicaciones Móviles.

---

**Evaluación 3 - Tercer Trimestre 2025**
