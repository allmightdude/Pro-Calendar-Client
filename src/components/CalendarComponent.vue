<template>
  <div class="loading" v-if="loading">
    <base-card>
      <img src="@/assets/loader.gif" alt="" />
    </base-card>
  </div>

  <base-dialog :show="show" @close="handleError" :event="eventSelected"></base-dialog>

  <div class="calendar-container">
    <div class="calendar-header">
      <div class="header">
        <button @click="prevMmonth">
          <i class="fa-solid fa-arrow-left"></i>
        </button>
        <h1>
          {{ currentMonth }}
        </h1>
        <button @click="nextMmonth">
          <i class="fa-solid fa-arrow-right"></i>
        </button>
      </div>

      <p>{{ currentYear }}</p>
    </div>
    <div class="calendar">
      <span class="day-name">SUN</span><span class="day-name">MON</span
      ><span class="day-name">TUE</span><span class="day-name">WED</span
      ><span class="day-name">THU</span><span class="day-name">fri</span
      ><span class="day-name">SAT</span>

      <div
        class="day day--disabled"
        v-for="(index, day) in currentFirstDay"
        :key="day"
      >
        {{ prevLastDate - (currentFirstDay - index) }}
      </div>

      <!-- Main Days of Month -->

      <div class="day" v-for="day in currentLastDate" :key="day">
        <div :class="{ today: isToday(day) }">
          {{ day }}

          <ul class="task-wrapper" v-if="checkEvent(day).length > 0">
            <li
              class="task task--warning"
              v-for="task in checkEvent(day)"
              :key="task.id"
              @click="showEvent(task)"
            >
              {{ task.name }}
            </li>
          </ul>
        </div>
      </div>
      <div
        class="day day--disabled"
        v-for="day in nextDays"
        :key="day"
        ref="testRef"
      >
        {{ day }}
      </div>
      <!-- <div class="day day--disabled">31</div>
      <div class="day">1</div>
      <div clascd client s="day">2</div>
      <div class="day day--disabled">1</div>
      <div class="day day--disabled">2</div>
      <section class="task task--warning">Projects</section>
      <section class="task task--danger">Design Sprint</section>
      <section class="task task--primary">
        Product Checkup 1
        <div class="task__detail">
          <h2>Product Checkup 1</h2>
          <p>15-17th November</p>
        </div>
      </section>
      <section class="task task--info">Product Checkup 2</section> -->
    </div>
  </div>
</template>

<script>
import { computed, onMounted, reactive, ref } from "vue";
import { collection, getDocs } from "firebase/firestore";
import { useStore } from "vuex";
import db from "../init.js";

