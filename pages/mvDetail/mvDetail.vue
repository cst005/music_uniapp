<template>
	<view class="main">
		<view class="video_wrap">
			<view class="video" v-if="mvdetail.brs">
				<video
					:src="mvdetail.brs[480]"
					:poster="mvdetail.cover"
					show-mute-btn="true"
					:title="mvdetail.name"
					show-casting-button="true"
					show-screen-lock-button="true"
					ccontrols
				></video>
			</view>
			<view class="video_detail">
				<view class="video_name">{{ mvdetail.name }}</view>
				<view class="video_title">
					<view class="video_artist">歌手：{{ mvdetail.artistName }}</view>
					<view class="video_playCount">播放：{{ mvdetail.playCount }}</view>
				</view>
				<view class="video_publish">发行：{{ mvdetail.publishTime }}</view>
				<view class="mv_detail"></view>
			</view>
		</view>
		<view class="comment_wrap">
			<view class="comment_select"><view>评论区：</view></view>
			<navigator url="#" class="comment_item" v-if="hotComments" v-for="(item, index) in hotComments" :key="index">
				<view class="comment_user">
					<!-- 用户头像 -->
					<view class="comment_user_icon">
						<view class="icon"><image :src="item.user.avatarUrl" mode="widthFix"></image></view>
					</view>
					<view class="user_wrap">
						<view class="user_item">
							<!-- 用户名和注册时间 -->
							<view class="user">
								<view class="comment_user_name">{{ item.user.nickname }}</view>
								<view class="register_date">
								{{'yyyy年MM月DD日 ',item.time | timestampToDate }}
								</view>
							</view>
							<!-- 点赞数 -->
							<view class="likedCount">
								<view class="count" v-if="item.likedCount != 0">{{ item.likedCount }}</view>
								<view class="likedCount_icon"><image src="https://i.niupic.com/images/2021/09/11/9vaL.png" mode="widthFix"></image></view>
							</view>
						</view>
						<!-- 评论内容 -->
						<view class="content">{{ item.content }}</view>
					</view>
				</view>
			</navigator>
		</view>
		<navigator class="footer">
			<view class="footer_title">
				<view>到底了~</view>
				<view class="more"></view>
			</view>
		</navigator>
	</view>
</template>

<script>
export default {
	data() {
		return {
			mvdetail: [],
			hotComments: [],
			isFullScreen: 1
		};
	},
	methods: {},
	onLoad(options) {
		let mvid = options.mvid;
		console.log(mvid);
		this.request({
			url: '/mv/detail',
			data: {
				mvid: mvid
			}
		}).then(res => {
			this.mvdetail = res.data;
		});
		this.request({
			url: '/comment/mv',
			data: {
				id: mvid
			}
		}).then(res => {
			this.hotComments = res.hotComments;
		});
	}
};
</script>

<style>
.video video {
	width: 100%;
}

.video_name {
	padding: 20rpx 0;
	color: #333333;
	font-size: 34rpx;
}

.video_title {
	display: flex;
	justify-content: space-between;
	align-items: center;
}

.video_detail {
	padding: 0 20rpx;
}

.video_publish {
	padding: 20rpx 0;
}

.video_artist {
	color: #5f8cc6;
	font-size: 30rpx;
}

.video_playCount {
	color: #999999;
	font-size: 30rpx;
}

.video_publish {
	color: #999999;
	font-size: 26rpx;
}
.comment_item {
	width: 100%;
	margin-top: 20rpx;
	border-radius: 15rpx;
}
.comment_select {
	display: flex;
	justify-content: space-between;
}
.comment_wrap {
	padding: 0 20rpx;
	margin-top: 20rpx;
}

.icon image {
	width: 80rpx;
	border-radius: 50%;
}
.comment_user {
	display: flex;
}
.comment_user_icon {
	align-self: flex-start;
}
.user {
	display: flex;
	flex-direction: column;
}
.user_item {
	display: flex;
	justify-content: space-between;
	/* align-items: center; */
}
.user_wrap {
	width: 100%;
	display: flex;
	flex-direction: column;
	margin-left: 20rpx;
	border-bottom: 3rpx solid rgba(236, 236, 236, 0.8);
}
.likedCount {
	display: flex;
	justify-content: center;
	align-items: flex-start;
}
.content {
	margin: 20rpx 0;
}
.comment_user_name {
	font-size: 30rpx;
	color: #555555;
}
.register_date {
	color: #cfcfcf;
	font-size: 20rpx;
}
.likedCount {
	font-size: 28rpx;
	color: #999999;
}
.likedCount_icon {
	margin-left: 5rpx;
	margin-top: 3rpx;
}
.likedCount_icon image {
	width: 28rpx;
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
	margin-left: 5rpx;
	width: 15rpx;
	height: 15rpx;
	border-top: 3.6rpx solid #999999;
	border-right: 3.6rpx solid #999999;
	transform: rotate(45deg);
}
</style>
