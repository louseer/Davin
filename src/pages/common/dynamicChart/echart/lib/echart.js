//此类暂时保留。暂时还没有提取公共方法
import echarts from 'echarts';
export default class Echart{
  constructor(el,config){
    this.el = el;
    this.config = config;
    this.options = null;
    this.chart = echarts.init(el);
  }

}