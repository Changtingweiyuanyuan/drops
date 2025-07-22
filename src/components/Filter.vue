<script setup>
import FilterButton from './FilterButton.vue'
import {usePreferencesStore} from '../stores/preferences'
import {gtagTrackEvent} from '../utils/gtagHelper'

const preferencesStore = usePreferencesStore()

const assetsUrl = import.meta.env.VITE_ASSETS_URL

defineProps({
	searchQuery: String,
	activeRace: String,
	activeElement: String,
	activeSize: String,
})

const emit = defineEmits([
	'update:searchQuery',
	'update:activeRace',
	'update:activeElement',
	'update:activeSize',
])

const handleInput = event => {
	emit('update:searchQuery', event.target.value)
	gtagTrackEvent('filter_search_input', {
		search_keyword: event.target.value,
	})
}

const RACES = {
	ALL: 'ALL',
	ANGEL: 'ANGEL',
	AQUATIC: 'AQUATIC',
	BEAST: 'BEAST',
	DEMON: 'DEMON',
	DRAGON: 'DRAGON',
	FORMLESS: 'FORMLESS',
	HUMANOID: 'HUMANOID',
	INSECT: 'INSECT',
	PLANT: 'PLANT',
	UNDEAD: 'UNDEAD',
}
const raceOptions = [
	{label: RACES.ALL, tooltipText: '全部'},
	{
		label: RACES.FORMLESS,
		imgPath: '/images/ui/race-formless.png',
		imgAlt: 'RO 無形種族怪物的圖片與掉落物資訊',
		tooltipText: '無形',
	},
	{
		label: RACES.AQUATIC,
		imgPath: '/images/ui/race-aquatic.png',
		imgAlt: 'RO 魚貝種族怪物的圖片與掉落物資訊',
		tooltipText: '魚貝',
	},
	{
		label: RACES.DRAGON,
		imgPath: '/images/ui/race-dragon.png',
		imgAlt: 'RO 龍種族怪物的圖片與掉落物資訊',
		tooltipText: '龍',
	},
	{
		label: RACES.BEAST,
		imgPath: '/images/ui/race-beast.png',
		imgAlt: 'RO 動物種族怪物的圖片與掉落物資訊',
		tooltipText: '動物',
	},
	{
		label: RACES.ANGEL,
		imgPath: '/images/ui/race-angel.png',
		imgAlt: 'RO 天使種族怪物的圖片與掉落物資訊',
		tooltipText: '天使',
	},
	{
		label: RACES.DEMON,
		imgPath: '/images/ui/race-demon.png',
		imgAlt: 'RO 惡魔種族怪物的圖片與掉落物資訊',
		tooltipText: '惡魔',
	},
	{
		label: RACES.INSECT,
		imgPath: '/images/ui/race-insect.png',
		imgAlt: 'RO 昆蟲種族怪物的圖片與掉落物資訊',
		tooltipText: '昆蟲',
	},
	{
		label: RACES.PLANT,
		imgPath: '/images/ui/race-plant.png',
		imgAlt: 'RO 植物種族怪物的圖片與掉落物資訊',
		tooltipText: '植物',
	},
	{
		label: RACES.UNDEAD,
		imgPath: '/images/ui/race-undead.png',
		imgAlt: 'RO 不死種族怪物的圖片與掉落物資訊',
		tooltipText: '不死',
	},
	{
		label: RACES.HUMANOID,
		imgPath: '/images/ui/race-humanoid.png',
		imgAlt: 'RO 人形種族怪物的圖片與掉落物資訊',
		tooltipText: '人形',
	},
]

const ELEMENTS = {
	ALL: 'ALL',
	NONE: 'NONE',
	DARK: 'DARK',
	EARTH: 'EARTH',
	FIRE: 'FIRE',
	GHOST: 'GHOST',
	HOLY: 'HOLY',
	POISON: 'POISON',
	UNDEAD: 'UNDEAD',
	WATER: 'WATER',
	WIND: 'WIND',
}
const elementOptions = [
	{label: ELEMENTS.ALL, tooltipText: '全部'},
	{
		label: ELEMENTS.NONE,
		imgPath: '/images/ui/element-none.png',
		imgAlt: 'RO 無屬性怪物的圖片與掉落物資訊',
		tooltipText: '無',
	},
	{
		label: ELEMENTS.WATER,
		imgPath: '/images/ui/element-water.png',
		imgAlt: 'RO 水屬性怪物的圖片與掉落物資訊',
		tooltipText: '水',
	},
	{
		label: ELEMENTS.EARTH,
		imgPath: '/images/ui/element-earth.png',
		imgAlt: 'RO 地屬性怪物的圖片與掉落物資訊',
		tooltipText: '地',
	},
	{
		label: ELEMENTS.FIRE,
		imgPath: '/images/ui/element-fire.png',
		imgAlt: 'RO 火屬性怪物的圖片與掉落物資訊',
		tooltipText: '火',
	},
	{
		label: ELEMENTS.WIND,
		imgPath: '/images/ui/element-wind.png',
		imgAlt: 'RO 風屬性怪物的圖片與掉落物資訊',
		tooltipText: '風',
	},
	{
		label: ELEMENTS.POISON,
		imgPath: '/images/ui/element-poison.png',
		imgAlt: 'RO 毒屬性怪物的圖片與掉落物資訊',
		tooltipText: '毒',
	},
	{
		label: ELEMENTS.HOLY,
		imgPath: '/images/ui/element-holy.png',
		imgAlt: 'RO 聖屬性怪物的圖片與掉落物資訊',
		tooltipText: '聖',
	},
	{
		label: ELEMENTS.DARK,
		imgPath: '/images/ui/element-dark.png',
		imgAlt: 'RO 暗屬性怪物的圖片與掉落物資訊',
		tooltipText: '暗',
	},
	{
		label: ELEMENTS.GHOST,
		imgPath: '/images/ui/element-ghost.png',
		imgAlt: 'RO 念屬性怪物的圖片與掉落物資訊',
		tooltipText: '念',
	},
	{
		label: ELEMENTS.UNDEAD,
		imgPath: '/images/ui/element-undead.png',
		imgAlt: 'RO 不死屬性怪物的圖片與掉落物資訊',
		tooltipText: '不死',
	},
]

