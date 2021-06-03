import { Component } from 'react';
import { View, Image, Navigator } from '@tarojs/components';
// import { AtButton } from 'taro-ui';
import Taro from '@tarojs/taro';
import Utils from '../../utils/util';

import { GET_HOME_DATA, GET_RANDOM_SENTENCE } from '../../apis/request';

import './index.scss';

import boatPng from '../../assets/images/boat.png';
import sentenceIcon from '../../assets/images/icon/sentence.png';
import poemIcon from '../../assets/images/icon/poem.png';
import poetIcon from '../../assets/images/icon/poet.png';
import searchIcon from '../../assets/images/icon/find_active.png';
const app = Taro.getApp();
class Index extends Component {
	state = {
		date: Utils.formatDateToMb(),
		hot: {},
		poems: {},
	};

	componentDidMount() {
		// 获取每日一首诗词
		GET_RANDOM_SENTENCE().then((res) => {
			console.log(res.data);
			if (res && res.statusCode === 200) {
				const { data = [] } = res;
				this.setState({
					hot: data.length > 0 ? data[0] : [],
				});
			}
		});
		// 获取首页诗词列表数据
		GET_HOME_DATA().then((res) => {
			console.log(res.data);
			if (res && res.statusCode === 200) {
				this.setState({
					poems: res.data,
				});
			}
		});
	}
	componentWillReceiveProps(nextProps) {
		console.log(this.props, nextProps);
	}

	componentWillUnmount() {}

	componentDidShow() {}

	componentDidHide() { }
	
	onPullDownRefresh() {
		Taro.stopPullDownRefresh();
	}

	render() {
		const { date, hot } = this.state;

		return (
			<View className="container home-content">
				{/* 首页每日诗词部分 */}
				<View className="home-header">
					<View className="h-content">
						<View className="h-time y">{date[0]}</View>
						<View className="h-time m">{date[1]}</View>
						<View className="h-poem">每日一诗</View>
						<View className="day">{date[2]}</View>
						<Navigator
							url="sentence/detail/index?id={{hot.id}}"
							className="h-p-content"
						>
							{hot.title}
						</Navigator>
					</View>
					<Image className="h-boat boat-img" src={boatPng}></Image>
				</View>
				{/* 中间导航部分 */}
				<View className="nav-list">
					<Navigator
						url="poem/index"
						hover-class="Navigator-hover"
						className="weui-flex__item nav-item"
					>
						<Image classNmae="" src={poemIcon} />
						<View className="nav-item-text">诗词文言</View>
					</Navigator>
					<Navigator
						url="sentence/index"
						hover-class="Navigator-hover"
						className="weui-flex__item nav-item"
					>
						<Image className="" src={sentenceIcon} />
						<View className="nav-item-text">热门名句</View>
					</Navigator>
					<Navigator
						url="poet/index"
						hover-class="Navigator-hover"
						className="weui-flex__item nav-item"
					>
						<Image className="" src={poetIcon} />
						<View className="nav-item-text">历朝诗人</View>
					</Navigator>
					<Navigator
						url="/pages/search/index"
						open-type="switchTab"
						hover-class="Navigator-hover"
						className="weui-flex__item nav-item"
					>
						<Image className="" src={searchIcon} />
						<View className="nav-item-text">搜索</View>
					</Navigator>
				</View>
				<View className="divide"></View>
			</View>
		);
	}
}

export default Index;
