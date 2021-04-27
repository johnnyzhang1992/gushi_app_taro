import { Component } from 'react';
import { Provider } from 'react-redux';
import Taro from '@tarojs/taro';

import configStore from './store';

import './app.scss';

const store = configStore();

class App extends Component {
	componentDidMount() {
		// console.log(Taro.ENV_TYPE);
		// 应用载入时，传入的相关参数
		const AppOptions = Taro.getLaunchOptionsSync();
		console.log(AppOptions);
		const ENV_TYPE = Taro.getEnv();
		// 微信小程序
		if (ENV_TYPE === 'WEAPP') {
			// 更新小程序逻辑
			const updateManager = Taro.getUpdateManager();
			updateManager.onCheckForUpdate(function (res) {
				// 请求完新版本信息的回调
				console.log('小程序是否有更新：'+res.hasUpdate);
			});
			updateManager.onUpdateReady(function () {
				Taro.showModal({
					title: '更新提示',
					content: '新版本已经准备好，是否重启应用？',
					success: function (res) {
						if (res.confirm) {
							// 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
							updateManager.applyUpdate();
						}
					},
				});
			});
			updateManager.onUpdateFailed(function () {
				// 新的版本下载失败
				console.log("更新失败")
			});
		}
	}

	componentDidShow() {}

	componentDidHide() {}

	componentDidCatchError() {}

	// 在 App 类中的 render() 函数没有实际作用
	// 请勿修改此函数
	render() {
		return <Provider store={store}>{this.props.children}</Provider>;
	}
}

export default App;
