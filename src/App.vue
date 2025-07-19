<script setup>
import Home from './views/Home.vue'
import AttributeTable from './views/AttributeTable.vue'
import Header from './components/Header.vue'
import Footer from './components/Footer.vue'
</script>

<template>
	<Header />
	<router-view />
	<Footer />
</template>

<style scoped></style>
