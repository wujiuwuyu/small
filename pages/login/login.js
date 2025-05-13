import request from '~/api/request';

Page({
  data: {
    isSubmit: false,
    isCheck: false,
    radioValue: '',
    isPhoneNumber: false,
    passwordInfo: {
      account: '',
      password: ''
    }
  },

  // 检查是否满足提交条件
  changeSubmit() {
    const { account, password } = this.data.passwordInfo;
    if (this.data.isPhoneNumber && password !== '' && this.data.isCheck) {
      this.setData({ isSubmit: true });
    } else {
      this.setData({ isSubmit: false });
    }
  },

  // 检查账号是否为手机号
  onAccountChange(e) {
    const account = e.detail.value;
    const isPhoneNumber = /^[1][3-9][0-9]{9}$/.test(account);

    this.setData({
      isPhoneNumber,
      passwordInfo: { ...this.data.passwordInfo, account }
    });

    this.changeSubmit();
  },

  // 密码输入
  onPasswordChange(e) {
    this.setData({
      passwordInfo: { ...this.data.passwordInfo, password: e.detail.value }
    });
    this.changeSubmit();
  },

  // 用户协议勾选
  onCheckChange(e) {
    const value = e.detail.value;
    this.setData({
      radioValue: value,
      isCheck: value === 'agree'
    });
    this.changeSubmit();
  },

  // 登录提交
  async login() {
    //console.log('[data]', this.data.passwordInfo.account);
    //console.log('[data]', this.data.passwordInfo.password);
    const res = await request('/login/postPasswordLogin', 'post', {
      data: this.data.passwordInfo
    });
    console.log('0');
    console.log('[登录接口返回]', res);
    console.log('1');
    if (res.data.success) {
      await wx.setStorageSync('access_token', res.data.token);
      wx.switchTab({
        url: '/pages/my/index'
      });
    } else {
      wx.showToast({
        title: res.message || '登录失败',
        icon: 'none'
      });
    }
  }
});
