import { Component } from 'react';
import { connect } from 'react-redux';
import { View, Text } from '@tarojs/components';
import { AtButton } from 'taro-ui';
import Taro from '@tarojs/taro';

import { add, minus, asyncAdd } from '../../actions/counter';

import './index.scss';

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
	componentDidMount() {
		const app = Taro.getApp();
		console.log(app);
	}
	componentWillReceiveProps(nextProps) {
		console.log(this.props, nextProps);
	}

	componentWillUnmount() {}

	componentDidShow() {}

	componentDidHide() {}

	render() {
		return (
			<View className="index">
				<AtButton
					type="primary"
					size="small"
					className="add_btn"
					onClick={this.props.add}
				>
					+
				</AtButton>
				<AtButton
					type="secondary"
					size="small"
					className="dec_btn"
					onClick={this.props.dec}
				>
					-
				</AtButton>
				<AtButton
					type="primary"
					size="small"
					className="dec_btn"
					onClick={this.props.asyncAdd}
				>
					async
				</AtButton>
				<View>
					<Text>{this.props.counter.num}</Text>
				</View>
				<View>
					<Text>Hello, World</Text>
				</View>
			</View>
		);
	}
}

export default Index;
