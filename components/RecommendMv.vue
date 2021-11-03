<template>
	<scroll-view scroll-y @scrolltolower="mvRankHandleTolower" class="main">
		<view class="recommend_mv">
			<view class="recommend_mv_title">最新MV</view>
			<view class="recommend_mv_wrap">
				<scroll-view scroll-x class="scroll" @scrolltolower="newMvHandleTolower">
					<navigator :url="'/pages/mvDetail/mvDetail?mvid=' + item.id" class="recommend_mv_item" v-for="(item, index) in newMvList" :key="index">
						<view class="img">
							<image :src="item.cover" />
							<view class="playCountWrap">
								<view class="playCountImg"><image src="https://i.niupic.com/images/2021/09/11/9v7g.png" mode="widthFix"></image></view>
								<view class="playCount">{{ item.playCount | playCounFormat }}</view>
							</view>
						</view>
						<view class="name">{{ item.name }}</view>
						<view class="author">{{ item.artistName }}</view>
					</navigator>
				</scroll-view>
			</view>
		</view>
		<view class="mvRankList">
			<view class="mvRankList_title">MV排行榜</view>
			<view class="mvRankList_contain">
				<view class="updateDate">
					<view class="date">更新时间 ：{{ currentMonth }}月{{ currentDay }}日</view>
					<view class="updateDate_icon"><icon type="warn" size="30rpx" color="#c9c9c9"></icon></view>
				</view>
				<view class="mvRankingList">
					<navigator :url="'/pages/mvDetail/mvDetail?mvid=' + item.id" class="mvRankingList_item" v-for="(item, index) in mvRankingList" :key="index">
						<view class="item_img">
							<image :src="item.cover" mode="widthFix"></image>
							<view class="mRList_playCountWrap">
								<view class="mRList_playCountImg"><image src="https://i.niupic.com/images/2021/09/11/9v7g.png" mode="widthFix"></image></view>
								<view class="mRList_playCount">{{ item.playCount | playCounFormat }}</view>
							</view>
						</view>
						<view class="title">
							<view class="num">
								<view class="index">{{ index + 1 }}</view>
							</view>
							<view class="mv_data">
								<view class="mv_name">{{ item.name }}</view>
								<view class="mv_artist_name">{{ item.artistName }}</view>
							</view>
						</view>
					</navigator>
				</view>
			</view>
			<navigator url="#" class="footer" @click="mvRankHandleTolower">
				<view class="footer_title">
					<view>上拉查看更多</view>
					<view class="more"></view>
				</view>
			</navigator>
		</view>
	</scroll-view>
</template>

<script>
export default {
	name: 'RecommendMv',
	data() {
		return {
			newMvList: [],
			currentMonth: '',
			currentDay: '',
			mvRankingList: [],
			newMvLimit: 5,
			newMvSkip: 0,
			newMvHasMore: true,
			mvRankLimit: 5,
			mvRankSkip: 0,
			mvRankHasMore: true
		};
	},
	methods: {
		getNewMvList: function() {
			this.request({
				url: '/mv/first',
				data: {
					limit: this.newMvLimit
				}
			}).then(res => {
				this.newMvList = [...this.newMvList, ...res.data.slice(this.newMvSkip)];
				if (res.data.slice(this.newMvSkip).length === 0) {
					this.newMvHasMore = false;
				}
			});
		},
		getMvRankList: function() {
			this.request({
				url: '/top/mv',
				data: {
					limit: this.mvRankLimit
				}
			}).then(res => {
				this.mvRankingList =[...this.mvRankingList,...res.data.slice(this.mvRankSkip)] ;
				if (res.data.slice(this.mvRankSkip).length === 0) {
					this.mvRankHasMore = false;
				}
			});
		},

		newMvHandleTolower: function() {
			if (this.newMvHasMore) {
				this.newMvSkip = this.newMvLimit;
				this.newMvLimit += 5;
				this.getNewMvList();
			} else {
				uni.showToast({
					icon: 'none',
					title: '没有数据了'
				});
			}
		},
		mvRankHandleTolower: function() {
			if (this.mvRankHasMore) {
				this.mvRankSkip = this.mvRankLimit;
				this.mvRankLimit += 5;
				this.getMvRankList()
			} else {
				uni.showToast({
					icon: 'none',
					title: '没有数据了'
				});
			}
		}
	},
	mounted() {
		// 热歌榜更新日期
		const date = new Date();
		this.currentMonth = date.getMonth() + 1;
		this.currentDay = date.getDate();
		this.getNewMvList();
		this.getMvRankList()
	}
};
</script>

