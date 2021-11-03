<template>
	<view class="main">
		<!-- 头部的搜索 -->
		<view class="header">
			<view class="search_row">
				<view class="search"><icon type="search" class="icon_search" size="40rpx"></icon></view>
				<view class="input">
					<input
						type="text"
						@input="inputChange"
						@confirm="hotSearch"
						v-model="inputValue"
						placeholder="搜索歌曲、歌手、专辑"
						focus="true"
						maxlength="32"
						confirm-type="search"
					/>
				</view>
				<view class="clear" @click="isClear"><icon type="clear" size="40rpx" class="icon_clear" v-if="isInput == true"></icon></view>
			</view>
		</view>
		<view class="contain">
			<view class="search_content">
				<!-- 热门搜索 -->
				<view class="hot_search_wrap" v-if="hot_isShow">
					<view class="hot_search_title">热门搜索</view>
					<view class="hot_search_item">
						<navigator url="#" :data-first="item.first" @click="hotSearch" class="hot_search" v-for="(item, index) in hots" :key="index">{{ item.first }}</navigator>
					</view>
				</view>
				<!-- 获取搜索建议 -->
				<view class="suggest_wrap" v-if="suggest_isShow">
					<view class="suggest_title">搜索"{{ inputValue }}"</view>
					<navigator url="#" :data-first="item.keyword" class="match_wrap" v-for="(item, index) in suggest" wx:key="index" @click="hotSearch">
						<icon type="search" size="30rpx"></icon>
						<text>{{ item.keyword }}</text>
					</navigator>
				</view>
				<view class="hotSearchList" v-if="hotSearchList_isShow">
					<view class="hotSearchList_title">最佳匹配</view>
					<!-- 歌手 -->
					<navigator :url="'/pages/artist/artist?id='+hotMatchList.artist[0].id" class="bestMatch" v-if="hotMatchList.artist">
						<view class="bestMatch_img"><image :src="hotMatchList.artist[0].picUrl"></image></view>
						<view class="bestMatch_title">
							<view class="bestMatch_name">
								{{ hotMatchList.artist[0].occupation + ':' + hotMatchList.artist[0].name }}
								{{ hotMatchList.artist[0].alias != '' ? '(' + hotMatchList.artist[0].alias + ')' : '' }}
							</view>
						</view>
						<view class="bestMatch_icon"><image src="https://i.niupic.com/images/2021/09/15/9Bn8.png"></image></view>
					</navigator>
					<!-- 专辑 -->
					<navigator :url="'/pages/album/album?playListId='+hotMatchList.album[0].id" class="bestMatch" v-if="hotMatchList.album">
						<view class="bestMatch_img"><image :src="hotMatchList.album[0].picUrl"></image></view>
						<view class="bestMatch_title">
							<view class="bestMatch_name">{{ '专辑:' + hotMatchList.album[0].name }}</view>
							<view class="bestMatch_artist">{{ hotMatchList.album[0].artist.name }}</view>
						</view>
						<view class="bestMatch_icon"><image src="https://i.niupic.com/images/2021/09/15/9Bn8.png"></image></view>
					</navigator>
					<!-- MV -->
					<navigator :url="'/pages/mvDetail/mvDetail?mvid='+hotMatchList.mv[0].id" class="bestMatch" v-if="hotMatchList.mv">
						<view class="bestMatch_img"><image :src="hotMatchList.mv[0].cover"></image></view>
						<view class="bestMatch_title">
							<view class="bestMatch_name">{{ 'MV:' + hotMatchList.mv[0].name }}</view>
							<view class="bestMatch_artist">{{ hotMatchList.mv[0].artistName }}</view>
						</view>
						<view class="bestMatch_icon"><image src="https://i.niupic.com/images/2021/09/15/9Bn8.png"></image></view>
					</navigator>
					<!-- 点击热门搜索得到的歌曲-->
					<view class="newSongs_wrap">
						<navigator :url="'/pages/musicDetail/musicDetail?id=' + item.id" class="newSongs_item" v-for="(item, index) in hotSearchSongs" :key="index">
							<view class="newSongs_item_title">
								<view class="newSongs_name">{{ item.name }}</view>
								<view class="artist">
									<view class="artist_img_item"><view class="artist_img"></view></view>
									<view class="artist_name">{{ item.artists[0].name + '-' + item.album.name }}</view>
								</view>
							</view>
							<view class="newSongs_img"></view>
						</navigator>
						<navigator class="footer">
							<view class="footer_title">
								<view>到底了~</view>
								<view class="more"></view>
							</view>
						</navigator>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			isInput: false,
			inputValue: '',
			hot_isShow: true,
			hots: [],
			suggest: [],
			suggest_isShow: false,
			hotMatchList: [],
			hotSearchSongs: [],
			hotSearchList_isShow: false
		};
	},
	onLoad() {
		this.request({
			url: '/search/hot'
		}).then(res => {
			this.hots = res.result.hots;
		});
	},
	methods: {
		inputChange: function(event) {
			if (event.detail.value != '') {
				this.isInput = true;
				this.hot_isShow = false;
				this.suggest_isShow = true;
				this.hotSearchList_isShow = false;
				this.request({
					url: '/search/suggest?type=mobile',
					data: {
						keywords: this.inputValue
					}
				}).then(res => {
					this.suggest = res.result.allMatch;
				});
			} else {
				this.isInput = false;
				this.suggest_isShow = false;
				this.hot_isShow = true;
			}
		},
		isClear: function() {
			this.isInput = false;
			this.inputValue = '';
			this.suggest_isShow = false;
			this.hot_isShow = true;
			this.hotSearchList_isShow = false;
		},
		hotSearch: function(event) {
			if (event.currentTarget.dataset.first != undefined) {
				this.inputValue = event.currentTarget.dataset.first;
			}

			this.suggest_isShow = false;

			if (this.inputValue != '') {
				this.isInput = true;
				this.hotSearchList_isShow = true;
				this.hot_isShow = false;

				this.request({
					url: '/search/multimatch',
					data: {
						keywords: this.inputValue
					}
				}).then(res => {
					this.hotMatchList = res.result;
				});

				this.request({
					url: '/search',
					data: {
						keywords: this.inputValue
					}
				}).then(res => {
					this.hotSearchSongs = res.result.songs;
				});
			}
			else{
				uni.showToast({
					title:'输入不能为空'
				})
			}
		}
	}
};
</script>

