// 导入首页数据获取服务
import { fetchHome } from '../../services/home/home';
// 导入Toast提示组件
import Toast from 'tdesign-miniprogram/toast/index';

// 添加 Mock 数据
// 快速入口数据
const mockQuickEntries = [
  { icon: '/assets/icons/company.png', text: '公司介绍' },
  { icon: '/assets/icons/group.png', text: '团购验券' },
  { icon: '/assets/icons/member.png', text: '会员中心' },
];

// 视频列表数据
const mockVideoList = [
  { videoSrc: '/assets/videos/video1.mp4', title: '视频1' },
  { videoSrc: '/assets/videos/video2.mp4', title: '视频2' },
  { videoSrc: '/assets/videos/video3.mp4', title: '视频3' },
];

Page({
  // 页面的初始数据
  data: {
    imgSrcs: [], // 轮播图图片源
    pageLoading: false, // 页面加载状态
    current: 1, // 当前轮播图索引
    autoplay: true, // 是否自动播放
    duration: '500', // 滑动动画时长
    interval: 5000, // 轮播间隔
    navigation: { type: 'dots' }, // 导航器类型
    swiperImageProps: { mode: 'scaleToFill' }, // 轮播图图片属性
    quickEntries: [], // 快速入口列表
    videoList: [], // 视频列表
  },

  // 生命周期函数--监听页面显示
  onShow() {
  },

  // 生命周期函数--监听页面加载
  onLoad() {
    this.init();
  },

  // 页面下拉刷新事件的处理函数
  onPullDownRefresh() {
    this.init();
  },

  // 初始化页面数据
  init() {
    this.loadHomePage();
    this.setData({
      quickEntries: mockQuickEntries,
      videoList: mockVideoList,
    });
  },

  // 加载首页数据
  loadHomePage() {
    wx.stopPullDownRefresh();

    this.setData({
      pageLoading: true,
    });
    fetchHome().then(({ swiper }) => {
      this.setData({
        imgSrcs: swiper,
        pageLoading: false,
      });
    });
  },

  // 跳转到活动详情页面
  navToActivityDetail({ detail }) {
    const { index: promotionID = 0 } = detail || {};
    wx.navigateTo({
      url: `/pages/promotion-detail/index?promotion_id=${promotionID}`,
    });
  },
});
