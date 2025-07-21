<script setup lang="ts">
import {ref} from 'vue'
import {ELEMENTS} from '../constants/monster'
import FilterButton from '../components/FilterButton.vue'
import {gtagTrackEvent} from '../utils/gtagHelper'

const selectedLevel = ref(1)
const levels = [1, 2, 3, 4]

const baseUrl = import.meta.env.BASE_URL
const elementOptions = [
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
const activeTargetElement = ref(undefined)
const activeCastingElement = ref(undefined)
const elementColumns = {
	1: [
		['100%','100%','100%','100%','100%','100%','100%','100%','90%','100%',],
		['100%','25%','100%','150%','90%','150%','100%','100%','100%','100%',],
		['100%','100%','25%','90%','150%','150%','100%','100%','100%','100%',],
		['100%','90%','150%','25%','100%','150%','100%','100%','100%','125%',],
		['100%','150%','90%','100%','25%','150%','100%','100%','100%','100%',],
		['100%', '150%', '150%', '150%', '150%', '0%', '75%', '75%', '75%', '75%'],
		['100%','100%','100%','100%','100%','75%','0%','125%','100%','125%',],
		['100%', '100%', '100%', '100%', '100%', '75%', '125%', '0%', '100%', '0%'],
		['90%','100%','100%','100%','100%','75%','90%','90%','125%','100%',],
		['100%', '100%', '100%', '90%', '100%', '75%', '125%', '0%', '100%', '0%'],
	],
	2: [
		['100%','100%','100%','100%','100%','100%','100%','100%','70%','100%',],
		['100%','0%','100%','175%','80%','150%','100%','100%','100%','100%',],
		['100%','100%','0%','80%','175%','150%','100%','100%','100%','100%',],
		['100%','80%','175%','0%','100%','150%','100%','100%','100%','150%',],
		['100%','175%','80%','100%','0%','150%','100%','100%','100%','100%',],
		['100%', '150%', '150%', '150%', '150%', '0%', '75%', '75%', '75%', '50%'],
		['100%','100%','100%','100%','100%','75%','0%','150%','100%','150%',],
		['100%', '100%', '100%', '100%', '100%', '75%', '150%', '0%', '100%', '0%'],
		['70%','100%','100%','100%','100%','75%','80%','80%','150%','125%',],
		['100%', '100%', '100%', '80%', '100%', '50%', '150%', '0%', '125%', '0%'],
	],
	3: [
		['100%','100%','100%','100%','100%','100%','100%','100%','50%','100%',],
		['100%','0%','100%','200%','70%','125%','100%','100%','100%','100%',],
		['100%','100%','0%','70%','200%','125%','100%','100%','100%','100%',],
		['100%','70%','200%','0%','100%','125%','100%','100%','100%','175%',],
		['100%','200%','70%','100%','0%','125%','100%','100%','100%','100%',],
		['100%', '125%', '125%', '125%', '125%', '0%', '50%', '50%', '50%', '25%'],
		['100%','100%','100%','100%','100%','50%','0%','175%','100%','175%',],
		['100%', '100%', '100%', '100%', '100%', '50%', '175%', '0%', '100%', '0%'],
		['50%','100%','100%','100%','100%','50%','70%','70%','175%','150%',],
		['100%', '100%', '100%', '70%', '100%', '25%', '175%', '0%', '150%', '0%'],
	],
	4: [
		['100%','100%','100%','100%','100%','100%','100%','100%','0%','100%',],
		['100%','0%','100%','200%','60%','125%','100%','100%','100%','100%',],
		['100%','100%','0%','60%','200%','125%','100%','100%','100%','100%',],
		['100%','60%','200%','0%','100%','125%','100%','100%','100%','200%',],
		['100%','200%','60%','100%','0%','125%','100%','100%','100%','100%',],
		['100%', '125%', '125%', '125%', '125%', '0%', '50%', '50%', '50%', '0%'],
		['100%','100%','100%','100%','100%','50%','0%','200%','100%','200%',],
		['100%', '100%', '100%', '100%', '100%', '50%', '200%', '0%', '100%', '0%'],
		['0%', '100%', '100%', '100%', '100%', '50%', '60%', '60%', '200%', '175%'],
		['100%', '100%', '100%', '60%', '100%', '0%', '200%', '0%', '175%', '0%'],
	],
}

function getCellClass(value) {
	const num = Number(value.replace('%', ''))

	if (isNaN(num)) return 'brown'

	if (num === 100) {
		return 'brown'
	} else if (num > 100) {
		return 'green'
	} else {
		return 'red'
	}
}

function onFilterButtonClick(label) {
	activeTargetElement.value = label

	gtagTrackEvent('element_button_click', {
		filter_type: label,
	})
}
</script>

<template>
	<div class="element-resistance-table">
		<div class="element-level">
			<div class="title">屬性等級</div>
			<div class="levels">
				<label
					v-for="level in levels"
					:key="level"
					class="level-box"
					:class="{selected: selectedLevel === level}">
					<input
						type="radio"
						name="element-level"
						:value="level"
						v-model="selectedLevel" />
					<span class="outer-border">
						<span class="inner-box"></span>
					</span>
					{{ level }}
				</label>
			</div>
		</div>
		<div class="element-table">
			<div class="title target-element-title">目標屬性</div>
			<div class="content">
				<div class="title casting-element-title">施放屬性</div>
				<div class="column-table">
					<div class="column">
						<div class="cell label">
							<img
								:src="`${baseUrl}images/ui/bow.png`"
								class="label-img casting" />
							<img
								:src="`${baseUrl}images/ui/target.png`"
								class="label-img target" />
						</div>
						<div
							v-for="{label, imgPath, imgAlt, tooltipText} in elementOptions"
							:key="'header-' + label"
							class="cell header">
							<FilterButton
								:is-text-Shown="true"
								:img-path="baseUrl + imgPath"
								:img-alt="imgAlt"
								:tooltip-text="tooltipText"
								:is-active="activeCastingElement === label" />
						</div>
					</div>

					<div
						v-for="(
							{label, imgPath, imgAlt, tooltipText}, rowIndex
						) in elementOptions"
						:key="'row-' + label"
						class="column">
						<div class="cell label">
							<FilterButton
								:is-text-Shown="true"
								:img-path="baseUrl + imgPath"
								:img-alt="imgAlt"
								:tooltip-text="tooltipText"
								:is-active="activeTargetElement === label"
								@click="onFilterButtonClick(label)" />
						</div>
						<div
							class="column-block"
							:class="{active: activeTargetElement === label}">
							<div
								v-for="(targetColumn, colIndex) in elementColumns[
									selectedLevel
								]"
								:key="'cell-' + rowIndex + '-' + colIndex"
								class="cell"
								:class="getCellClass(targetColumn[rowIndex])"
								@mouseenter="(e)=> {
									if(e.fromElement?.className.includes('active')) {
										activeCastingElement = elementOptions[colIndex].label
									}
								}"
								@mouseleave="activeCastingElement = undefined"
								@click="()=> {
									activeCastingElement = elementOptions[colIndex].label
									onFilterButtonClick(elementOptions[rowIndex].label)
								}">
								{{ targetColumn[rowIndex] }}
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
		<div class="statement">
			<span>
				本頁面引用之資料來源為:
				<a
					href="https://ro.gnjoy.com.tw/notice/notice_view.aspx?id=165351"
					target="_blank"
					rel="noopener noreferrer">
					RO 仙境傳說 Online 官方網站
				</a>
			</span>
			<span>實際設定請以遊戲內最新公告數值為準</span>
		</div>
	</div>
