
import { describe, it, assert } from 'vitest'
import { formatDate, Tag, formatTags, buildAssetRows } from './assetsService';
import testJsonData from './test_assets.json';


describe('test date formatter', () => {
  const inputDate = '2022-06-30T12:14:19.299Z'
  const expectedDate = '2022-06-30 12:14:19'
  it('should transform date', () => {
    const res = formatDate(inputDate);
    assert.equal(res, expectedDate);
  })
});

describe('test tag formatter', () => {
  const inputTags: Tag[] = [
    { "key": "key1", "value": "value1" },
    { "key": "key2", "value": "value2" },
  ]
  const expectedTagStr = 'key1=value1,key2=value2'
  it('should transform tags', () => {
    const res = formatTags(inputTags);
    assert.equal(res, expectedTagStr);
  })
});


describe('test build rows', () => {
  it('should build asset rows', () => {
    const res = buildAssetRows(testJsonData);
    assert.exists(res);
  })
});
