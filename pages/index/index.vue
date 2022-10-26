<template>
	<view class="content">
		<view class="select-input">
			<view class="select-input_input">
				<input :value="webstaticUrl" placeholder="请输入原神抽卡链接" maxlength="-1" />
				<icon type="search" color="#1B1B1B" @tap="getMihoyoInfo()"></icon>
			</view>


			<view class="btns">
				<button size="mini" type="primary" plain="true" @tap="urlClose()">一键清空</button>
				<button size="mini" type="primary" plain="true" @tap="copyUrl()"
					style="margin-left: 20rpx;">一键粘贴</button>
				<!-- <view class="" ></view> -->
			</view>
		</view>

		<!-- 显示数据区 -->
		<view class="select-con">
			<!-- 角色up -->
			<view class="select-con_item">
				<view class="select-con_item_top">
					<view class="select-con_item_title">角色UP池</view>
					<view class="select-con_item_num">已{{limit_list.num || 0}}抽未出五星</view>
					<view class="select-con_item_top_data">
						<view class="select-con_item_top_data_item">
							<view class="select-con_item_top_data_item_num">{{limit_list_info.length || 0}}</view>
							<view class="select-con_item_top_data_item_title">总抽卡数</view>
						</view>

						<view class="select-con_item_top_data_item" style="margin-left: 60rpx;">
							<view class="select-con_item_top_data_item_num">{{limit_list.count || 0}}</view>
							<view class="select-con_item_top_data_item_title">平均出金</view>
						</view>

					</view>
				</view>
				<view class="select-con_item_item">
					<view class="">
						五星出卡顺序：
					</view>
					<block v-for="(lItem, lIdx) in limit_list.list" :key="lIdx">
						<view class="select-con_item_item-item">{{lItem.name}}[{{lItem.idx}}]</view>
					</block>
				</view>
			</view>
			<!-- 武器up -->
			<view class="select-con_item">
				<view class="select-con_item_top">
					<view class="select-con_item_title">武器UP池</view>
					<view class="select-con_item_num">已{{weapon_list.num || 0}}抽未出五星</view>
					<view class="select-con_item_top_data">
						<view class="select-con_item_top_data_item">
							<view class="select-con_item_top_data_item_num">{{weapon_list_info.length || 0}}</view>
							<view class="select-con_item_top_data_item_title">总抽卡数</view>
						</view>

						<view class="select-con_item_top_data_item" style="margin-left: 60rpx;">
							<view class="select-con_item_top_data_item_num">{{weapon_list.count || 0}}</view>
							<view class="select-con_item_top_data_item_title">平均出金</view>
						</view>
					</view>
				</view>
				<view class="select-con_item_item">
					<view class="">
						五星出卡顺序：
					</view>
					<block v-for="(wItem, lIdx) in weapon_list.list" :key="lIdx">
						<view class="select-con_item_item-item">{{wItem.name}}[{{wItem.idx}}]</view>
					</block>
				</view>
			</view>
			<!-- 常驻up -->
			<view class="select-con_item">
				<view class="select-con_item_top">
					<view class="select-con_item_title">常驻UP池</view>
					<view class="select-con_item_num">已{{permanent_list.num || 0}}抽未出五星</view>
					<view class="select-con_item_top_data">
						<view class="select-con_item_top_data_item">
							<view class="select-con_item_top_data_item_num">{{permanent_list_info.length || 0}}</view>
							<view class="select-con_item_top_data_item_title">总抽卡数</view>
						</view>

						<view class="select-con_item_top_data_item" style="margin-left: 60rpx;">
							<view class="select-con_item_top_data_item_num">{{permanent_list.count|| 0}}</view>
							<view class="select-con_item_top_data_item_title">平均出金</view>
						</view>
					</view>
				</view>
				<view class="select-con_item_item">
					<view class="">
						五星出卡顺序：
					</view>
					<block v-for="(pItem, lIdx) in permanent_list.list" :key="lIdx">
						<view class="select-con_item_item-item">{{pItem.name}}[{{pItem.idx}}]</view>
					</block>
				</view>
			</view>
		</view>
	</view>


</template>

