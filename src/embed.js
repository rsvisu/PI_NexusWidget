/**
 * Punto de entrada del build embebible
 * Crea un contenedor con Shadow DOM, inyecta el CSS de Tailwind dentro y monta el Chatbot
 * Así los estilos del widget quedan aislados de los de la página anfitriona (WordPress)
 */

import styles from './assets/main.css?inline'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

import Chatbot from './components/Chatbot.vue'

// # Funciones:
/**
 * Tailwind v4 registra variables con @property que el navegador ignora dentro de un shadow root
 * Las copiamos al <head>, a nivel de documento, para que var(--tw-*) resuelva dentro del widget
 * @param {*} css
 */
function registerTailwindProperties(css) {
  const rules = css.match(/@property[^{]+\{[^}]+\}/g)
  if (!rules) return

  const style = document.createElement('style')
  style.textContent = rules.join('')
  document.head.appendChild(style)
}

// # Main:
// Contenedor del widget en la página anfitriona
const host = document.createElement('div')
host.id = 'nexus-widget-host'
document.body.appendChild(host)

// Shadow DOM en modo abierto: aísla los estilos en ambos sentidos y permite inspeccionarlo
const shadowRoot = host.attachShadow({ mode: 'open' })

// Tailwind v4 necesita registrar sus @property a nivel de documento, no aplican dentro del shadow
registerTailwindProperties(styles)

// Inyectamos el CSS compilado de Tailwind dentro del shadow root
// El sufijo ?inline hace que Vite procese main.css y lo entregue como string en vez de meterlo en el <head>
const style = document.createElement('style')
style.textContent = styles
shadowRoot.appendChild(style)

// Punto de montaje de Vue dentro del shadow root
const mountPoint = document.createElement('div')
shadowRoot.appendChild(mountPoint)

// Montamos el Chatbot
const app = createApp(Chatbot)

const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)
app.use(pinia)

app.mount(mountPoint)
