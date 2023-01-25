<template>
  <div class="home">
    <calendar-component></calendar-component>
  </div>
</template>

<script>
// @ is an alias to /src
import CalendarComponent from '@/components/CalendarComponent.vue'

export default {
  name: 'HomeView',
  components: {
    CalendarComponent
  }
}
</script>
