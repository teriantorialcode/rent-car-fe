import { createRouter, createWebHistory } from 'vue-router'; // Vue 3-specific import
import HelloWorld from "@/components/HelloWorld.vue"; 
import CarModel from '@/components/Car.vue';
import BookingModel from '@/components/BookingModel.vue';
import AddCarModel from '@/components/AddCar.vue'; // Import the AddCarModel component

const routes = [
  { path: '/car', component: CarModel },
  { path: '/booking', component: BookingModel },
  { path: '/add-car', component: AddCarModel }, 
  { path: '/', component: HelloWorld },
]; 

const router = createRouter({
  history: createWebHistory(), // Use HTML5 history mode
  routes, // The array of routes
});

export default router;
