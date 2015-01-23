var v1 = require('delegates');
var v2 = require('./');
require('should');

function createDelegator(v){
  function Constructor(delegate){
    this.delegate = delegate;
  }

  v(Constructor.prototype,'delegate')
    .method('testMethod')
    .access('testProperty')
    .access('a')
    .access('b')
    .access('c')
    .access('d')
    .access('e')
    .access('f')
    .access('g')
    .access('h')
    .access('i')
    .access('j')
    .access('k')
    .access('l')
    .fluent('fluentProp');

  return Constructor;
}

var D1 = createDelegator(v1);
var D2 = createDelegator(v2);

function Delegate(){}
Delegate.prototype.testMethod = function(){
  return this.testProperty;
};

function runTest(Constructor){
  var start = Date.now();
  for(var value = 0; value < 1000000; value++){
    var delegator = new Constructor(new Delegate());
    delegator.testProperty = value;
    delegator.a = delegator.b = delegator.c = delegator.d = value;
    delegator.e = delegator.f = delegator.g = delegator.h = value;
    delegator.i = delegator.j = delegator.k = delegator.l = value;
    delegator.a.should.equal(value);
    delegator.b.should.equal(value);
    delegator.c.should.equal(value);
    delegator.d.should.equal(value);
    delegator.e.should.equal(value);
    delegator.f.should.equal(value);
    delegator.g.should.equal(value);
    delegator.h.should.equal(value);
    delegator.i.should.equal(value);
    delegator.j.should.equal(value);
    delegator.k.should.equal(value);
    delegator.l.should.equal(value);
    delegator.testProperty.should.equal(value);
    delegator.testMethod().should.equal(value);
    delegator.fluentProp(value);
    delegator.fluentProp().should.equal(value);
  }
  var time = Date.now() - start;

  console.log('time was: ' + time);

  return time;
}

var t2 = runTest(D2);
var t1 = runTest(D1);

console.log('new version ' + (Math.round(((t1-t2)/t2)*10000)/100) + '% faster');
