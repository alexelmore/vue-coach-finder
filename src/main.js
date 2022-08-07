
import { createApp, defineAsyncComponent } from "vue";
import router from './router.js'
import App from "./App.vue";
import store from './store/index.js';
import BaseCard from './components/ui/BaseCard.vue';
import BaseButton from './components/ui/BaseButton.vue';

// Load below components only when they are needed
const BaseDialog = defineAsyncComponent(() => import('./components/ui/BaseDialog.vue'))
const BaseBadge = defineAsyncComponent(() => import('./components/ui/BaseBadge.vue'))
const BaseSpinner = defineAsyncComponent(() => import('./components/ui/BaseSpinner.vue'))

// Vue app initialization
const app = createApp(App);

// Inject Vue store and router into our Vue App
app.use(store);
app.use(router);

// Add the below as Global app wide components
app.component('BaseCard', BaseCard)
app.component('BaseButton', BaseButton)
app.component('BaseBadge', BaseBadge)
app.component('BaseSpinner', BaseSpinner)
app.component('BaseDialog', BaseDialog)

// Mount our Vue app to the DOM
app.mount('#app')