<script>
	import {
		mihoyo_url,
		mihoyo_api_info
	} from '../../common/apiList.js'
	import {
		httpGet
	} from '../../common/http.js'
	export default {
		data() {
			return {
				title: 'Hello',
				webstaticUrl: '',
				weapon_list_info: [], //武器
				limit_list_info: [], // up
				permanent_list_info: [], //常驻
				permanent_list: [], //常驻五星
				limit_list: {}, // 角色up五星
				weapon_list: [] // 武器五星
			}

		},
		onLoad() {
			console.log(mihoyo_api_info, mihoyo_url)
			// this.getList()
		},
		methods: {
			// 一键粘贴
			copyUrl() {
				let _this = this
				uni.getClipboardData({
					success(res) {
						console.log(res.data)
						_this.$data.webstaticUrl = res.data
					}
				})
			},
			urlClose() {
				this.$data.webstaticUrl = ''
			},
			getMihoyoInfo() {
				this.$data.permanent_list_info = []
				this.$data.limit_list_info = []
				this.$data.weapon_list_info = []
				this.getList()
			},
			/* 
			 *  常驻池
			 *	gache_type: 200(常驻)   301(up)   302(武器)
			 */
			getList(eid) {

				let _this = this

				// let _url = this.$data.webstaticUrl.substr(this.$data.webstaticUrl.indexOf('?') + 1)

				let _url = this.$data.webstaticUrl.replace('&gacha_type=200&page=1&end_id=0', '')

				// _url = _url.replace('#/log', '')

				let url = _url + '&gacha_type=200&page=1&size=20&end_id='

				if (eid) {
					url = url + eid
				}

				httpGet(url).then(res => {
					if (res.retcode == -101) {
						uni.showToast({
							title: '该链接已过期，请从原神里重新复制链接',
							icon: 'none'
						})
						return false
					}
					let _list = res.data.list
					this.$data.permanent_list_info = this.$data.permanent_list_info.concat(_list)

					if (res.retcode == 0 && res.data.list.length == 20) {
						setTimeout(function() {
							_this.getList(res.data.list[res.data.list.length - 1].id)
						}, 1100)
					} else {
						this.$data.permanent_list_info = this.$data.permanent_list_info.reverse()
						this.$data.permanent_list = this.filterRankType5(this.$data.permanent_list_info)
						this.getLimitListInfo(_url, false)
					}

				})
			},
			// up池
			getLimitListInfo(lurl, eid) {
				let that = this
				let _lurl = lurl + '&gacha_type=301&page=1&size=20&end_id='

				if (eid) {
					_lurl = _lurl + eid
				}

				httpGet(_lurl).then(lres => {

					let _llist = lres.data.list
					this.$data.limit_list_info = this.$data.limit_list_info.concat(_llist)
					if (lres.retcode == 0 && lres.data.list.length == 20) {
						setTimeout(function() {
							that.getLimitListInfo(lurl, lres.data.list[lres.data.list.length - 1].id)
						}, 1100)
					} else {
						this.$data.limit_list_info = this.$data.limit_list_info.reverse()
						this.$data.limit_list = this.filterRankType5(this.$data.limit_list_info)
						this.getPermanentListInfo(lurl, false)
					}

				})
			},
			// 武器池
			getPermanentListInfo(purl, eid) {
				let _pthis = this
				let _purl = purl + '&gacha_type=302&page=1&size=20&end_id='

				if (eid) {
					_purl = _purl + eid
				}

				httpGet(_purl).then(pres => {

					let _plist = pres.data.list

					this.$data.weapon_list_info = this.$data.weapon_list_info.concat(_plist)

					if (pres.retcode == 0 && pres.data.list.length == 20) {
						setTimeout(function() {
							_pthis.getPermanentListInfo(purl, _plist[_plist.length - 1].id)
						}, 1100)
					} else {
						this.$data.weapon_list_info = this.$data.weapon_list_info.reverse()
						this.$data.weapon_list = this.filterRankType5(this.$data.weapon_list_info)
					}

				})
			},
			filterRankType5(list) {
				
				let rankType5list = [],_idx = 0
				
				list.forEach((item, idx) => {
					if (Number(item.rank_type) == 5) {
						rankType5list.push({
							name: item.name,
							idx: (idx - _idx) + 1,
							time: item.time
						})
						
						_idx = idx + 1
					}
				})
				
				let _data = {
					list: rankType5list.reverse(),
					num: list.length - _idx,
					count: (list.length / rankType5list.length).toFixed(2)
				}

				return _data
			}
		}
	}
</script>

<style lang="less">
	.content {
		display: flex;
		align-items: center;
		flex-direction: column;

		.select-input {
			width: 80%;
			display: flex;
			align-items: center;
			flex-direction: column;

			.select-input_input {
				display: flex;
				justify-content: space-between;
				align-items: center;
				margin-top: 28rpx;
				width: 100%;
				border: 1rpx solid #FFFFFF;
				border-radius: 20rpx;
				padding: 30rpx 30rpx;
				background: #E8E8E8;
				opacity: 0.8;

				input {
					width: 84%;
					// color: #FFFFFF;
				}


			}


		}

		.btns {
			margin-top: 28rpx;
			display: flex;
			justify-content: center;
			padding-bottom: 20rpx;
		}

		.select-con {
			width: 100vw;
			height: calc(100vh - 264rpx);
			display: flex;
			flex-direction: column;
			align-items: center;
			background: rgba(245, 246, 250, 1);

			.select-con_item {
				margin-top: 20rpx;
				width: 690rpx;
				background: #FFFFFF;
				box-shadow: 0px 3px 20rpx 0px rgba(216, 216, 217, 0.3);
				border-radius: 20rpx;
				padding: 20rpx;
				box-sizing: border-box;

				.select-con_item_top {
					.select-con_item_title {
						font-size: 42rpx;
						font-weight: bold;
						color: #000000;
					}

					.select-con_item_num {
						margin-top: 30rpx;
						margin-bottom: 20rpx;
						color: rgba(106, 116, 154, 1);
						font-size: 32rpx;
					}

					.select-con_item_top_data {
						display: flex;

						.select-con_item_top_data_item {
							display: flex;
							flex-direction: column;
							align-items: center;

							.select-con_item_top_data_item_num {
								font-size: 32rpx;
								font-weight: bold;
								color: #000000;
							}

							.select-con_item_top_data_item_title {
								font-size: 28rpx;
								color: rgba(106, 116, 154, 1);
							}
						}
					}
				}

				.select-con_item_item {
					margin-top: 20rpx;
					display: flex;
					flex-wrap: wrap;
					font-size: 30rpx;
					color: rgba(106, 116, 154, 1);

					.select-con_item_item-item {
						margin-left: 16rpx;
						font-size: 30rpx;
						color: rgba(106, 116, 154, 1);
					}
				}
			}
		}
	}
</style>
