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

function Delegate(){}
Delegate.prototype.testMethod = function(){
  return this.testProperty;
};

function runTest(implementation,len){
  var start = process.hrtime();
  var Constructor = createDelegator(implementation);
  for(var value = 0; value < len; value++){
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
  var end = process.hrtime();
  var time = (end[0]-start[0])*1000000000 + (end[1] -start[1]);

  return time;
}

function runFor(len){
  console.log('looping %d times', len);
  var t2 = runTest(require('./'), len);
  var t1 = runTest(require('delegates'), len);

  console.log('\tnew version executed in %d nanoseconds (%d% faster)',  t2, (Math.round(((t1-t2)/t1)*10000)/100));
  console.log('\told version executed in %d nanoseconds (%d% slower)\n',  t1, (Math.round(((t1-t2)/t2)*10000)/100));
}

runFor(1);
runFor(100);
runFor(1000);
runFor(1500);
runFor(2000);
runFor(5000);
runFor(10000);
runFor(100000);
runFor(1000000);
runFor(10000000);