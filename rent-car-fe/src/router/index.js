import { createRouter, createWebHistory } from 'vue-router' // Vue 3-specific import
import HelloWorld from '@/components/HelloWorld.vue'
import CarModel from '@/components/Car.vue'
import BookingModel from '@/components/Booking.vue'
import AddCarModel from '@/components/AddCar.vue' // Import the AddCarModel component
import RentCarList from '@/components/RentCarList.vue'

const routes = [
  { path: '/car', component: CarModel },
  { path: '/booking', component: BookingModel },
  { path: '/add-car', component: AddCarModel },
  { path: '/', component: HelloWorld },
  { path: '/rentals', component: RentCarList },
]

const router = createRouter({
  history: createWebHistory(), // Use HTML5 history mode
  routes, // The array of routes
})

export default router
