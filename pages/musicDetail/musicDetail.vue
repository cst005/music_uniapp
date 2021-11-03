<template>
	<view class="main" v-if="newSongDetail.al">
		<view class="bag" :style="'background-image: url(' + newSongDetail.al.picUrl + ');'"></view>
		<navigator url="#" class="back" @click="back"><image src="https://i.niupic.com/images/2021/09/14/9ANn.png"></image></navigator>
		<view class="song_title">
			<view class="song_name">{{ newSongDetail.name }}</view>
			<view class="song_artist">{{ newSongDetail.ar[0].name }}</view>
		</view>

		<!-- 碟片 -->
		<view class="record">
			<view :class="['player_con', isPlaying ? 'playing' : '']">
				<image src="https://i.niupic.com/images/2021/09/13/9ywn.png" mode="widthFix" class="play_bar" />
				<image src="https://i.niupic.com/images/2021/09/13/9ywg.png" mode="widthFix" class="disc autoRotate" />
				<image :src="newSongDetail.al.picUrl" class="cover autoRotate" />
			</view>
		</view>
		<navigator :url="'/pages/musicComment/musicComment?id=' + newSongDetail.id" class="comment_wrap">
			<view class="comment_item">
				<view class="comment_icon"><image src="https://i.niupic.com/images/2021/09/13/9zny.png"></image></view>
				<view class="comment_title">评论</view>
			</view>
		</navigator>
		<view class="slider_item">
			<view class="slider_playing" @click="isPlaying ? audioPause() : audioPlay()"><image :src="isPlaying ? pause_icon : play_icon"></image></view>
			<view class="slider">
				<slider @change="slider_change" :value="myAudioPos" block-size="12" activeColor="#fff"></slider>
				<view class="slider_time">
					<view class="current-time">{{ audioCurrent }}</view>
					<view class="duration-time">{{ audioDuration }}</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
const innerAudioContext = uni.createInnerAudioContext();
export default {
	data() {
		return {
			musicUrl: '',
			newSongDetail: [],
			audioDuration: '',
			audioCurrent: '',
			myAudioPos: '',
			isPlaying: false,
			play_icon: 'https://i.niupic.com/images/2021/09/13/9yS2.png',
			pause_icon: 'https://i.niupic.com/images/2021/09/13/9yVJ.png'
		};
	},
	onLoad(options) {
		let id = options.id;
		this.request({
			url: '/song/detail',
			data: {
				ids: id
			}
		}).then(res => {
			this.newSongDetail = res.songs[0];
		});
		this.request({
			url: '/song/url',
			data: {
				id: id
			}
		}).then(res => {
			this.musicUrl = res.data[0].url;
			innerAudioContext.src = res.data[0].url;
		});
		innerAudioContext.loop = false;
		// 监听音频进入可以播放状态的事件
		innerAudioContext.onCanplay(() => {
			innerAudioContext.duration; //必须写，不然获取不到
			setTimeout(() => {
				(this.audioDuration = this.format(innerAudioContext.duration)),
					(this.audioCurrent = this.format(innerAudioContext.currentTime)),
					(this.duration = innerAudioContext.duration);
			}, 1);
		});
	},
	onUnload() {
		this.audioPause();
	},
	methods: {
		back: function() {
			uni.navigateBack({
				delta: 1
			});
		},
		audioPlay: function() {
			innerAudioContext.startTime = this.audioCurrent;
			this.isPlaying = !this.isPlaying;
			innerAudioContext.play();
			innerAudioContext.onTimeUpdate(() => {
				(this.myAudioPos = (innerAudioContext.currentTime / innerAudioContext.duration) * 100), (this.audioCurrent = this.format(innerAudioContext.currentTime));
			});
		},
		audioPause: function() {
			this.isPlaying = !this.isPlaying;
			innerAudioContext.pause();
		},
		slider_change: function(e) {
			const position = e.detail.value;
			var currentTime = (position / 100) * innerAudioContext.duration;
			innerAudioContext.seek(currentTime);
		},
		format(t) {
			let time = Math.floor(t / 60) >= 10 ? Math.floor(t / 60) : '0' + Math.floor(t / 60);
			t = time + ':' + ((t % 60) / 100).toFixed(2).slice(-2);
			return t;
		}
	}
};
</script>

