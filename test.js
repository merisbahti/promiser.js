const createPromise = require('./promiser.js');

// How to create promises from functions.
const fs = require('fs');

createPromise(fs.readFile)('test.js', 'utf8').
  then(() => console.log('SUCCESSFUL SUCCESS (function)')).
  catch(() => { throw new Error('FAILED SUCCESS (function)');});

createPromise(fs.readFile)('non-existent-file', 'utf8').
  then(() => { throw new Error('FAILED FAILURE (function)');}).
  catch(() => console.log('SUCCESSFUL FAILURE (function)'));

// How to create promise from methods.
class TestClass {
  constructor(successStr, failStr, success) {
    this.failStr = failStr;
    this.successStr = successStr;
    this.success = success;
  }
  a(errFirstCallBack) {
    if (this.success) {
      errFirstCallBack(null, this.successStr);
    } else {
      errFirstCallBack(this.failStr, null);
    }
  }
}

const testClassSuccess = new TestClass('SUCCESSFUL SUCCESS (method)', 'FAILED SUCCESS (method)', true);

// Remember to pass context to createPromise
createPromise(testClassSuccess.a, testClassSuccess)().
  then(console.log).
  catch(console.error);

const testClassFailure = new TestClass('FAILED FAILURE (method)', 'SUCCESSFUL FAILURE (method)', false);

createPromise(testClassFailure.a, testClassFailure)().
  then(console.log).
  catch(console.error);
