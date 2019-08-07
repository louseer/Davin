export default class Option {
  constructor(value){
    this.default = value;
    this.value = value;
  }
  set(value){
    this.value = value
  }
} 