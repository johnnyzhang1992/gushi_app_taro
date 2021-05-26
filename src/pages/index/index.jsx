import { Component } from 'react';
import { connect } from 'react-redux';
import { View, Image, Navigator } from '@tarojs/components';
// import { AtButton } from 'taro-ui';
import Taro from '@tarojs/taro';
import Utils from '../../utils/util';

import { GET_HOME_DATA, GET_RANDOM_SENTENCE } from '../../apis/request';

import { add, minus, asyncAdd } from '../../actions/counter';

import './index.scss';

import boatPng from '../../assets/images/boat.png';

const app = Taro.getApp();
let homeInterval = null;
@connect(
	({ counter }) => ({
		counter,
	}),
	(dispatch) => ({
		add() {
			dispatch(add());
		},
		dec() {
			dispatch(minus());
		},
		asyncAdd() {
			dispatch(asyncAdd());
		},
	}),
)
class Index extends Component {
	state = {
		date: Utils.formatDateToMb(),
		hot: {},
		poems: {},
		animationData: {},
	};

	componentDidMount() {
		GET_RANDOM_SENTENCE().then((res) => {
			console.log(res.data);
			if (res && res.statusCode === 200) {
				const { data = [] } = res;
				this.setState({
					hot: data.length > 0 ? data[0] : [],
				});
			}
		});
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

	componentDidShow() {
		let that = this;
		const sysInfo = Taro.getSystemInfoSync();
		let winWidth = sysInfo.windowWidth;
		let ii = 0;
		let animation = Taro.createAnimation({
			duration: 20000,
			timingFunction: 'ease-in-out',
		});
		//动画的脚本定义必须每次都重新生成，不能放在循环外
		animation
			.translateX(winWidth - 50)
			.step({ duration: 10000 })
			.translateX(10)
			.step({ duration: 10000 });
		// 更新数据
		that.setState({
			// 导出动画示例
			animationData: animation.export(),
		});
		homeInterval = setInterval(
			function () {
				//动画的脚本定义必须每次都重新生成，不能放在循环外
				animation
					.translateX(winWidth - 50)
					.step({ duration: 10000 })
					.translateX(10)
					.step({ duration: 10000 });
				// 更新数据
				that.setState({
					// 导出动画示例
					animationData: animation.export(),
				});
				++ii;
			}.bind(that),
			20000,
		); //20000这里的设置如果小于动画step的持续时间的话会导致执行一半后出错
	}

	componentDidHide() {
		clearInterval(homeInterval);
	}

	render() {
		const { date, hot, animationData } = this.state;
		console.log(animationData)
		return (
			<View className="index">
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
					<Image
						className="h-boat boat-img"
						src={boatPng}
						animation={animationData}
					></Image>
				</View>
			</View>
		);
	}
}

export default Index;
