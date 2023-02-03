<template>
  <div class="home">
    <navbar-component></navbar-component>
    <calendar-component></calendar-component>
  </div>
</template>

<script>
// @ is an alias to /src
import CalendarComponent from '@/components/CalendarComponent.vue'
import NavbarComponent from '@/components/NavbarComponent.vue'

export default {
  name: 'HomeView',
  components: {
    CalendarComponent,
    NavbarComponent
  }
}
</script>
