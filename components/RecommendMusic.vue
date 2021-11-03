<template>
	<view class="main">
		<view class="swiperCont">
			<swiper
				class="swiper"
				indicator-dots="true"
				autoplay="true"
				interval="3000"
				duration="500"
				circular="true"
				indicator-active-color="#ffffff"
				indicator-color="rgba(255, 255, 255, .6)"
			>
				<swiper-item v-for="(item, index) in banners" v-if="item.typeTitle == '新歌首发'">
					<navigator :url="'/pages/musicDetail/musicDetail?id='+item.targetId" class="swiper-item"><image :src="item.pic"></image></navigator>
				</swiper-item>
			</swiper>
		</view>
		<view class="editorRecommend">
			<view class="title">编辑推荐</view>
			<view class="songList_wrap">
				<navigator :url="'/pages/playList/playList?playListId='+item.id" open-type="navigate" class="songList_item" v-for="(item, index) in songList" :key="index">
					<view class="songList_img">
						<image :src="item.picUrl" mode="widthFix"></image>
						<view class="play_count_wrap">
							<view class="play_count_img"><image src="https://i.niupic.com/images/2021/09/09/9uS3.png" mode="widthFix"></image></view>
							<view class="play_count">{{ item.playCount | playCounFormat }}</view>
						</view>
					</view>
					<view class="songList_title">{{ item.name }}</view>
				</navigator>
			</view>
		</view>

		<view class="newSongs">
			<view class="newSongs_title">最新音乐</view>
			<view class="newSongs_wrap">
				<navigator :url="'/pages/musicDetail/musicDetail?id='+item.id" class="newSongs_item" v-for="(item, index) in newSongList" :key="index">
					<view class="newSongs_item_title">
						<view class="newSongs_name">{{ item.name }}</view>
						<view class="artist">
							<view class="artist_img_item"><view class="artist_img"></view></view>
							<view class="artist_name">{{ item.song.artists[0].name + '-' + item.song.album.name }}</view>
						</view>
					</view>
					<view class="newSongs_img"></view>
				</navigator>
			</view>
		</view>
		<navigator class="footer">
		  <view class="footer_img">
		    <image src="https://i.niupic.com/images/2021/09/09/9uRG.png" mode="widthFix"></image>
		  </view>
		  <view class="openapp">
		    打开APP，发现更多好音乐
		  </view>
		  <view class="copyright">
		    <text>网易公司版权所有©1997-2021杭州乐读科技有限公司运营</text>
		  </view>
		</navigator>
	</view>
</template>

<script>
export default {
	name: 'RecommendMusic',
	data() {
		return {
			banners: [],
			songList: [],
			newSongList:[]
		};
	},
	mounted() {
		// 获取轮播图
		this.request({
			url: '/banner?type=1'
		}).then(res => {
			this.banners = res.banners;
		});
		// 获取推荐歌单
		this.request({
			url: '/personalized?limit=6'
		}).then(res => {
			this.songList = res.result;
		});
		//最新音乐
		this.request({
			url: '/personalized/newsong'
		}).then(res => {
			this.newSongList= res.result
		});
	}
};
</script>

<style>
.swiperCont {
	width: 100%;
	box-sizing: border-box;
}

.swiper {
	width: 98%;
	height: calc(100vw * 420 / 1080);
	text-align: center;
	overflow: hidden;
	border-radius: 15rpx;
	border: 2rpx solid rgba(0, 0, 0, 0.1);
	margin: 15rpx auto 30rpx;
}

.swiper-item image {
	width: 100%;
	height: calc(100vw * 420 / 1080);
}

/deep/ .uni-swiper-dot {
	width: 18rpx;
	height: 6rpx;
	border-radius: 5rpx;
}

.title {
	font-size: 34rpx;
	margin-top: 20rpx;
	padding-left: 20rpx;
	border-left: 6rpx solid #d43c33;
}

.songList_wrap {
	display: flex;
	flex-wrap: wrap;
	justify-content: space-between;
	padding: 0 10rpx;
	padding-top: 30rpx;
}

.songList_item {
	width: 33%;
	margin-bottom: 20rpx;
	border-radius: 15rpx;
}

.songList_img {
	position: relative;
}

.songList_img image {
	width: 100%;
	border-radius: 15rpx;
}

.play_count_wrap {
	position: relative;
	top: -245rpx;
	left: 105rpx;
	display: flex;
	width: 180rpx;
	color: #ffffff;
	height: 0px;
}

.play_count_img image {
	width: 36rpx;
}

.play_count {
	font-size: 24rpx;
}

.songList_title {
	padding: 0 5rpx;
	font-size: 26rpx;
	display: -webkit-box;
	overflow: hidden;
	white-space: normal;
	text-overflow: ellipsis;
	word-wrap: break-word;
	-webkit-line-clamp: 2;
	-webkit-box-orient: vertical;
}

.newSongs_title {
	font-size: 34rpx;
	margin-top: 20rpx;
	padding-left: 20rpx;
	border-left: 6rpx solid #d43c33;
}

.newSongs_wrap {
	padding: 0 20rpx;
	margin-top: 30rpx;
}

.newSongs_item {
	display: flex;
	justify-content: space-between;
	align-items: center;
	border-bottom: 2rpx solid #f0f0f1;
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
	display: -webkit-box;
	overflow: hidden;
	white-space: normal;
	text-overflow: ellipsis;
	word-wrap: break-word;
	-webkit-line-clamp: 1;
	-webkit-box-orient: vertical;
}

.newSongs_img {
	flex: 1;
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
	flex-direction: column;
	justify-content: flex-start;
	align-items: center;
	width: 100%;
	height: 400rpx;
	background: url(https://i.niupic.com/images/2021/09/09/9uRu.png) no-repeat 0 0;
	background-size: contain;
}

.footer_img {
	/* margin-top: 38%; */
	display: flex;
	flex-direction: column;
	justify-content: flex-end;
	align-items: center;
	width: 100%;
	height: 214rpx;
	text-align: center;
}

.footer_img image {
	width: 460rpx;
}

.openapp {
	width: 602rpx;
	height: 80rpx;
	margin-top: 15rpx;
	line-height: 80rpx;
	text-align: center;
	border-radius: 76rpx;
	border: 2rpx solid #d33a31;
	color: #d33a31;
}

.copyright {
	margin-top: 6rpx;
	font-size: 24rpx;
	color: #888888;
	transform: scale(0.75);
}
</style>
