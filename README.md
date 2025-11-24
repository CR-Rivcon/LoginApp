# LoginApp - Aplicación de Gestión de Tareas

## 📋 Descripción del Proyecto

LoginApp es una aplicación móvil desarrollada con React Native y Expo que permite a los usuarios autenticarse y gestionar sus tareas personales. La aplicación cuenta con un sistema de login, registro de usuarios y una interfaz intuitiva para crear, visualizar y administrar una lista de tareas, indicando ademas coordenadas e imagenes del registro (To-Do List).

### Características Principales

- **Sistema de Autenticación**: Login y logout de usuarios con almacenamiento local
- **Gestión de Tareas**: Crear, completar y eliminar tareas personalizadas
- **Perfil de Usuario**: Visualización de información del usuario
- **Navegación por Tabs**: Interfaz intuitiva con navegación entre diferentes secciones
- **Almacenamiento Persistente**: Las tareas se guardan localmente en el dispositivo

## 👥 Información del Proyecto

**Estudiantes:**
- Chirlett Jaqueline Teixeira Pino
- Cristopher Andrés Rivera Concha

**Profesor:** Boris Marcelo Belmar Muñoz

**Asignatura:** Desarrollo de Aplicaciones Móviles

**Institución:** Instituto Profesional San Sebastian

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

3. Iniciar la aplicación:
```bash
npx expo start
```

4. Abrir la aplicación:
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
│   └── _layout.tsx          # Layout principal
├── components/
│   ├── context/
│   │   └── auth_context.tsx # Contexto de autenticación
│   ├── new-task.tsx         # Componente para crear tareas
│   ├── task-item.tsx        # Componente de item de tarea
│   └── ui/                  # Componentes de interfaz
├── utils/
│   └── storage.ts           # Funciones de almacenamiento local
└── constants/
    ├── theme.ts             # Tema y colores
    └── types.tsx            # Definiciones de tipos
```

## 🛠️ Tecnologías Utilizadas

- **React Native**: Framework para desarrollo móvil
- **Expo**: Plataforma de desarrollo
- **TypeScript**: Lenguaje de programación
- **AsyncStorage**: Almacenamiento local persistente
- **Expo Router**: Navegación basada en archivos

## 📺 Demo

[Video de funcionamiento](https://ipciisa-my.sharepoint.com/:f:/g/personal/cristopher_rivera_concha_estudiante_ipss_cl/IgBCuIvUwhGsQJj7ileg9cM4AfD5TlOwhRVkm3Fh0bKyg80?e=xr3YfD)

## 📝 Funcionalidades

### Autenticación
- Login de usuarios registrados
- Cierre de sesión
- Persistencia de sesión

### Gestión de Tareas
- Crear nuevas tareas con título y descripción
- Marcar tareas como completadas
- Eliminar tareas
- Visualización personalizada por usuario

### Perfil
- Visualización de información del usuario
- Navegación entre secciones
- Menú con accesos directos

## 📄 Licencia

Este proyecto fue desarrollado con fines académicos para la asignatura de Desarrollo de Aplicaciones Móviles.

---

**Evaluación 2 - Tercer Trimestre 2025**