const SIZES = {ALL: 'ALL', SMALL: 'SMALL', MEDIUM: 'MEDIUM', LARGE: 'LARGE'}
const sizeOptions = [
	{label: SIZES.ALL, tooltipText: '全部'},
	{label: SIZES.SMALL, tooltipText: '小型'},
	{label: SIZES.MEDIUM, tooltipText: '中型'},
	{label: SIZES.LARGE, tooltipText: '大型'},
]

function onFilterButtonClick({emitEvent, label}) {
	emit(emitEvent, label)

	gtagTrackEvent('filter_button_click', {
		filter_type: label,
	})
}
</script>

<template>
	<div class="filter">
		<div>
			<div class="title">搜尋</div>
			<input
				type="text"
				class="search-input"
				placeholder="請輸入怪物、地圖或掉落物名稱"
				:value="searchQuery"
				@input="handleInput"
				@keyup.enter="trackSearch" />
		</div>
		<div>
			<div class="title">
				<span>種族</span>
			</div>
			<div class="btn-options">
				<FilterButton
					v-for="race in raceOptions"
					:key="race.label"
					:is-text-Shown="!preferencesStore.isIconButton"
					:text="
						race.label === RACES.ALL ? race.label.toUpperCase() : undefined
					"
					:img-path="
						race.label !== RACES.ALL ? assetsUrl + race.imgPath : undefined
					"
					:img-alt="race.label !== RACES.ALL ? race.imgAlt : undefined"
					:tooltip-text="
						race.label !== RACES.ALL ? race.tooltipText : undefined
					"
					:is-active="activeRace === race.label"
					@click="
						onFilterButtonClick({
							emitEvent: 'update:activeRace',
							label: race.label,
						})
					" />
			</div>
		</div>
		<div>
			<div class="title">
				<span>屬性</span>
			</div>
			<div class="btn-options">
				<FilterButton
					v-for="el in elementOptions"
					:key="el.label"
					:is-text-Shown="!preferencesStore.isIconButton"
					:text="el.label === ELEMENTS.ALL ? el.label.toUpperCase() : undefined"
					:img-path="
						el.label !== ELEMENTS.ALL ? assetsUrl + el.imgPath : undefined
					"
					:img-alt="el.label !== ELEMENTS.ALL ? el.imgAlt : undefined"
					:tooltip-text="el.label !== ELEMENTS.ALL ? el.tooltipText : undefined"
					:is-active="activeElement === el.label"
					@click="
						onFilterButtonClick({
							emitEvent: 'update:activeElement',
							label: el.label,
						})
					" />
			</div>
		</div>
		<div>
			<div class="title">體型</div>
			<div class="btn-options">
				<FilterButton
					v-for="size in sizeOptions"
					:key="size.label"
					:text="size.label.toUpperCase()"
					:tooltip-text="
						size.label !== SIZES.ALL ? size.tooltipText : undefined
					"
					:is-active="activeSize === size.label"
					@click="
						onFilterButtonClick({
							emitEvent: 'update:activeSize',
							label: size.label,
						})
					" />
			</div>
		</div>
	</div>
</template>

<style scoped lang="scss">
.filter {
	width: 100%;
	display: flex;
	flex-direction: column;
	gap: 12px;

	.title {
		color: #b2a99f;
		font-size: 16px;
		font-weight: bold;
		margin-bottom: 4px;

		&:has(+ .btn-options) {
			margin-bottom: -8px;
		}
	}

	.search-input {
		width: calc(100% - 2px);
		max-width: 800px;
		margin-bottom: 4px;
		padding: 4px 8px;
		font-size: 16px;
		line-height: 24px;
		color: #fff;
		background-color: #5a4736;
		border: 1.5px solid #b2a99f;
		border-radius: 4px;
		outline: none;
		box-sizing: border-box;
		filter: drop-shadow(2px 2px 0px black);

		&::placeholder {
			color: #c3b9aa;
		}
	}

	.btn-options {
		display: flex;
		padding-top: 12px;
		padding-bottom: 4px;
		gap: 12px;
		overflow: auto hidden;

		&::-webkit-scrollbar {
			width: 4px;
			height: 4px;
			padding-top: 12px;
			background: transparent;
			visibility: hidden;
		}

		&::-webkit-scrollbar-thumb {
			border-radius: 4px;
			visibility: hidden;
		}

		&:hover::-webkit-scrollbar-thumb,
		&:active::-webkit-scrollbar-thumb {
			background: #98ae2a;
			visibility: visible;
		}
	}
}
</style>