<style>
.main {
	position: relative;
	overflow: hidden;
	width: 100%;
	height: 100vh;
}

.bag {
	z-index: -2;
	position: absolute;
	top: 0;
	bottom: 0;
	left: 0;
	right: 0;
	z-index: -1;
	background-size: cover;
	background-repeat: no-repeat;
	background-position: center;
	filter: blur(70rpx);
	-webkit-filter: blur(70rpx);
	-webkit-transform: scale(1.5);
	transform: scale(1.5);
}
.bag::after {
	content: '';
	z-index: -1;
	position: absolute;
	top: 0;
	left: 0;
	width: 100vw;
	height: 100vh;
	background-color: rgba(0, 0, 0, 0.3);
}
.back {
	position: absolute;
	top: 5%;
	width: 80rpx;
	text-align: center;
	border-radius: 20rpx;
	background-color: rgba(255, 250, 250, 0.1);
	margin-left: 20rpx;
}

.back image {
	width: 50rpx;
	height: 50rpx;
	margin-top: 5rpx;
}
.song_title {
	width: 40%;
	text-align: center;
	margin-left: 30%;
	margin-top: 8%;
}

.song_name {
	font-size: 34rpx;
	color: #ffffff;
	display: -webkit-box;
	overflow: hidden;
	white-space: normal;
	text-overflow: ellipsis;
	word-wrap: break-word;
	-webkit-line-clamp: 1;
	-webkit-box-orient: vertical;
}

.song_artist {
	font-size: 24rpx;
	color: #999999;
	filter: brightness(60%);
}
.play_bar {
	z-index: 3;
	position: absolute;
	left: 50%;
	margin-left: -3%;
	width: 26%;
	transform: rotate(-25deg);
	transform-origin: 12px 12px;
	transition: 1s;
}
/* 播放杆 转回去 */
.player_con.playing .play_bar {
	transform: rotate(0);
}

.disc {
	z-index: 2;
	position: absolute;
	left: 50%;
	margin-left: -32.5%;
	width: 65%;
	margin-top: 18%;
	border-radius: 50%;
	border: 5rpx solid rgba(250, 250, 250, 0.3);
}

.cover {
	z-index: 1;
	position: absolute;
	left: 50%;
	margin-left: -20%;
	width: 40%;
	height: 22%;
	margin-top: 33%;
}
/* 旋转的动画 */
@keyframes Rotate {
	from {
		transform: rotateZ(0);
	}

	to {
		transform: rotateZ(360deg);
	}
}

/* 旋转的类名 */
.autoRotate {
	animation-name: Rotate;
	animation-iteration-count: infinite;
	animation-play-state: paused;
	animation-timing-function: linear;
	animation-duration: 5s;
}

/* 是否正在播放 */
.player_con.playing .disc,
.player_con.playing .cover {
	animation-play-state: running;
}
.slider_item {
	position: absolute;
	bottom: 20%;
	left: 0;
	right: 0;
	display: flex;
	align-items: center;
	width: 96%;
	margin: 0 auto;
	padding: 20rpx;
	border-radius: 15rpx;
	background-color: rgba(255, 250, 250, 0.1);
}
.slider_playing {
	flex: 1;
}
.slider_playing image {
	width: 100rpx;
	height: 100rpx;
}
.slider {
	flex: 9;
	display: flex;
	flex-direction: column;
}
.slider_time {
	display: flex;
	justify-content: space-between;
	padding: 0 30upx;
	font-size: 28rpx;
	color: #ffffff;
}
.comment_wrap {
	position: absolute;
	bottom: 32%;
	right: 20rpx;
	border-radius: 30rpx;
}

.comment_item {
	display: flex;
	justify-content: center;
	align-items: center;
	border-radius: 30rpx;
	padding: 5rpx 10rpx;
	background-color: rgba(255, 250, 250, 0.1);
}

.comment_title {
	font-size: 24rpx;
	color: #ffffff;
	text-align: center;
	margin-bottom: 10rpx;
	margin-left: 5rpx;
}

.comment_icon image {
	width: 38rpx;
	height: 38rpx;
}
</style>
