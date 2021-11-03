<template>
	<view class="tabs">
		<view class="tabs_title">
			<view class="title_item " v-for="(item, index) in tabs" :key="index" @click="handleItemTap" :data-index="index">
				<text :class="item.isActive ? 'active' : ''">{{ item.name }}</text>
			</view>
		</view>
		<view class="tabs_content"><slot></slot></view>
	</view>
</template>

<script>
export default {
	name: 'Tabs',
	data() {
		return {};
	},
	props: {
		tabs: Array
	},
	methods: {
		handleItemTap(e) {
			const index = e.currentTarget.dataset.index;
			let tabs=this.tabs
			tabs.forEach((v,i)=>i===index?v.isActive=true:v.isActive=false)
			this.tabs=tabs
		}
	}
};
</script>

<style>
view,
text {
	box-sizing: border-box;
}

.tabs_title {
	position: fixed;
	display: flex;
	padding: 10rpx 0;
	height: 80rpx;
	width: 100%;
	z-index: 7;
background-color: #fff;
margin-top: 20rpx;
}

.title_item {
	flex: 1;
	display: flex;
	justify-content: center;
	align-items: center;
	text-align: center;
	font-size: 30rpx;
	height: 80rpx;
	line-height: 80rpx;
	background-color: #ffffff;
	border-bottom: 4rpx solid rgba(243, 243, 243, 0.8);
}

.active {
	font-weight: 600;
	color: #d43c33;
	border-bottom: 4rpx solid #d43c33;
}

.tabs_content {
	padding-top: 110rpx;
	/* padding-left: 20rpx;
  padding-right: 20rpx; */
}
</style>
