import { expect } from 'chai';

import { Synthesis } from '../../synthesis';
import { HashTag } from '../../synthesis';

describe('Synthesis', () => {
  it('Should create a string of hashtags from a list of HashTags', () => {
    const tag1 = new HashTag("#a", "Large");
    const tag2 = new HashTag("#B", "Medium");
    const tag3 = new HashTag("#c", "Small");
    const tagList = [
      tag1, tag2, tag3
    ];
    console.log(Synthesis);
    const tagString = Synthesis.synthesize(tagList);
    for(let i = 0; i < tagList.length; i++){
      let tagGroup = tagList[i];
      for(let j = 0; j < tagGroup.length; j++){
        expect(tagString).to.include(tagGroup[j].tagString);
      }
    }
  });

  it('Should only contain valid hashtags')
})