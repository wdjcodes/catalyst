export default class HashTag {

  constructor(string, group) {
    if(string[0] == "#"){
      this.tagString = string.slice(1);
    }else {
      this.tagString = string;
    }

    
    if(this.tagString.search(/[^\w]/g) >= 0 || this.tagString.length <= 0){
      throw new Error("InvalidTag");
    }

    this.tagString = "#" + this.tagString;
    this.tagGroup = group;
  }
}
