
//import HashTag from "./HashTag";

function readTagsFromFile(filePath, group){
    
}
function synthesize(tags){
  let tagString = '';
  // console.log(tags + ' ' + tags.length);
  for(let i = 0; i < tags.length; i++){
    console.log(tags[i]);
    tagString += tags[i].tagString + ' ';
  }
  console.log(tagString);
  return tagString;
}


module.exports = {
  synthesize,
};