<template>
	<view class="main">
		<view class="header"><SearchInput></SearchInput></view>
		<view class="nav">
			<Tabs :tabs="tabs">
				<block v-if="tabs[0].isActive"><RecommendMusic></RecommendMusic></block>
				<block v-else-if="tabs[1].isActive"><HotSongList></HotSongList></block>
				<block v-else-if="tabs[2].isActive"><RecommendMv></RecommendMv></block>
			</Tabs>
		</view>
	</view>
</template>

<script>
import SearchInput from '@/components/SearchInput';
import Tabs from '@/components/Tabs';
import RecommendMusic from '@/components/RecommendMusic';
import HotSongList from '@/components/HotSongList';
import RecommendMv from '@/components/RecommendMv';

export default {
	data() {
		return {
			tabs: [
				{
					id: 0,
					name: '推荐音乐',
					isActive: true
				},
				{
					id: 0,
					name: '热歌榜',
					isActive: false
				},
				{
					id: 0,
					name: '推荐MV',
					isActive: false
				}
			],
			HotSongResult: []
		};
	},
	components: {
		SearchInput,
		Tabs,
		RecommendMusic,
		HotSongList,
		RecommendMv
	},
	onLoad() {},
	methods: {}
};
</script>

<style>
.header {
	position: fixed;
	width: 100%;
	z-index: 2;
}

.nav {
	padding-top: 80rpx;
}

</style>
