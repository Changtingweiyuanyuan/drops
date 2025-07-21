<script setup>
import {provide, ref} from 'vue'
import MonsterCard from './MonsterCard.vue'

defineProps({
	monsters: Array,
})

const itemsDatabase = ref(null)
const isLoadingItems = ref(false)
const assetsUrl = import.meta.env.VITE_ASSETS_URL;
const ensureItemsDatabase = async () => {
	if (itemsDatabase.value || isLoadingItems.value) return

	isLoadingItems.value = true
	try {
		const itemsDataUrl = `${assetsUrl}/items_database.json`
		const response = await fetch(itemsDataUrl)
		itemsDatabase.value = await response.json()
	} catch (e) {
		console.error('Failed to load items database:', e)
	} finally {
		isLoadingItems.value = false
	}
}

provide('itemsDatabase', itemsDatabase)
provide('ensureItemsDatabase', ensureItemsDatabase)
</script>

<template>
	<div class="monster-list-container">
		<div
			v-if="monsters && monsters.length > 0"
			class="monster-grid">
			<MonsterCard
				v-for="monster in monsters"
				:key="monster.id"
				:monster="monster" />
		</div>
		<div
			v-else
			class="no-results">
			<span class="no-results-text">找不到符合條件的魔物資料</span>
		</div>
	</div>
</template>

<style scoped lang="scss">
.monster-list-container {
	width: 100%;
	margin-top: 24px;
}
.monster-grid {
	display: flex;
	flex-wrap: wrap;
	gap: 16px;
	overflow: hidden;
}
.no-results {
	height: 160px;
	color: #e6e6e6;
	display: flex;
	justify-content: center;
	align-items: end;
	font-size: 20px;
	font-weight: bold;

	&-text {
		position: relative;

		//&::after {
		//  content: "NOTHING FOUND";
		//  font-family: "Slackey";
		//  position: absolute;
		//  bottom: 38px;
		//  left: 50%;
		//  transform: translate(-50%, 0);
		//  width: 100%;
		//  font-size: 22px;
		//  word-break: keep-all;
		//  filter: drop-shadow(2px 2px 0px black) drop-shadow(-1px -1px 0px black);
		//  color: #000;
		//  filter: drop-shadow(2px 2px 0px #e6e6e6) drop-shadow(-1px -1px 0px #e6e6e6);
		//}
		&::after {
			content: '';
			position: absolute;
			bottom: 42px;
			left: 50%;
			transform: translate(-50%, 0);
			width: 36px;
			height: 36px;
			background-image: url('/twroz-drop/images/ui/not-found.png');
			background-repeat: no-repeat;
			background-size: contain;
		}
	}
}
</style>