export default {
  setup() {
    const store = useStore();

    let date = ref(null);
    let currentDate = ref(new Date());
    date.value = new Date();
    let width = ref();
    let show = ref(false);
    let eventSelected = reactive({});

    // Get Events
    let loading = ref(false);
    async function getEvents() {
      loading.value = true;
      try {
        const querySnapshot = await getDocs(collection(db, "myEvent"));
        let events = [];
        querySnapshot.forEach((doc) => {
          let appData = doc.data();
          appData.id = doc.id;
          events.push(appData);
        });
        store.dispatch("events/getEvents", {
          events: events,
        });
      } catch (error) {
        console.log(error);
      }
      loading.value = false;
    }

    let myEvents = computed(() => {
      return store.getters["events/getEvents"];
    });

    onMounted(() => {
      width.value = document.querySelector(".day").clientWidth;
      getEvents();
    });

    const months = [
      "January",
      "Februay",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    // Get last and first index day of current month
    let currentFirstDay = computed(() => {
      return new Date(
        date.value.getFullYear(),
        date.value.getMonth(),
        1
      ).getDay();
    });
    let currentLastDay = computed(() => {
      return new Date(date.value.getFullYear(), date.value.getMonth() + 1, 0);
    });

    // current and prev month date last day
    const currentLastDate = computed(() => {
      return new Date(
        date.value.getFullYear(),
        date.value.getMonth() + 1,
        0
      ).getDate();
    });

    let prevLastDate = computed(() => {
      return new Date(
        date.value.getFullYear(),
        date.value.getMonth(),
        0
      ).getDate();
    });

    // corrent last day index
    const lastDayIndex = computed(() => {
      return new Date(
        date.value.getFullYear(),
        date.value.getMonth() + 1,
        0
      ).getDay();
    });

    const nextDays = computed(() => {
      return 7 - lastDayIndex.value - 1;
    });

    // Get current month name
    let currentMonth = computed(() => {
      return months[date.value.getMonth()];
    });

    // Get current Year
    let currentYear = computed(() => {
      return date.value.getFullYear();
    });

    // action months
    const nextMmonth = function () {
      date.value = new Date(
        date.value.getFullYear(),
        date.value.getMonth() + 1,
        1
      );
      // date.value = new Date(date.value.setMonth(date.value.getMonth() + 1));
    };

    const prevMmonth = function () {
      // date.value = new Date(date.value.setMonth(date.value.getMonth() - 1));
      date.value = new Date(
        date.value.getFullYear(),
        date.value.getMonth() - 1,
        1
      );
      console.log(date.value);
    };

    // Mark Today
    function isToday(day) {
      return (
        day === currentDate.value.getDate() &&
        currentDate.value.getMonth() === new Date().getMonth() &&
        currentDate.value.getFullYear() === new Date().getFullYear()
      );
    }

    // Check Event
    function checkEvent(day) {
      let events = myEvents.value.filter((event) => {
        let dayEvent = event.start.split("-")[2];
        let monthEvent = Number(event.start.split("-")[1]);
        let yearEvent = event.start.split("-")[0];
        if (
          dayEvent == day &&
          monthEvent == date.value.getMonth() + 1 &&
          yearEvent == date.value.getFullYear()
        ) {
          return event;
        }
      });

      return events;
    }

    // Show Event Detail
    function showEvent(task) {
      eventSelected.value = task;
      console.log(eventSelected.value);
      show.value = true;
    }

    function handleError() {
      show.value = false;
    }

    return {
      currentFirstDay,
      currentLastDay,
      currentLastDate,
      prevLastDate,
      nextDays,

      currentMonth,
      currentYear,

      nextMmonth,
      prevMmonth,
      date,

      isToday,

      myEvents,
      width,
      checkEvent,

      showEvent,
      show,
      handleError,

      loading,
      eventSelected
    };
  },
};
</script>

<style scoped lang="scss">

.today {
  font-weight: bold;
  font-size: 1rem;
  border-bottom: 2px solid #2c3e50;
  color: #2c3e50;
  display: inline-block;
}

.loading {
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 100;
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(4px);

  img {
    width: 4rem;
    height: 4rem;
  }
}

.calendar {
  display: grid;
  width: 100%;
  grid-template-columns: repeat(7, minmax(120px, 1fr));
  grid-template-rows: 50px;
  grid-auto-rows: 120px;

  &-container {
    width: 90%;
    margin: auto;
    box-shadow: 0 2px 20px rgba(0, 0, 0, 0.1);
    border-radius: 10px;
    background: #fff;
    max-width: 1200px;
  }

  &-header {
    text-align: center;
    padding: 20px 0;
    background: linear-gradient(
      to bottom,
      rgb(250, 251, 253) 0%,
      rgba(255, 255, 255, 0) 100%
    );

    .header {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 1rem;
    }
    border-bottom: 1px solid rgba(166, 168, 179, 0.12);

    h1 {
      margin: 0;
      font-size: 18px;
    }

    p {
      margin: 5px 0 0 0;
      font-size: 13px;
      font-weight: 600;
      color: rgba(#51565d, 0.4);
    }

    button {
      background: 0;
      border: 0;
      padding: 0;
      color: rgba(#51565d, 0.7);
      cursor: pointer;
      outline: 0;
    }
  }
}

.task-wrapper {
  width: 100%;
  height: 100px;
  -ms-overflow-style: none; /* for Internet Explorer, Edge */
  scrollbar-width: none; /* for Firefox */
  overflow: hidden;
  overflow-y: scroll;
  z-index: 10;
}

ul,
li {
  list-style-type: none;
}

.calendar {
  display: grid;
  width: 100%;
  grid-template-columns: repeat(7, minmax(120px, 1fr));
  grid-template-rows: 50px;
  grid-auto-rows: 120px;
  overflow: auto;

  &-container {
    width: 90%;
    margin: auto;
    overflow: hidden;
    box-shadow: 0 2px 20px rgba(0, 0, 0, 0.1);
    border-radius: 10px;
    background: #fff;
    max-width: 1200px;
  }

  &-header {
    text-align: center;
    padding: 20px 0;
    background: linear-gradient(
      to bottom,
      rgb(250, 251, 253) 0%,
      rgba(255, 255, 255, 0) 100%
    );
    border-bottom: 1px solid rgba(166, 168, 179, 0.12);

    h1 {
      margin: 0;
      font-size: 18px;
    }

    p {
      margin: 5px 0 0 0;
      font-size: 13px;
      font-weight: 600;
      color: rgba(#51565d, 0.4);
    }

    button {
      background: 0;
      border: 0;
      padding: 0;
      color: rgba(#51565d, 0.7);
      cursor: pointer;
      outline: 0;
    }
  }
}

.day {
  border-bottom: 1px solid rgba(166, 168, 179, 0.12);
  border-right: 1px solid rgba(166, 168, 179, 0.12);
  text-align: right;
  padding: 14px 20px;
  letter-spacing: 1px;
  font-size: 1.2rem;
  box-sizing: border-box;
  color: #98a0a6;
  position: relative;
  z-index: 1;

  &:nth-of-type(7n + 7) {
    border-right: 0;
  }

  &:nth-of-type(n + 1):nth-of-type(-n + 7) {
    grid-row: 2;
  }

  &:nth-of-type(n + 8):nth-of-type(-n + 14) {
    grid-row: 3;
  }

  &:nth-of-type(n + 15):nth-of-type(-n + 21) {
    grid-row: 4;
  }

  &:nth-of-type(n + 22):nth-of-type(-n + 28) {
    grid-row: 5;
  }

  &:nth-of-type(n + 29):nth-of-type(-n + 35) {
    grid-row: 6;
  }

  &:nth-of-type(7n + 1) {
    grid-column: 1/1;
  }

  &:nth-of-type(7n + 2) {
    grid-column: 2/2;
  }

  &:nth-of-type(7n + 3) {
    grid-column: 3/3;
  }

  &:nth-of-type(7n + 4) {
    grid-column: 4/4;
  }

  &:nth-of-type(7n + 5) {
    grid-column: 5/5;
  }

  &:nth-of-type(7n + 6) {
    grid-column: 6/6;
  }
  &:nth-of-type(7n + 7) {
    grid-column: 7/7;
  }

  &-name {
    font-size: 12px;
    text-transform: uppercase;
    color: #99a1a7;
    text-align: center;
    border-bottom: 1px solid rgba(166, 168, 179, 0.12);
    line-height: 50px;
    font-weight: 500;
  }

  &--disabled {
    color: rgba(#98a0a6, 0.6);
    background-color: #ffffff;
    background-image: url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23f9f9fa' fill-opacity='1' fill-rule='evenodd'%3E%3Cpath d='M0 40L40 0H20L0 20M40 40V20L20 40'/%3E%3C/g%3E%3C/svg%3E");
    cursor: not-allowed;
  }
}

.task {
  border-left-width: 3px;
  padding: 0.4rem 0.6rem;
  border-left-style: solid;
  font-size: 0.9rem;
  position: relative;
  left: 0;
  opacity: 0.7;
  text-align: left;
  display: block;
  margin-top: 0.2rem;
  cursor: pointer;

  &--warning {
    border-left-color: #fdb44d;
    grid-column: 4 / span 3;
    grid-row: 3;
    background: #fef0db;
    align-self: center;
    color: darken(#fdb44d, 12%);
    // margin-top: -5px;
  }

  &--danger {
    border-left-color: #fa607e;
    grid-column: 2 / span 3;
    grid-row: 3;
    margin-top: 15px;
    background: rgba(#fdc5d0, 0.7);
    align-self: end;
    color: darken(#fa607e, 12%);
  }

  &--info {
    border-left-color: #4786ff;
    grid-column: 6 / span 2;
    grid-row: 5;
    margin-top: 15px;
    background: rgba(#dae7ff, 0.7);
    align-self: end;
    color: darken(#4786ff, 12%);
  }

  &--primary {
    background: #4786ff;
    border: 0;
    border-radius: 4px;
    grid-column: 3 / span 3;
    grid-row: 4;
    align-self: end;
    color: #fff;
    box-shadow: 0 10px 14px rgba(#4786ff, 0.4);
  }

  &__detail {
    position: absolute;
    left: 0;
    top: calc(100% + 10px);
    background: #fff;
    border: 1px solid rgba(166, 168, 179, 0.2);
    color: #000;
    padding: 20px;
    box-sizing: border-box;
    border-radius: 4px;
    box-shadow: 0 10px 40px rgba(0, 0, 0, 0.08);
    z-index: 2;

    &:after,
    &:before {
      bottom: 100%;
      left: 30%;
      border: solid transparent;
      content: " ";
      height: 0;
      width: 0;
      position: absolute;
      pointer-events: none;
    }

    &:before {
      border-bottom-color: rgba(166, 168, 179, 0.2);
      border-width: 8px;
      margin-left: -8px;
    }

    &:after {
      border-bottom-color: #fff;
      border-width: 6px;
      margin-left: -6px;
    }

    h2 {
      font-size: 15px;
      margin: 0;
      color: #51565d;
    }

    p {
      margin-top: 4px;
      font-size: 12px;
      margin-bottom: 0;
      font-weight: 500;
      color: rgba(#51565d, 0.7);
    }
  }
}
</style>
