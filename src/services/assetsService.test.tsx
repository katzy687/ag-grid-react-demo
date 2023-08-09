
import { describe, it, assert } from 'vitest'
import { formatDate } from './assetsService';

describe('test date formatter', () => {
    const inputDate = '2022-06-30T12:14:19.299Z'
    const expectedDate = '2022-06-30 12:14:19'
    it('should transform date', () => {
        const res = formatDate(inputDate);
        assert.equal(res, expectedDate);
  })
});
