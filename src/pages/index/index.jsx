import { Component } from 'react';
// import { connect } from 'react-redux';
import { View, Image, Navigator } from '@tarojs/components';
// import { AtButton } from 'taro-ui';
import Taro from '@tarojs/taro';
import Utils from '../../utils/util';

import { GET_HOME_DATA, GET_RANDOM_SENTENCE } from '../../apis/request';

// import { add, minus, asyncAdd } from '../../actions/counter';/

import './index.scss';

import boatPng from '../../assets/images/boat.png';

const app = Taro.getApp();
let homeInterval = null;
// @connect(
// 	({ counter }) => ({
// 		counter,
// 	}),
// 	(dispatch) => ({
// 		add() {
// 			dispatch(add());
// 		},
// 		dec() {
// 			dispatch(minus());
// 		},
// 		asyncAdd() {
// 			dispatch(asyncAdd());
// 		},
// 	}),
// )
class Index extends Component {
	state = {
		date: Utils.formatDateToMb(),
		hot: {},
		poems: {},
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

	componentDidShow() {}

	componentDidHide() {}

	render() {
		const { date, hot } = this.state;

		return (
			<View className="container home-content">
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
			</View>
		);
	}
}

export default Index;
