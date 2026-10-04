import { createApp } from 'vue';
import E2eHarness from '@e2e/e2e-harness.vue';
import '@morev/vue-transitions/styles';

createApp(E2eHarness, { vueMajor: 3 }).mount('#app');
