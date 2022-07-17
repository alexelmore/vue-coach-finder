
import { createApp } from "vue";
import router from './router.js'
import App from "./App.vue";
import store from './store/index.js';
import BaseCard from './components/ui/BaseCard.vue';
import BaseButton from './components/ui/BaseButton.vue';
import BaseBadge from './components/ui/BaseBadge.vue'
import BaseSpinner from './components/ui/BaseSpinner.vue'
import BaseDialog from './components/ui/BaseDialog.vue'
import BaseModal from './components/ui/BaseModal.vue'
const app = createApp(App);

app.use(store);
app.use(router);
app.component('BaseCard', BaseCard)
app.component('BaseButton', BaseButton)
app.component('BaseBadge', BaseBadge)
app.component('BaseSpinner', BaseSpinner)
app.component('BaseDialog', BaseDialog)
app.component('BaseModal', BaseModal)
app.mount('#app')
