import { expect } from 'chai';
import { numberGenerator } from '../helpers/generators';
import { SpyIterable } from '../helpers/SpyIterable';
import { query } from '../../lib/Query';

describe('Query (filter)', () => {
  describe('When calling filter', () => {
    it('Should return array of 3 elements', () => {
      const source = new SpyIterable([0, -4, 4, 30, -10, 10]);
      const q = query(source).filter(x => x <= 0);

      expect(source.wasIterated).to.be.false;
      expect(q.toArray()).to.be.deep.equal([0, -4, -10]);
    });

    it('Should return array of 1 element', () => {
      const source = new SpyIterable([0, -4, 4, 30, -10, 10]);
      const q = query(source).filter((elem, idx) => idx === 0);

      expect(source.wasIterated).to.be.false;
      expect(q.toArray()).to.be.deep.equal([0]);
    });

    it('Should return array of 1 object', () => {
      const source = new SpyIterable([
        { val: 10, tag: 'a' }, { val: 20, tag: 'b' }, { val: -10, tag: 'c' },
      ]);
      const q = query(source).filter(x => x.tag === 'a');

      expect(source.wasIterated).to.be.false;
      expect(q.toArray()).to.be.deep.equal([{ val: 10, tag: 'a' }]);
    });
  });

  describe('When calling skip', () => {
    it('Should return 5 elements', () => {
      const source = new SpyIterable(numberGenerator());
      const q = query(source).skip(2).take(5);

      expect(source.wasIterated).to.be.false;
      expect(q.toArray()).to.be.deep.equal([2, 3, 4, 5, 6]);
    });
  });

  describe('When calling skip and take', () => {
    it('Should return 4 elemens', () => {
      const source = new SpyIterable(numberGenerator(1, 2));
      const q = query(source).skip(2).take(4);

      expect(source.wasIterated).to.be.false;
      expect(q.toArray()).to.be.deep.equal([5, 7, 9, 11]);
    });

    it('Should return 1 element', () => {
      const source = new SpyIterable(numberGenerator(1, 2));
      const q = query(source).skip(10).take(1);

      expect(source.wasIterated).to.be.false;
      expect(q.at(0)).to.be.equal(21);
    });
  });
});