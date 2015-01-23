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
  for(var value = 0; value < 10000000; value++){
    var delegator = new Constructor(new Delegate());
    delegator.testProperty = value;
    delegator.a = delegator.b = delegator.c = delegator.d = value;
    delegator.e = delegator.f = delegator.g = delegator.h = value;
    delegator.i = delegator.j = delegator.k = delegator.l = value;
    delegator.fluentProp(value);
    if(
        delegator.a !== value ||
        delegator.b !== value ||
        delegator.c !== value ||
        delegator.d !== value ||
        delegator.e !== value ||
        delegator.f !== value ||
        delegator.g !== value ||
        delegator.h !== value ||
        delegator.i !== value ||
        delegator.j !== value ||
        delegator.k !== value ||
        delegator.l !== value ||
        delegator.testProperty !== value ||
        delegator.testMethod() !== value ||
        delegator.fluentProp() !== value
    ){
      throw new Error('did not work for value: ' + value);
    }
  }
  var time = Date.now() - start;

  console.log('time was: ' + time);

  return time;
}

var t2 = runTest(D2);
var t1 = runTest(D1);

console.log('new version ' + (Math.round(((t1-t2)/t1)*10000)/100) + '% faster');
console.log('old version ' + (Math.round(((t1-t2)/t2)*10000)/100) + '% slower');
