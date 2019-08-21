export default class GuideLine{
  constructor(line){
    this.type=line.type || 'xline' //'yline'
    this.pos=line.pos || 0
  }
}