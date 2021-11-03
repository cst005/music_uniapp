<template>
	<view class="main">
		<view class="header" v-if="artists.artist">
			<view class="bag" :style="'background-image: url(' + artists.artist.picUrl + ');'">
				<view class="artist_title">
					<view class="artistName">{{ artists.artist.name }}</view>
					<view class="artist_rank" v-for="(item, index) in artistList" v-if="item.name == artist">歌手榜华语地区No.{{ index + 1 }}</view>
					<view class="fans_count"></view>
				</view>
			</view>

			<view class="artistIntroduce">
				<view class="artistIntroduceTitle">歌手简介</view>
				<view class="artistIntroduceItem">{{ artists.artist.briefDesc }}</view>
			</view>
			<view class="hotSong">
				<view class="hotSong_title">热门单曲</view>
				<view class="hotSongList">
					<view class="hotSong_item" v-for="(item, index) in artists.hotSongs" :key="index" v-if="index < 5">
						<view class="num">
							<text>{{ index + 1 }}</text>
						</view>
						<navigator :url="'/pages/musicDetail/musicDetail?id=' + item.id" class="song">
							<view class="newSongs_wrap">
								<view class="newSongs_item">
									<view class="newSongs_item_title">
										<view class="newSongs_name">
											{{ item.name }}
											<text>{{ item.alia[0]}}</text>
										</view>
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

					<navigator class="footer">
						<view class="footer_title">
							<view>查看完整榜单</view>
							<view class="more"></view>
						</view>
					</navigator>
				</view>
			</view>
			<view class="influence">
				<view class="influenceTitle">
					<text>影响力</text>
					<icon type="warn" size="36rpx" color="#c9c9c9"></icon>
				</view>
				<view class="influenceList" v-for="(item, index) in artistList" v-if="item.name == artist" :key="index">
					<view class="hot">
						<image src="https://i.niupic.com/images/2021/09/15/9Bxa.png"></image>
						<text>歌手热度 {{ item.score }}</text>
					</view>
					<view class="ranking">
						<text>歌手榜华语地区 No.{{ index + 1 }}</text>
						<image src="https://i.niupic.com/images/2021/09/15/9Bn8.png"></image>
					</view>
				</view>
			</view>
			<navigator class="footer">
				<view class="footer_title">
					<view>到底了~</view>
					<view class="more"></view>
				</view>
			</navigator>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			artists: [],
			artist: '',
			artistList: []
		};
	},
	onLoad(options) {
		const id = options.id;
		this.request({
			url: '/artists',
			data: {
				id: id
			}
		}).then(res => {
			this.artists = res;
			this.artist = res.artist.name;
		});
		this.request({
			url: '/toplist/artist'
		}).then(res => {
			this.artistList = res.list.artists;
		});
	},
	methods: {}
};
</script>

<style>
page {
	background-color: #ffffff;
}

.bag {
	position: relative;
	top: 0;
	bottom: 0;
	left: 0;
	right: 0;
	width: 100%;
	height: 622rpx;
	background-repeat: no-repeat;
	background-size: contain;
}

.artist_title {
	background-color: rgba(119, 119, 119, 0.5);
	position: absolute;
	bottom: 110rpx;
	left: 10rpx;
	padding: 0 20rpx;
	border-radius: 15rpx;
	color: #ffffff;
}

.artist_title view {
	margin: 20rpx 0;
}

.artistName {
	font-size: 40rpx;
	font-weight: 500;
}

.artist_rank {
	font-weight: 500;
	font-size: 26rpx;
}

.artistIntroduce {
	padding: 0 20rpx;
	padding-bottom: 20rpx;
	border-bottom: 20rpx solid #fcfcfd;
}

.artistIntroduceTitle {
	font-size: 36rpx;
	color: #333333;
	font-weight: 700;
	padding: 20rpx 0;
	margin-left: 30rpx;
}

.artistIntroduceItem {
	font-size: 28rpx;
	color: #666666;
}

.artistIntroduceItem {
	display: -webkit-box;
	overflow: hidden;
	white-space: normal;
	text-overflow: ellipsis;
	word-wrap: break-word;
	-webkit-line-clamp: 3;
	-webkit-box-orient: vertical;
}

.hotSong {
	padding: 0 20rpx;
}

.hotSong_title {
	font-size: 36rpx;
	color: #333333;
	font-weight: 700;
	padding: 20rpx 0;
	margin-left: 30rpx;
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

.song {
	flex: 9;
	display: flex;
	justify-content: center;
	align-items: center;
	width: 670rpx;
	height: 110rpx;
	flex: 8;
	border-bottom: 4rpx solid #f0f0f1;
	/* border-radius: 10rpx; */
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
	display: -webkit-box;
	overflow: hidden;
	white-space: normal;
	text-overflow: ellipsis;
	word-wrap: break-word;
	-webkit-line-clamp: 1;
	-webkit-box-orient: vertical;
}

.newSongs_name text {
	color: #888888;
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
	border-bottom: 2rpx solid #f2f2f3;
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
	transform: rotate(45deg);
}

.influence {
	padding: 30rpx 40rpx;
	border-bottom: 2rpx solid #f2f2f3;
	font-size: 28rpx;
	color: #333333;
}

.influenceTitle {
	display: flex;
	align-items: center;
	font-size: 36rpx;
	color: #333333;
	font-weight: 700;
	padding: 20rpx 0;
}

.influenceTitle icon {
	margin-top: 5rpx;
}

.influenceList {
	display: flex;
}

.influenceList view image {
	width: 32rpx;
	height: 32rpx;
}

.ranking {
	margin-left: 20rpx;
	display: flex;
	align-items: center;
}

.hot {
	display: flex;
	align-items: center;
}
</style>
