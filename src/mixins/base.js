import { isString, getWindowWidth, getWindowHeight} from "@/utils/util.js";

const baseWidth = 1920;
const baseHeight = 1080;

export default {
  props: {
    w: {},
    h: {},
    lh:{},
    m: {},
    mr: {},
    ml: {},
    mb: {},
    p: {},
    pl: {},
    pr: {},
    pt: {},
    pb: {},
    l: {},
    r: {},
    b: {},
    bc: {},
  },
  data() {
    return {};
  },
  methods: {
    onClick(ev) {
      this.$emit("onClick", ev);
    },
    setAttValue(value, type, font) {
      if (value) {
        if (
          isString(value) &&
          (value === "auto" ||
            value.indexOf("%") !== -1 ||
            value.indexOf("px") !== -1)
        ) {
          return value;
        } else {
          let num = this.pxToVwh(value, type)
          
          if(font) {
            // 判断如果是文字 最小值为14px
            num = Math.max(this.getCurrentPx(value, type), 14)+'px'     
          }
          return num;
        }
      } else {
        return `${0}`;
      }
    },
    pxToVwh(value, type) {
      let result = `${parseInt(value) / baseWidth * 100}vw`;
      if(type == 'h') {
        result = `${parseInt(value) / baseHeight * 100}vh` ;
      }
      return result
    },

    getCurrentPx(value, type) {
      if (value) {
        let num = `${parseInt(value) / baseWidth * getWindowWidth()} `
        if(type == 'h') {
          num = `${parseInt(value) /  baseHeight * getWindowHeight()} `
        }
        return num;
      } else {
        return `${0}`;
      }
    },
    setPaddingValue(value, type) {
      if (value) {
        return `${this.setAttValue(value, type)}`;
      } else {
        return `0`;
      }
    },
    setMarginValue(value, type) {
      if (value) {
        if (value === "auto") {
          return value;
        } else {
          return `${this.setAttValue(value, type)}`;
        }
      } else {
        return `0`;
      }
    },
    getMarginStyle() {
      let style = "",
        margin = this.m.split(" ");
      switch (margin.length) {
          case 1:
            style += `margin-top: ${this.setMarginValue(margin[0], 'h')};`;
            break;

          case 2:
            style += `margin:${this.setMarginValue(
              margin[0],'h'
            )} ${this.setMarginValue(margin[1], 'w')};`;
            break;

          default:
            style += `margin: ${this.setMarginValue(
              margin[0], 'h'
            )} ${this.setMarginValue(margin[1])} ${this.setMarginValue(
              margin[2], 'h'
            )} ${this.setMarginValue(margin[3])};`;
            break;
        }
      return style;
    },
    getPaddingStyle() {
      let style = "",
        padding = this.p.split(" ");
        switch (padding.length) {
          case 1:
            style += `padding-top: ${this.setPaddingValue(padding[0], 'h')};`;
            break;

          case 2:
            style += `padding:${this.setPaddingValue( padding[0], 'h')} ${this.setPaddingValue(padding[1])};`;
            break;

          default:
            style += `padding: ${this.setPaddingValue(
              padding[0], 'h'
            )} ${this.setPaddingValue(padding[1])} ${this.setPaddingValue(
              padding[2], 'h'
            )} ${this.setPaddingValue(padding[3])};`;
            break;
        }
      return style;
    },
    getPaddingLeftStyle() {
      return `padding-left:${this.setAttValue(this.pl)};`;
    },
    getPaddingRightStyle() {
      return `padding-right:${this.setAttValue(this.pr)};`;
    },
    getMarginRightStyle() {
      return `margin-right:${this.setAttValue(this.mr)};`;
    },
    getMarginBottomStyle() {
      return `margin-bottom:${this.setAttValue(this.mb)};`;
    },
    getMarginLeftStyle() {
      return `margin-left:${this.setAttValue(this.ml)};`;
    },
    getPaddingBottomStyle() {
      return `padding-bottom:${this.setAttValue(this.pb)};`;
    },
    getWidthStyle() {
      return `width:${this.setAttValue(this.w)};`;
    },
    getHeightStyle() {
      let lh = this.lh || this.h
      return `height:${this.setAttValue(this.h, 'h')};line-height:${this.setAttValue(lh, 'h')};`
    },
    getColor(value) {
      if(/rgb/.test(value)) {
        return value;
      }else{
        return `#${value}`;
      }
    },
    getBaseStyle() {
      let style = "";
      if (this.w) {
        style += this.getWidthStyle();
      }
      if (this.h) {
        style += this.getHeightStyle();
      }
      if (this.m) {
        style += this.getMarginStyle();
      }
      if (this.mr) {
        style += this.getMarginRightStyle();
      }
      if (this.ml) {
        style += this.getMarginLeftStyle();
      }
      if (this.mb) {
        style += this.getMarginBottomStyle();
      }
      if (this.p) {
        style += this.getPaddingStyle();
      }
      if (this.pl) {
        style += this.getPaddingLeftStyle();
      }
      if (this.pr) {
        style += this.getPaddingRightStyle();
      }
      if (this.pb) {
        style += this.getPaddingBottomStyle();
      }
      if (this.l) {
        style += `left: ${this.setAttValue(this.l)};`;
      }
      if (this.lh) {
        style += `line-height: ${this.setAttValue(this.lh, 'h')};`;
      }
      if (this.r) {
        style += `right: ${this.setAttValue(this.r)};`;
      }
      if (this.t) {
        style += `top: ${this.setAttValue(this.t, 'h')};`;
      }
      if (this.b) {
        style += `bottom: ${this.setAttValue(this.b, 'h')};`;
      }
      if (this.bc) {
        style += `background-color: ${this.getColor(this.bc)};`
      }
      return style;
    }
  }
};
