<script setup>
import Filter from '../components/Filter.vue'

defineProps({
	text: {
		type: String,
		required: false,
	},
	imgPath: {
		type: String,
		required: false,
	},
	imgAlt: {
		type: String,
		required: false,
	},
	isActive: {
		type: Boolean,
		required: true,
	},
	isTextShown: {
		type: Boolean,
		required: false,
	},
	tooltipText: {
		type: String,
		required: false,
	},
})
</script>

<template>
	<div
		class="filter-button"
		:class="{active: isActive, 'is-text-shown': isTextShown}">
		<div class="content">
			<template v-if="text">
				<span class="text">{{ text }}</span>
			</template>
			<template v-else>
				<img
					:src="imgPath"
					:alt="imgAlt" />
				<div
					v-if="isTextShown"
					class="img-text">
					{{ tooltipText }}
				</div>
			</template>
		</div>

		<div
			v-if="tooltipText && !isTextShown"
			class="tooltip">
			{{ tooltipText }}
		</div>
	</div>
</template>

<style scoped lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Slackey&display=swap');

.filter-button {
	min-width: 80px;
	height: 48px;
	max-height: 48px;
	position: relative;
	display: flex;
	align-items: center;
	justify-content: center;
	color: #b2a99f;
	background: #6c5543;
	font-size: 16px;
	font-weight: bold;
	border-radius: 4px;
	z-index: 0;
	cursor: pointer;
	user-select: none;

	&:hover {
		color: #fff;
		z-index: 1;

		& .tooltip {
			opacity: 1;
		}
	}

	&.active {
		color: #fbe12b;
		background: #fad2a8;
	}

	&.is-text-shown {
		.content {
			height: 24px;
			line-height: 24px;
			display: flex;
			gap: 4px;
			filter: unset;

			& > img {
				height: 24px;
			}
			& > .img-text {
				font-size: 16px;
				margin-left: 2px;
			}
		}

		&.active {
			.content {
				& > .img-text {
					color: #473d43;
				}
			}
		}
	}

	.content {
		height: 36px;
		line-height: 36px;
		font-family: 'Slackey';
		outline: none;

		.text {
			filter: drop-shadow(2px 2px 0px black) drop-shadow(-1px -1px 0px black);
		}

		& > img {
			height: 36px;
			outline: none;
			filter: drop-shadow(2px 2px 0px black) drop-shadow(-1px -1px 0px black);
		}
	}

	.tooltip {
		position: absolute;
		top: -12px;
		left: calc(100% - 12px);
		background-color: #bfae9e;
		color: #000;
		font-size: 12px;
		font-weight: bold;
		padding: 4px 6px;
		border-radius: 4px;
		white-space: nowrap;
		opacity: 0;
		z-index: 1;
		pointer-events: none;

		&::after {
			content: '';
			position: absolute;
			top: calc(100% - 6px);
			left: 2px;
			width: 0;
			height: 0;
			border-left: 4px solid transparent;
			border-right: 4px solid transparent;
			border-top: 12px solid #bfae9e;
			transform: rotate(40deg);
		}
	}
}
</style>
