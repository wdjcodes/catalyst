import { expect } from 'chai';
let should = require('chai').should();

import HashTag from '../../synthesis/HashTag';

describe('The HashTag class:', () => {
  it('Should have a tagString and a tagGroup', () => {
    const tagString = '#cats';
    const tagGroup = 'Large';
    const tag = new HashTag(tagString, tagGroup);
    expect(tag.tagString).to.equal(tagString);
    expect(tag.tagGroup).to.equal(tagGroup);
  });

  it('Should accept all valid tagStrings', () => {
    const case1 = {
      tag : '#cats',
      result : '#cats',
    };
    const case2 = {
      tag : "cats",
      result : "#cats",
    };
    const case3 = {
      tag : "CatS",
      result : "#CatS",
    };
    const case4 = {
      tag : "cats57",
      result : "#cats57",
    };
    const testCases = [ case1, case2, case3, case4 ];

    for(let i = 0; i < testCases.length; i++){
      let testCase = testCases[i];
      let result = new HashTag(testCase.tag, "LARGE");
      expect(result.tagString).to.equal(testCase.result);
    }
  });

  it('Should throw an InvalidTag exception for invalid tagStrings', () => {
    const testCases = [
      "#?qzlvx",
      "#thea#the",
      "#tails.heads",
      "#cats!",
      "#",
      ""
    ]
    for(let i = 0; i < testCases.length; i++){
      (() => new HashTag(testCases[i], "LARGE")).should.throw(Error, 'InvalidTag');
    }
  });
});
