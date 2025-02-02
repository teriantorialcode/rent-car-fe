<template>
  <div class="app-container">
    <h1>Rent Car System</h1>
    <div class="button-container">
      <router-link to="/add-car">
        <button class="action-button">Add Car</button>
      </router-link>
      <router-link to="/car">
        <button class="action-button">View Car</button>
      </router-link>
      <router-link to="/booking">
        <button class="action-button booking-button">Rent A Car!</button>
      </router-link>
      <router-link to="/rentals">
        <button class="action-button">Rent car List</button>
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: 'App',
};
</script>

<style scoped>
.app-container {
  text-align: center;
  margin: 50px auto;
  max-width: 600px;
  font-family: Arial, sans-serif;
}

h1 {
  font-size: 2.5rem;
  color: #333;
  margin-bottom: 20px;
}

.button-container {
  display: flex;
  flex-direction: column; /* Menambahkan kolom agar tombol terlihat satu per satu */
  gap: 10px; /* Memberikan jarak antar tombol */
}

.action-button {
  background-color: #007bff;
  color: white;
  border: none;
  padding: 15px; /* Tambahkan padding agar tombol lebih lebar */
  font-size: 1rem;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  width: 100%; /* Membuat tombol lebar 100% menyesuaikan ukuran container */
}

.action-button:hover {
  background-color: #0056b3;
}

.booking-button {
  background-color: red; /* Set background color to red */
  color: white; /* Set text color to white */
}

.action-button:focus {
  outline: none;
  box-shadow: 0 0 5px rgba(0, 123, 255, 0.75);
}
</style>