</template>

<style lang="scss">
.element-resistance-table {
	.element-level {
		width: 100%;
		display: flex;
		flex-direction: column;
		gap: 4px;

		.levels {
			display: flex;
			gap: 12px;
		}

		.level-box {
			display: flex;
			align-items: center;
			font-size: 16px;
			user-select: none;

			&.selected {
				.inner-box {
					box-shadow: inset -2px -2px 0 #484d3f;
				}
			}
		}

		.level-box input {
			display: none;
		}

		.outer-border {
			width: 24px;
			height: 24px;
			margin-right: 8px;
			cursor: pointer;
			border: 1px solid #000;
			background-color: #fff;
			box-shadow: inset -2px -2px 0 rgba(0, 0, 0, 0.25);
			border-radius: 6px;
			transition: background-color 0.3s;
			display: flex;
			align-items: center;
			justify-content: center;
		}

		.inner-box {
			width: 18px;
			height: 18px;
			border-radius: 4px;
			background-color: transparent;
			transition: background-color 0.3s;
		}

		.level-box.selected .inner-box {
			background-color: #606753;
		}
	}

	.element-table {
		width: 100%;
		margin-top: 24px;

		.target-element-title {
			margin-left: calc(24px + 12px + 20px);
			margin-bottom: 4px;

			@media (min-width: 576px) {
				margin-bottom: 12px;
			}
		}

		.casting-element-title {
			writing-mode: vertical-rl;
			text-orientation: upright;
			margin-top: 20px;
			margin-right: 4px;

			@media (min-width: 576px) {
				margin-right: 12px;
			}
		}

		.content {
			display: flex;
			flex-direction: row;
		}

		.column-table {
			display: flex;
			flex-direction: row;
			padding-bottom: 4px;
			overflow: auto hidden;
			position: relative;

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

			.column {
				display: flex;
				flex-direction: column;
				background: #e6e6e6;
				padding: 8px;
				gap: 8px;

				&:first-child {
					border-radius: 4px 0 0 4px;
					position: sticky;
					top: 0;
					left: 0;
					z-index: 2;

					.cell.label {
						cursor: pointer;
					}

					.cell:first-child.label {
						position: relative;
						background: #6c5543;
						margin-bottom: 2px;
						cursor: auto;

						&::before {
							content: '';
							position: absolute;
							top: 0;
							left: 0;
							width: 96px;
							height: 4px;
							background-color: #e6e6e6;
							transform: rotate(29deg);
							transform-origin: top left;
							pointer-events: none;
						}

						.label-img {
							position: absolute;
							width: 32px;
							height: 32px;
							filter: drop-shadow(2px 2px 0px black)
								drop-shadow(-1px -1px 0px black);
							&.casting {
								bottom: -4px;
								left: 6px;
							}
							&.target {
								top: -4px;
								right: 6px;
							}
						}
					}

					.cell.header {
						.filter-button:hover {
							color: #b2a99f;
							cursor: default;
						}
					}
				}

				&:last-child {
					border-radius: 0 4px 4px 0;
				}

				&-block {
					display: flex;
					flex-direction: column;
					padding: 2px;
					gap: 8px;

					&.active {
						background: #fff;
						box-shadow: 2px 2px 0 #000, -2px -2px 0 #000;

						.cell {
							border: 2px solid #fff;
							position: relative;

							&::before {
								content: '';
								opacity: 0;
								position: absolute;
								width: 100vw;
								height: 100%;
								background: #fecd2850;
								right: calc(0px - 4px);
								pointer-events: none;
							}

							&.red {
								background-color: #d63e25;
							}
							&.green {
								background-color: #4c5933;
							}
							&.brown {
								background-color: #aa6b1e;
							}
							&:hover {
								color: #000;
								background-color: #fbe12b;

								&::before {
									opacity: 1;
								}
							}
						}
					}
				}
				.cell {
					width: 80px;
					height: 48px;
					display: flex;
					align-items: center;
					justify-content: center;
					background: #9c794e;
					border-radius: 6px;
					border: 2px solid #e6e6e6;
					font-family: 'Slackey';
					color: #e6e6e6;
					cursor: pointer;

					&.red {
						background-color: #c65543;
					}
					&.green {
						background-color: #606753;
					}
					&.yellow {
						background-color: #fef200;
						color: black;
					}
				}
			}
		}
	}

	.statement {
		color: #b2a99f;
		margin-top: 12px;
		font-size: 13px;
		text-align: center;

		a {
			filter: contrast(0.5);
		}
	}

	.title {
		color: #b2a99f;
		font-size: 16px;
		font-weight: bold;
		margin-bottom: 4px;
	}
}
</style>
