<script setup>
import Home from './views/Home.vue'
import ElementResistanceTable from './views/ElementResistanceTable.vue'
import Header from './components/Header.vue'
import Footer from './components/Footer.vue'
</script>

<template>
	<Header />
	<router-view />
	<Footer />
</template>

<style scoped></style>
