<script setup lang="ts">
import {ref, watch, computed} from 'vue'
import {ElNotification} from 'element-plus'

interface Props {
	isShown: boolean
	modalClass?: string
	title?: string
	message: string
	isCloseBtnShown?: boolean
}

const props = withDefaults(defineProps<Props>(), {
	modalClass: '',
	title: undefined,
	isCloseBtnShown: true,
})

const emit = defineEmits(['update:isShown'])

watch(
	() => props.isShown,
	val => {
		const app = document.getElementById('app')
		const appRightOffset = window.innerWidth / 2 - (app?.clientWidth || 0) / 2

		if (val) {
			ElNotification({
				title: props.title,
				message: props.message,
				showClose: props.isCloseBtnShown,
				customClass: 'ro-notification',
				offset: 40,
				duration: 0,
				dangerouslyUseHTMLString: true,
				zIndex: 3,
			})

			requestAnimationFrame(() => {
				const notifications = document.querySelectorAll(
					'.el-notification.ro-notification'
				) as NodeListOf<HTMLElement>

				if (notifications && appRightOffset) {
					notifications.forEach(notification => {
						notification.style.right = `${appRightOffset}px`
					})
				}
			})

			emit('update:isShown', false)
		}
	},
	{immediate: true}
)

defineOptions({
	name: 'Notification',
})
</script>

<template>
	<div class="ro-notification"></div>
	<slot name="button" />
</template>

<style lang="scss">
.ro-notification.el-notification {
	height: 200px;
	background-color: #606753;
	border-radius: 4px;
	padding: 12px 8px;
	border: 1px solid #b2a99f;

	.el-notification__group {
		display: flex;
		flex-direction: column;
	}

	.el-notification__title {
		margin-right: 20px;
		font-size: 14px;
		color: #e6e6e6;
	}

	.el-notification__content {
		height: 100%;
		background: #f9e7d0;
		color: #000;
		border-radius: 4px;
		padding: 4px;
		box-shadow: inset -2px -2px 0 rgba(0, 0, 0, 0.25);
		overflow: hidden;

		p {
			display: block;
			height: 100%;
			font-size: 13px;
			padding: 8px 4px;
			overflow: hidden auto;

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

	.el-notification__closeBtn {
		&:hover {
			color: #e6e6e6;
		}
	}
}
</style>
