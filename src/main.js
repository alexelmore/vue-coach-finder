
import { createApp } from "vue";
import router from './router.js'
import App from "./App.vue";
import store from './store/index.js';
import BaseCard from './components/ui/BaseCard.vue';
import BaseButton from './components/ui/BaseButton.vue';

const app = createApp(App);

app.use(store);
app.use(router);
app.component('BaseCard', BaseCard)
app.component('BaseButton', BaseButton)
app.mount('#app')
