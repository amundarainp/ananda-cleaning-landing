# 🌸 DEG SRL - Landing Page

Landing page profesional para **DEG SRL Cleaning**, empresa de servicios de limpieza profesional.

![DEG SRL Logo](assets/images/logo.png)

---

## 📋 Índice

- [Características](#-características)
- [Estructura del Proyecto](#-estructura-del-proyecto)
- [Instalación](#-instalación)
- [Personalización](#-personalización)
- [Integración del Formulario](#-integración-del-formulario)
- [Deploy](#-deploy)
- [Tecnologías](#-tecnologías)
- [To-Do List](#-to-do-list)
- [Soporte](#-soporte)

---

## ✨ Características

✅ **Diseño Responsive**: Optimizado para móviles, tablets y desktop
✅ **Performance**: Código optimizado, animaciones suaves
✅ **SEO-Friendly**: Meta tags y estructura semántica
✅ **Accesibilidad**: ARIA labels y navegación por teclado
✅ **Modular**: Fácil de mantener y personalizar
✅ **Sin dependencias**: JavaScript vanilla, sin frameworks pesados
✅ **Cross-browser**: Compatible con navegadores modernos

---

## 📦 Estructura del Proyecto

```
deg-srl-cleaning-landing/
│
├── index.html                 # Página principal
│
├── css/
│   ├── style.css             # Estilos principales
│   └── responsive.css        # Estilos responsive
│
├── js/
│   ├── main.js               # JavaScript principal
│   └── form-handler.js       # Manejo del formulario
│
├── assets/
│   ├── images/               # Imágenes del sitio
│   │   └── logo.png         # Logo de DEG SRL (AGREGAR)
│   └── icons/                # Iconos personalizados
│
└── README.md                 # Este archivo
```

---

## 🚀 Instalación

### Opción 1: Clonar el repositorio

```bash
# Clonar el repositorio
git clone https://github.com/tu-usuario/deg-srl-cleaning-landing.git

# Entrar al directorio
cd deg-srl-cleaning-landing

# Abrir con tu editor favorito
code .
```

### Opción 2: Descargar ZIP

1. Click en **Code** > **Download ZIP**
2. Extraer el archivo
3. Abrir la carpeta en tu editor

### Visualizar localmente

Simplemente abre el archivo `index.html` en tu navegador, o usa:

**Live Server (VSCode)**:

- Instala la extensión "Live Server"
- Click derecho en `index.html` > "Open with Live Server"

**Python**:

```bash
python -m http.server 8000
# Abre http://localhost:8000
```

**Node.js**:

```bash
npx serve
```

---

## 🎨 Personalización

### 1. Colores y Tipografía

Edita las variables CSS en `css/style.css` (líneas 10-35):

```css
: root {
  /* Colores principales */
  --color-primary: #2c4251; /* Azul oscuro */
  --color-secondary: #3a5a6b; /* Azul acento */
  --color-accent: #5a8ca7; /* Azul claro */
  --color-bg-light: #e8e4dc; /* Beige/Crema */

  /* Tipografía */
  --font-heading: "Montserrat", sans-serif;
  --font-body: "Open Sans", sans-serif;
}
```

### 2. Logo

**Ubicación**: `assets/images/logo.png`

1. Guarda tu logo como `logo.png` en la carpeta `assets/images/`
2. Recomendaciones:
   - Formato: PNG con fondo transparente
   - Tamaño: 200x200px mínimo
   - Peso: Menos de 100KB

El logo se usa en:

- Header (línea 42 del `index.html`)
- Footer (línea 580 del `index.html`)

### 3. Contenido

#### Servicios (línea 140-220 de `index.html`)

Busca los comentarios `<!-- Service Card 1 -->` y edita:

```html
<div class="service-card">
  <div class="service-icon">
    <i class="fas fa-home"></i>
    <!-- Cambia el ícono -->
  </div>
  <h3 class="service-title">Tu Servicio</h3>
  <p class="service-description">Tu descripción aquí...</p>
</div>
```

**Iconos disponibles**: [Font Awesome Icons](https://fontawesome.com/icons)

#### Sobre Nosotros (línea 250-290 de `index.html`)

Edita los párrafos dentro de `.about-text` y las estadísticas en `.about-stats`.

#### Testimonios (línea 380-450 de `index.html`)

Reemplaza los testimonios placeholder con testimonios reales de clientes.

#### Información de Contacto (línea 550-580 de `index.html`)

```html
<p>+54 11 XXXX-XXXX</p>
<!-- Tu teléfono -->
<p>info@degsrl.com</p>
<!-- Tu email -->
<p>Buenos Aires, Argentina</p>
<!-- Tu ubicación -->
```

### 4. Imágenes

#### Galería (línea 460-520 de `index.html`)

Reemplaza los placeholders con imágenes reales:

```html
<div class="gallery-item">
  <img src="assets/images/antes-despues-1.jpg" alt="Antes y después" />
  <p class="gallery-caption">Limpieza de Edificios (Consorcios)</p>
</div>
```

**Recomendaciones para imágenes**:

- Formato: JPG o WebP
- Tamaño: 800x600px
- Peso: Menos de 200KB cada una
- Optimiza con: [TinyPNG](https://tinypng.com/)

#### Imagen "Sobre Nosotros" (línea 285 de `index.html`)

Reemplaza el placeholder con foto del equipo:

```html
<div class="about-image">
  <img src="assets/images/equipo.jpg" alt="Equipo DEG SRL" />
</div>
```

### 5. Redes Sociales (línea 595 de `index.html`)

Agrega los links reales de tus redes:

```html
<a href="https://facebook.com/tuusuario" class="social-link">
  <i class="fab fa-facebook-f"></i>
</a>
<a href="https://instagram.com/tuusuario" class="social-link">
  <i class="fab fa-instagram"></i>
</a>
<a href="https://wa.me/5491112345678" class="social-link">
  <i class="fab fa-whatsapp"></i>
</a>
```

---

## 📧 Integración del Formulario

El formulario actualmente está en modo **simulación**. Para que funcione realmente, elige una opción:

### Opción 1: EmailJS (Gratis, fácil) ⭐ RECOMENDADO

1. Crea cuenta en [EmailJS](https://www.emailjs.com/)
2. Configura un servicio de email
3. Crea una plantilla
4. En `js/form-handler.js` (línea 95), descomenta y configura:

```javascript
async function sendToEmailJS(formData) {
  emailjs.init("TU_PUBLIC_KEY");

  return emailjs.send("TU_SERVICE_ID", "TU_TEMPLATE_ID", formData);
}
```

5. En el evento submit (línea 70), reemplaza:

```javascript
await simulateFormSubmission(formData);
// Por:
await sendToEmailJS(formData);
```

### Opción 2: FormSpree (Gratis, sin código)

1. Crea cuenta en [Formspree](https://formspree.io/)
2. Crea un formulario y obtén tu endpoint
3. En `index.html` (línea 524), agrega:

```html
<form action="https://formspree.io/f/TU_FORM_ID" method="POST"></form>
```

### Opción 3: Google Sheets

1. Crea un Google Apps Script
2. Despliégalo como Web App
3. Usa el código en `js/form-handler.js` (línea 115)

### Opción 4: Tu propio backend

Si tienes backend (Node.js, PHP, etc. ):

```javascript
async function sendToBackend(formData) {
  const response = await fetch("https://tu-api.com/contact", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(formData),
  });
  return await response.json();
}
```

---

## 🌐 Deploy

### GitHub Pages (Gratis, fácil) ⭐

1. Ve a tu repositorio en GitHub
2. **Settings** > **Pages**
3. Source: **Deploy from branch**
4. Branch: **main** / **root**
5. Click **Save**
6. Tu sitio estará en: `https://tu-usuario.github.io/deg-srl-cleaning-landing/`

### Netlify (Gratis, con dominio custom)

1. Crea cuenta en [Netlify](https://www.netlify.com/)
2. **New site from Git**
3. Conecta tu repositorio
4. Deploy automático en cada push
5. Opcional: Conecta tu dominio personalizado

### Vercel (Gratis, rápido)

1. Instala Vercel CLI: `npm i -g vercel`
2. En la carpeta del proyecto: `vercel`
3. Sigue las instrucciones
4. Deploy: `vercel --prod`

### Hosting tradicional (cPanel, FTP)

1. Comprime todos los archivos en un ZIP
2. Sube vía FTP o File Manager
3. Descomprime en `public_html/`
4. Listo!

---

## 💻 Tecnologías

- **HTML5**: Estructura semántica
- **CSS3**: Flexbox, Grid, Variables, Animaciones
- **JavaScript (Vanilla)**: ES6+, sin frameworks
- **Font Awesome 6**: Iconos
- **Google Fonts**: Montserrat & Open Sans

**No requiere**:

- ❌ Node.js
- ❌ npm/yarn
- ❌ Build process
- ❌ Frameworks pesados

---

## ✅ To-Do List

Checklist para personalizar el sitio:

### Contenido

- [ ] Agregar logo real en `assets/images/logo.png`
- [ ] Personalizar textos de servicios
- [ ] Escribir historia real de la empresa
- [ ] Agregar testimonios reales de clientes
- [ ] Actualizar estadísticas (clientes, años, etc.)
- [ ] Completar datos de contacto (teléfono, email, dirección)
- [ ] Actualizar horarios de atención

### Imágenes

- [ ] Subir fotos reales de trabajos (antes/después)
- [ ] Agregar foto del equipo o instalaciones
- [ ] Optimizar imágenes (compresión)
- [ ] Agregar favicon

### Funcionalidad

- [ ] Integrar formulario con backend real
- [ ] Configurar EmailJS o FormSpree
- [ ] Agregar Google Analytics (opcional)
- [ ] Agregar Facebook Pixel (opcional)
- [ ] Testear en múltiples dispositivos

### Redes Sociales

- [ ] Agregar links reales de Facebook
- [ ] Agregar links reales de Instagram
- [ ] Agregar número de WhatsApp Business
- [ ] Agregar LinkedIn (opcional)

### SEO

- [ ] Personalizar meta description
- [ ] Agregar Open Graph images
- [ ] Crear sitemap. xml
- [ ] Verificar en Google Search Console

### Deploy

- [ ] Elegir plataforma de hosting
- [ ] Configurar dominio personalizado
- [ ] Configurar SSL (HTTPS)
- [ ] Testear velocidad de carga

---

## 🐛 Troubleshooting

### El menú móvil no funciona

- Verifica que los IDs coincidan: `hamburger`, `nav-menu`
- Revisa la consola del navegador (F12) por errores

### Las animaciones no funcionan

- Verifica que `main. js` esté cargando correctamente
- Algunos navegadores antiguos no soportan `IntersectionObserver`

### El formulario no envía

- Revisa la consola (F12) para ver errores
- Verifica que hayas configurado el backend/EmailJS
- Comprueba que los IDs de los campos coincidan

### Imágenes no cargan

- Verifica las rutas de las imágenes
- Asegúrate que los archivos existan en `assets/images/`
- Comprueba mayúsculas/minúsculas en los nombres

---

## 📞 Soporte

¿Necesitas ayuda para personalizar el sitio?

- 📧 Email: [Tu email de contacto]
- 💬 WhatsApp: [Tu número]
- 📝 Issues: [GitHub Issues](https://github.com/tu-usuario/deg-srl-cleaning-landing/issues)

---

## 📄 Licencia

Este proyecto fue creado específicamente para **DEG SRL**.

---

## 🙏 Créditos

- **Diseño y Desarrollo**: [Tu nombre]
- **Iconos**: [Font Awesome](https://fontawesome.com/)
- **Fuentes**: [Google Fonts](https://fonts.google.com/)

---

## 📝 Changelog

### Version 1.0.0 (Diciembre 2025)

- ✨ Lanzamiento inicial
- 🎨 Diseño completo responsive
- 📱 Optimización móvil
- 🚀 Sistema de navegación suave
- 📧 Formulario de contacto
- 🖼️ Galería de trabajos
- 💬 Slider de testimonios
- ⚡ Animaciones y efectos

---

**¡Éxito con tu proyecto! 🌸✨**
