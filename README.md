const createPromise = require('./promiser');

// How to create promises from functions.
const fs = require('fs');

createPromise(fs.readFile)('test.js', 'utf8').
  then(() => console.log('SUCCESSFUL SUCCESS')).
  catch(() => console.log('this should not happen'));

// How to create promise from methods.
class TestClass {
  constructor(str) {
    console.log('Creating testClass');
    this.str = str;
  }
  a(errFirstCallBack) {
    errFirstCallBack(null, this.str);
  }
}

const testClass = new TestClass('hello world');

// Remember to pass context to createPromise
createPromise(testClass.a, testClass)().
  then(console.log).
  catch(console.error);
