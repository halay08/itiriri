import 'mocha';
import 'chai-as-promised';
import * as chai from 'chai';
import { query } from '../lib/Query';

chai.use(require('sinon-chai'));
chai.use(require('chai-as-promised'));
chai.use(require('chai-spies'));

const numberGenerator = function* (offset = 0, step = 1) {
  let i = offset;
  while (1) {
    yield i;
    i += step;
  }
};

describe('Query', () => {
  describe('When calling constructor', () => {
    it('Should return a Query', () => {
      const q = query([]);
      const methods = [
        'entries', 'keys', 'values', 'forEach', 'concat', 'prepend', 'fill',
        'toArray', 'toMap', 'toGroups', 'toSet', 'toString', 'filter', 'take',
        'skip', 'slice', 'splice', 'join', 'leftJoin', 'rightJoin', 'groupJoin',
        'sort', 'sortDesc', 'shuffle', 'reverse', 'every', 'some', 'includes',
        'distinct', 'exclude', 'intersect', 'union', 'map', 'flat', 'groupBy',
        'at', 'indexOf', 'findIndex', 'lastIndexOf', 'findLastIndex', 'count',
        'first', 'find', 'last', 'findLast', 'average', 'min',
        'max', 'sum', 'reduce', 'reduceRight',
      ];

      methods.forEach((method) => {
        chai.expect(q).to.have.property(method);
      });
    });
  });

  describe('When calling skip and take', () => {
    it('Should return 4 elemens', () => {
      const q = query(numberGenerator(1, 2));
      chai.expect(q.skip(2).take(4).toArray()).to.be.deep.equal([5, 7, 9, 11]);
    });

    it('Should return 1 element', () => {
      const q = query(numberGenerator(1, 2));
      chai.expect(q.skip(10).take(1).at(0)).to.be.equal(21);
    });
  });

  describe('When calling entries', () => {
    it('Should return 4 key/value pairs', () => {
      const q = query(numberGenerator(0, 2)).take(4);
      chai.expect(q.entries().toArray()).to.be.deep.equal([
        [0, 0], [1, 2], [2, 4], [3, 6],
      ]);
    });
  });

  describe('When calling values', () => {
    it('Should return a new query with same values', () => {
      const q = query([1, 3, 4, 2, 2]);
      const q1 = q.values();
      chai.expect(q1).to.not.be.equal(q);
      chai.expect(q1.toArray()).to.be.deep.equal(q.toArray());
    });
  });
});