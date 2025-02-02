<template>
  <div class="booking-container">
    <!-- Back Button -->
    <router-link to="/" class="back-button">
      <button>Back to Home</button>
    </router-link>

    <h1>Rent a Car</h1>

    <form @submit.prevent="submitBooking" class="booking-form">
      <div>
        <label for="name">Your Name:</label>
        <input type="text" id="name" v-model="name" required />
      </div>
      <div>
        <label for="email">Your Email:</label>
        <input type="email" id="email" v-model="email" required />
      </div>
      <div>
        <label for="phone">Your Phone Number:</label>
        <input type="text" id="phone" v-model="phone" required />
      </div>
      <div>
        <label for="car">Select Car:</label>
        <select id="car" v-model="selectedCar" required>
          <option v-for="car in cars" :key="car.id" :value="car.id">
            {{ car.name }}
          </option>
        </select>
      </div>
      <div>
        <label for="date">Preferred Date:</label>
        <input type="date" id="date" v-model="preferredDate" required />
      </div>
      <div>
        <label for="time">Preferred Time:</label>
        <select id="time" v-model="preferredTime" required>
          <option v-for="time in timeSlots" :key="time" :value="time">
            {{ time }}
          </option>
        </select>
      </div>

      <button type="submit">Submit Booking</button>
    </form>

    <!-- Error Message Display -->
    <div v-if="errorMessage" class="error-message">
      <p>{{ errorMessage }}</p>
    </div>

    <div v-if="bookingSubmitted" class="booking-summary">
      <h3>Booking Submitted</h3>
      <p>Name: {{ name }}</p>
      <p>Email: {{ email }}</p>
      <p>Phone: {{ phone }}</p>
      <p>Car: {{ selectedCarDetails.name }}</p>
      <p>Preferred Date: {{ preferredDate }}</p>
      <p>Preferred Time: {{ preferredTime }}</p>
    </div>
  </div>
</template>

<script>
import apiClient from '@/api/api.js'

export default {
  name: 'BookingModel',
  data() {
    return {
      name: '',
      email: '',
      phone: '',
      selectedCar: null,
      preferredDate: '',
      preferredTime: '',
      cars: [], // Array to store the cars for the dropdown
      bookingSubmitted: false,
      timeSlots: [], // Array for time slots
      errorMessage: '', // Add errorMessage to data
    }
  },
  computed: {
    selectedCarDetails() {
      return this.cars.find((car) => car.id === this.selectedCar)
    },
  },
  methods: {
    generateTimeSlots() {
      const timeSlots = []
      const startHour = 8 // Start at 08:00 AM
      const endHour = 18 // End at 06:00 PM
      for (let hour = startHour; hour < endHour; hour++) {
        timeSlots.push(`${String(hour).padStart(2, '0')}:00`)
        timeSlots.push(`${String(hour).padStart(2, '0')}:30`)
      }
      return timeSlots
    },
    async fetchCars() {
      try {
        const response = await apiClient.get('/Car/getallcars') // Call your API endpoint for car models
        this.cars = response.data // Assign the car models to the 'cars' array
      } catch (error) {
        console.error('Error fetching car models:', error)
      }
    },
    async submitBooking() {
      const bookingData = {
        carModelId: this.selectedCar,
        date: this.preferredDate,
        timeSlot: this.preferredTime,
        customerName: this.name,
        customerEmail: this.email,
        customerPhone: this.phone,
      }

      try {
        const response = await apiClient.post('/Booking', bookingData)

        // Handle the success case
        if (response.data.isSuccessful) {
          this.bookingSubmitted = true
          this.errorMessage = '' // Reset error message on success
        }
      } catch (error) {
        if (error.response && error.response.status === 400) {
          // Capture the error message returned from the backend
          this.errorMessage = error.response.data.message
        } else {
          console.error('Error booking test drive:', error)
          this.errorMessage = 'An unexpected error occurred. Please try again.'
        }
      }
    },
  },
  created() {
    this.timeSlots = this.generateTimeSlots() // Generate time slots dynamically
    this.fetchCars() // Fetch cars when the component is created
  },
}
</script>

<style scoped>
.booking-container {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
}

h1 {
  text-align: center;
  margin-bottom: 20px;
}

.back-button {
  display: block;
  margin-bottom: 20px;
  text-align: center;
}

button {
  padding: 10px 15px;
  background-color: #2c3e50;
  color: white;
  border: none;
  cursor: pointer;
  margin-top: 10px;
}

.booking-form {
  background-color: #f9f9f9;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

label {
  display: block;
  margin-bottom: 8px;
}

input,
select {
  width: 100%;
  padding: 8px;
  margin-bottom: 10px;
  border-radius: 4px;
  border: 1px solid #ddd;
}

.booking-summary {
  margin-top: 20px;
}

.booking-summary p {
  margin: 5px 0;
}

.error-message {
  color: red;
  margin-top: 10px;
}
</style>