<style>
.header {
	height: 100rpx;
	background-color: #d43c33;
	padding: 20rpx;
}
.search_row {
	display: flex;
	justify-content: center;
	align-items: center;
	height: 60rpx;
	background-color: #fff;
	border-radius: 15rpx;
}
.search {
	text-align: center;
	flex: 2;
	display: flex;
	justify-content: center;
	align-items: center;
}
.input {
	height: 100%;
	flex: 13;
	display: flex;
	align-items: center;
}
.input input {
	font-size: 28rpx;
	color: #333333;
	height: 100%;
	width: 100%;
}
.clear {
	text-align: center;
	flex: 2;
	display: flex;
	justify-content: center;
	align-items: center;
}

.contain {
	padding: 0 20rpx;
}

.search_content {
	width: 100%;
	border-top: 1px solid #ebecec;
}
.hot_search_title {
	padding: 20rpx 0;
	font-size: 24rpx;
	color: #333333;
}

.hot_search_item {
	display: flex;
	flex-wrap: wrap;
	font-size: 28rpx;
	color: #333333;
}

.hot_search {
	border-radius: 30rpx;
	border: 2rpx solid #ebecec;
	padding: 10rpx 20rpx;
	margin-right: 20rpx;
	margin-bottom: 20rpx;
}
.suggest_title {
	padding: 20rpx 0;
	font-size: 30rpx;
	color: #507daf;
	border-bottom: 2rpx solid #ebecec;
}
.match_wrap {
	display: flex;
	align-items: center;
	padding: 20rpx 0;
	padding-left: 5rpx;
	border-radius: 15rpx;
	border-bottom: 2rpx solid #ebecec;
}

.match_wrap text {
	font-size: 30rpx;
	color: #333333;
	margin-left: 12rpx;
}
.hotSearchList_title {
	margin-top: 20rpx;
	font-size: 24rpx;
	color: #666666;
}
.bestMatch {
	display: flex;
	align-items: center;
	padding: 20rpx 5rpx;
	border-bottom: 2rpx solid #f0f0f1;
}
.bestMatch_img {
	height: 100rpx;
}
.bestMatch_img image {
	width: 100rpx;
	height: 100rpx;
	border-radius: 15rpx;
}

.bestMatch_title {
	flex-grow: 1;
	margin-left: 30rpx;
}
.bestMatch_name {
	font-size: 34rpx;
	color: #333333;
	display: -webkit-box;
	overflow: hidden;
	white-space: normal;
	text-overflow: ellipsis;
	word-wrap: break-word;
	-webkit-line-clamp: 2;
	-webkit-box-orient: vertical;
}
.bestMatch_icon image {
	width: 40rpx;
	height: 40rpx;
}
.bestMatch_artist {
	color: #999999;
	font-size: 24rpx;
}

.newSongs_wrap {
	margin-top: 30rpx;
}

.newSongs_item {
	display: flex;
	justify-content: space-between;
	align-items: center;
	border-bottom: 2rpx solid #f0f0f1;
	margin-bottom: 10rpx;
	padding: 12rpx 0;
	/* border-radius: 15rpx; */
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
