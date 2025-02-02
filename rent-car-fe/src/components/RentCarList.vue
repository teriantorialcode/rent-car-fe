<template>
  <div class="rent-car-list">
    <h1>Rental Car Bookings</h1>

    <table v-if="rentCarList.length > 0">
      <thead>
        <tr>
          <th class="brand-column">Brand</th>
          <th class="customer-column">Customer</th>
          <th class="date-column">Date</th>
          <th class="time-slot-column">Time Slot</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="booking in rentCarList" :key="booking.id">
          <td>{{ booking.brand }}</td>
          <td>{{ booking.customerName }}</td>
          <td>{{ formatDate(booking.date) }}</td>
          <td>{{ booking.timeSlot }}</td>
        </tr>
      </tbody>
    </table>

    <p v-else class="empty-message">No bookings available.</p>

    <button @click="goHome" class="back-button">Back to Home</button>
  </div>
</template>

<script>
import apiClient from '@/api/api.js'

export default {
  name: 'RentCarList',
  data() {
    return {
      rentCarList: [],
    }
  },
  methods: {
    async fetchRentCarList() {
      try {
        const response = await apiClient.get('/Booking/rent-car-list')
        this.rentCarList = response.data
      } catch (error) {
        console.error('Error fetching rent car list:', error)
      }
    },
    formatDate(dateString) {
      const options = { year: 'numeric', month: 'long', day: 'numeric' }
      return new Date(dateString).toLocaleDateString(undefined, options)
    },
    goHome() {
      this.$router.push('/')
    }
  },
  created() {
    this.fetchRentCarList()
  }
}
</script>

<style scoped>
.rent-car-list {
  max-width: 1000px;
  margin: 0 auto;
  text-align: center;
  padding: 20px;
}

h1 {
  margin-bottom: 30px;
}

table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
}

th, td {
  padding: 12px;
  border: 1px solid #ddd;
  text-align: center;
}

th {
  background-color: #2c3e50;
  color: white;
}

td {
  font-size: 16px;
}

.empty-message {
  color: gray;
  font-size: 18px;
  margin-top: 20px;
}

.back-button {
  margin-top: 30px;
  padding: 12px 20px;
  background-color: #3498db;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
}

.back-button:hover {
  background-color: #2980b9;
}

th.brand-column {
  width: 25%; /* Increase the width of the brand column */
}

th.customer-column {
  width: 30%; /* Increase the width of the customer column */
}

th.date-column {
  width: 20%; /* Increase the width of the date column */
}

th.time-slot-column {
  width: 25%; /* Increase the width of the time slot column */
}

td {
  word-wrap: break-word; /* Ensure that long text does not overflow */
}
</style>
