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
    .fluent('fluentProp');

  return Constructor;
}

var D1 = createDelegator(v1);
var D2 = createDelegator(v2);

function Delegate(){}
Delegate.prototype.testMethod = function(){
  return this.testProperty;
};

function runTest(delegator){
  var start = Date.now();
  for(var value = 0; value < 1000000; value++){
    delegator.testProperty = value;
    delegator.testProperty.should.equal(value);
    delegator.testMethod().should.equal(value);
    delegator.fluentProp(value);
    delegator.fluentProp().should.equal(value);
  }
  var time = Date.now() - start;

  console.log('time was: ' + time);

  return time;
}

var d1 = new D1(new Delegate());
var d2 = new D2(new Delegate());

var t2 = runTest(d2);
var t1 = runTest(d1);

console.log('new version ' + (Math.round(((t1-t2)/t2)*10000)/100) + '% faster');
