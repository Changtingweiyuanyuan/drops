<script setup>
import {ref, onMounted, onUnmounted} from 'vue'
const baseUrl = import.meta.env.BASE_URL

const showFooter = ref(true)

const handleScroll = () => {
	showFooter.value = window.scrollY <= 10
}

onMounted(() => {
	handleScroll()
	window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
	window.removeEventListener('scroll', handleScroll)
})
</script>

<template>
	<transition name="footer-slide">
		<div
			class="footer"
			v-show="showFooter">
			<div class="content">
				<div>網站為《RO仙境傳說: 樂園》非官方掉落查詢工具，</div>
				<div>
					資料以台版正服為基準，怪物資訊已盡力核實，掉落率等未公開數值僅供參考。
				</div>
				<div>
					若有錯誤或遺漏 歡迎至
					<a
						href="https://docs.google.com/spreadsheets/d/1qECMl1dgV0_NnNvcfKj3VmOdgtsV9guMRZFUJzC9TWA/edit?hl=zh-tw&gid=538271007#gid=538271007"
						target="_blank"
						rel="noopener noreferrer">
						表單
					</a>
					內留言一起完善資料唷！
					<img
						:src="`${baseUrl}images/ui/heart.png`"
						class="heart" />
				</div>
			</div>
		</div>
	</transition>
</template>

<style scoped lang="scss">
.footer {
	min-height: 36px;
	width: -webkit-fill-available;
	position: fixed;
	bottom: 0;
	left: 0;
	background: #606753;
	color: #e6e6e6;
	border-bottom: 1.5px solid #b2a99f;
	z-index: 2;

	.content {
		min-height: 36px;
		display: flex;
		justify-content: flex-start;
		align-items: center;
		flex-wrap: wrap;
		margin: auto;
		padding: 2px 40px;
		font-size: 14px;

		@media (min-width: 576px) {
			max-width: 540px;
			justify-content: center;
		}
		@media (min-width: 768px) {
			max-width: 720px;
		}
		@media (min-width: 992px) {
			max-width: 960px;
		}
		@media (min-width: 1200px) {
			max-width: 1140px;
		}
		@media (min-width: 1400px) {
			max-width: 1320px;
		}

		.name {
			display: flex;
			justify-content: center;
			align-items: center;
			margin-right: 24px;

			img {
				width: 24px;
				height: 24px;
			}

			.text {
				background: #0f0f0f;
				border-radius: 4px;
				font-size: 12px;
				margin-left: 4px;
				padding: 2px 8px;
			}
		}

		.link {
			line-height: 36px;
			font-weight: bold;
			cursor: pointer;
		}

		.heart {
			width: 12px;
			height: 12px;
		}
	}
}
</style>

<style>
.footer-slide-enter-active,
.footer-slide-leave-active {
	transition: all 0.2s ease;
}
.footer-slide-enter-from,
.footer-slide-leave-to {
	transform: translateY(100%);
	opacity: 0;
}
.footer-slide-enter-to,
.footer-slide-leave-from {
	transform: translateY(0%);
	opacity: 1;
}
</style>
