# OEFA Scraper

Scraper desarrollado en **TypeScript** para extraer información de resoluciones publicadas por el OEFA mediante peticiones HTTP, sin utilizar automatización de navegador.

El scraper implementa navegación por todas las páginas de resultados, extracción de información de los documentos, descarga de archivos PDF asociados y manejo de errores con reintentos mediante backoff exponencial.

---

# Características

- Navegación automática por todas las páginas.
- Obtención dinámica del `ViewState` de JSF.
- Mantención automática de la sesión (`JSESSIONID`).
- Extracción de todos los documentos disponibles.
- Descarga de los PDFs asociados.
- Nombres descriptivos para los archivos descargados.
- Reintentos automáticos con backoff exponencial para errores HTTP 429.
- Registro de descargas fallidas.
- Exportación de los documentos extraídos a formato JSON.
- Logging del progreso de ejecución.

---

# Tecnologías

- TypeScript
- Axios
- Cheerio
- Tough Cookie
- Axios CookieJar Support

---

# Estructura del proyecto

```text
scraper-challenge/

├── downloads/
│   └── PDFs descargados
│
├── output/
│   ├── documents.json
│   └── failed-downloads.jsonl
│
├── src/
│   ├── http/
│   ├── models/
│   ├── scraper/
│   └── utils/
│
├── package.json
├── tsconfig.json
└── README.md
```

---

# Instalación

Instalar las dependencias:

```bash
npm install
```

---

# Ejecución

Modo desarrollo:

```bash
npm run dev
```

Compilar:

```bash
npm run build
```

Ejecutar compilado:

```bash
npm start
```

---

# Archivos generados

## Downloads

Contiene todos los PDFs descargados.

```text
downloads/
```

---

## Documentos extraídos

Contiene todos los documentos obtenidos durante el scraping.

```text
output/documents.json
```

---

## Descargas fallidas

Contiene los documentos cuya descarga no pudo completarse después de todos los reintentos.

```text
output/failed-downloads.jsonl
```

---

# Manejo de errores

El scraper implementa:

- Reintentos automáticos.
- Backoff exponencial para respuestas HTTP **429 (Too Many Requests)**.
- Continuación automática con el siguiente documento cuando un PDF no puede descargarse.
- Registro de las descargas fallidas para reintentos posteriores.

---

# Decisiones de diseño

Este scraper fue implementado utilizando únicamente peticiones HTTP.

No utiliza herramientas de automatización de navegador como:

- Puppeteer
- Playwright
- Selenium

La navegación fue implementada reproduciendo las peticiones realizadas por la aplicación JSF del sitio.

---

# Creación del proyecto

Estos son los pasos utilizados para crear el proyecto desde cero.

## Crear la carpeta

```bash
mkdir scraper-challenge
cd scraper-challenge
```

## Inicializar npm

```bash
npm init -y
```

## Instalar dependencias de producción

```bash
npm install axios cheerio
```

## Instalar dependencias de desarrollo

```bash
npm install -D typescript tsx @types/node
```

## Crear el proyecto TypeScript

```bash
npx tsc --init
```

## Soporte para cookies (JSESSIONID)

```bash
npm install tough-cookie axios-cookiejar-support
```

## Instalar Prettier

```bash
npm install -D prettier
```

---

# Licencia

Proyecto desarrollado con fines de evaluación técnica.
