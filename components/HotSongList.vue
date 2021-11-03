<template>
	<view>
		<scroll-view scroll-y class="main" @scrolltolower="handleTolower">
			<view>
				<view class="top">
					<view class="top_icon"></view>
					<view class="top_time">更新日期：{{ currentMonth }}月{{ currentDay }}日</view>
				</view>
			</view>
			<view class="hotSongList">
				<view class="hotSong_item" v-for="(item, index) in HotSongList" :key="index">
					<view class="num">
						<text>{{ index + 1 }}</text>
					</view>
					<navigator :url="'/pages/musicDetail/musicDetail?id=' + item.id" class="song">
						<view class="newSongs_wrap">
							<view class="newSongs_item">
								<view class="newSongs_item_title">
									<view class="newSongs_name">{{ item.name }}</view>
									<view class="artist">
										<view class="artist_img_item"><view class="artist_img"></view></view>
										<view class="artist_name">
											{{ item.ar[0].name }}
											<block v-if="item.ar[1]">{{ '/' + item.ar[1].name }}</block>
											{{ '-' + item.al.name }}
										</view>
									</view>
								</view>
								<view class="newSongs_img"></view>
							</view>
						</view>
					</navigator>
				</view>

				<navigator url="#" class="footer" @click="handleTolower">
					<view class="footer_title">
						<view>上拉查看更多</view>
						<view class="more"></view>
					</view>
				</navigator>
			</view>
		</scroll-view>
	</view>
</template>

<script>
export default {
	name: 'HotSongList',
	data() {
		return {
			currentMonth: '',
			currentDay: '',
			HotSongList: [],
			limit: 0,
			skip: 0,
			hasMore: true,
			timer: null,
			result: []
		};
	},
	methods: {
		getList: function(firstLoading) {
			this.limit += 20;
			if (firstLoading) {
				this.HotSongList = [...this.HotSongList, ...this.result.slice(this.skip, this.limit)];
			} else {
				uni.showLoading({
					title: '加载中'
				});
				clearTimeout(this.timer); //清除延迟执行
				this.timer = setTimeout(() => {
					//设置延迟执行
					this.HotSongList = [...this.HotSongList, ...this.result.slice(this.skip, this.limit)];
					uni.hideLoading();
				}, 500);
			}

			if (this.result.slice(this.skip, this.limit).length === 0) {
				this.hasMore = false;
			}
		},
		handleTolower: function() {
			if (this.hasMore) {
				this.skip = this.limit;
				this.getList(false);
			} else {
				uni.showToast({
					icon: 'none',
					title: '没有数据了'
				});
			}
		}
	},
	created() {
		// 热歌榜更新日期
		const date = new Date();
		this.currentMonth = date.getMonth() + 1;
		this.currentDay = date.getDate();
		this.request({
			url: '/playlist/detail?id=3778678'
		}).then(res => {
			this.result = res.playlist.tracks;
			this.getList(true);
		});
	
	
	 }
};
</script>

<style>
.main {
	width: 100%;
	height: 100vh;
}

.top {
	position: relative;
	display: flex;
	flex-direction: column;
	justify-content: center;
	width: 100%;
	height: 292rpx;
	margin-top: 5rpx;
	background: url(https://i.niupic.com/images/2021/09/09/9uWZ.jpg) no-repeat;
	background-size: contain;
}

.top_icon {
	width: 284rpx;
	height: 134rpx;
	margin-left: 50rpx;
	background: url(https://i.niupic.com/images/2021/09/09/9uQ4.png) no-repeat;
	background-size: 332rpx 194rpx;
	background-position: -48rpx -60rpx;
}

.top_time {
	margin-top: 20rpx;
	margin-left: 50rpx;
	color: #ffffff;
	font-size: 24rpx;
}

.hotSong_item {
	display: flex;
	align-items: center;
}

.num {
	width: 80rpx;
	height: 110rpx;
	flex: 1;
	text-align: center;
	line-height: 110rpx;
	font-size: 34rpx;
	color: #999999;
}

.hotSong_item:nth-child(-n + 3) .num {
	color: #df3436;
}

.song {
	flex: 9;
	display: flex;
	justify-content: center;
	align-items: center;
	width: 670rpx;
	height: 110rpx;
	flex: 8;
	border-bottom: 2rpx solid #f0f0f1;
}

.newSongs_wrap {
	width: 100%;
	padding: 0 20rpx;
	margin-top: 20rpx;
}

.newSongs_item {
	display: flex;
	justify-content: space-between;
	align-items: center;
	margin-bottom: 10rpx;
	padding: 12rpx 0;
}

.newSongs_item_title {
	flex: 15;
	display: flex;
	justify-content: space-between;
	flex-direction: column;
	align-items: flex-start;
}

.newSongs_name {
	color: #333333;
	font-size: 34rpx;
	padding-left: 10rpx;
}

.newSongs_img {
	flex: 1.5;
	width: 44rpx;
	height: 44rpx;
	margin: 0 8rpx;
	background: url(https://i.niupic.com/images/2021/09/09/9uQ4.png) no-repeat -48rpx 0;
	background-size: 332rpx 194rpx;
}

.artist {
	display: flex;
	justify-content: flex-start;
	align-items: center;
}

.artist_img_item {
	padding-top: 7rpx;
}

.artist_img {
	margin-top: 10rpx;
	width: 28rpx;
	height: 20rpx;
	margin: 0 8rpx;
	background: url(https://i.niupic.com/images/2021/09/09/9uQ4.png) no-repeat 0 0;
	background-size: 332rpx 194rpx;
}

.artist_name {
	font-size: 24rpx;
	color: #888888;

	display: -webkit-box;
	overflow: hidden;
	white-space: normal;
	text-overflow: ellipsis;
	word-wrap: break-word;
	-webkit-line-clamp: 1;
	-webkit-box-orient: vertical;
}
.footer {
	display: flex;
	justify-content: center;
	align-items: center;
	width: 100%;
	height: 110rpx;
}
.footer_title {
	display: flex;
	justify-content: center;
	align-items: center;
	width: 196rpx;
	height: 110rpx;
	font-size: 28rpx;
	line-height: 110rpx;
	color: #999999;
}
.more {
	width: 16rpx;
	height: 16rpx;
	border-top: 3.5rpx solid #d2d2d2;
	border-right: 3.5rpx solid #d2d2d2;
	margin-left: 8rpx;
	transform: rotate(-45deg);
}
</style>