<style>
.main {
	width: 100%;
	height: 100vh;
}
.recommend_mv_title {
	font-size: 34rpx;
	margin-top: 20rpx;
	padding-left: 20rpx;
	border-left: 6rpx solid #d43c33;
}

.recommend_mv_wrap {
	margin-top: 20rpx;
}

.scroll {
	height: 340rpx;
	white-space: nowrap;
}

.recommend_mv_item {
	display: inline-block;
	width: 40%;
	border-radius: 15rpx;
	margin-right: 10rpx;
}

.recommend_mv_item:nth-child(1) {
	margin-left: 20rpx;
}

.recommend_mv_content {
	width: 100%;
}

.img image {
	height: 240rpx;
	width: 300rpx;
	border-radius: 15rpx;
}

.content_item {
	margin-top: 20rpx;
	margin-left: 10rpx;
	display: inline-block;
}

.playCountWrap {
	display: flex;
	position: relative;
	bottom: 220rpx;
	left: 80rpx;
	justify-content: center;
	align-items: center;
	height: 0;
}

.playCountImg image {
	width: 24rpx;
}

.playCount {
	margin-left: 3rpx;
	color: #ffffff;
	font-size: 24rpx;
}

.name {
	color: #333333;
	font-size: 30rpx;
	display: -webkit-box;
	overflow: hidden;
	white-space: normal;
	text-overflow: ellipsis;
	word-wrap: break-word;
	-webkit-line-clamp: 1;
	-webkit-box-orient: vertical;
	padding-left: 6rpx;
}

.author {
	color: #888888;
	font-size: 24rpx;
	padding-left: 6rpx;
}
.mvRankList {
	border-top: 2rpx solid rgba(102, 102, 102, 0.1);
}
.mvRankList_title {
	font-size: 34rpx;
	margin-top: 10rpx;
	padding-left: 20rpx;
	border-left: 6rpx solid #d43c33;
}
.mvRankList_contain {
	padding: 0 20rpx;
}
.updateDate {
	display: flex;
	justify-content: flex-start;
	align-items: center;
}
.date {
	font-size: 26rpx;
}
.updateDate_icon {
	display: flex;
	align-items: center;
	margin-left: 3rpx;
}
.mvRankingList_item {
	margin-top: 10rpx;
	border-radius: 15rpx;
}
.mvRankingList_item:nth-child(-n + 3) .title .num {
	color: #df3436;
}
.item_img image {
	width: 100%;
	border-radius: 15rpx;
}
.title {
	display: flex;
	align-items: center;
	padding: 6rpx 0;
}
.mv_data {
	margin-left: 20rpx;
}
.num {
	height: 116rpx;
	font-size: 50rpx;
	font-weight: 700;
	color: #999999;
}
.index {
	margin-top: 13rpx;
	margin-left: 6rpx;
}
.mv_name {
	font-size: 34rpx;
	color: #333333;
	display: -webkit-box;
	overflow: hidden;
	white-space: normal;
	text-overflow: ellipsis;
	word-wrap: break-word;
	-webkit-line-clamp: 1;
	-webkit-box-orient: vertical;
}
.mv_artist_name {
	font-size: 24rpx;
	color: #888888;
}
.mRList_playCountWrap {
	position: relative;
	bottom: 380rpx;
	right: 30rpx;
	display: flex;
	justify-content: flex-end;
	align-items: center;
	height: 0;
}
.mRList_playCountImg {
	width: 24rpx;
}
.mRList_playCount {
	margin-left: 3rpx;
	color: #ffffff;
	font-size: 24rpx;
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
