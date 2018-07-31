// apply
Function.prototype.myApply = function (context, arr) {
  //传入值为null的时候指向window
  var context = context ? context : window 
  context.fn = this
  //有可能会有返回值
  var result
  if (!arr) {
    result = context.fn()
  } else {
    var args = []
    for(var i = 0, len = arr.length; i < len; i++) {
      args.push('arr[' + i + ']')
    }
    //eval里的args自动调用数组的toString方法
    result = eval('context.fn(' + args + ')')
  }
  //执行完毕后删除fn属性
  delete context.fn
  return result
}
//call
Function.prototype.myCall = function (context) {
  var context  = context ? context : window
  context.fn = this
  var result, len = arguments.length, args = []
  if (!len) {
   result =  context.fn()
  } else {
    //arguments[0] = context,所以从索引为1的地方开始
    for (var i = 1; i < len; i++) {
      args.push('arguments[' + i + ']')
    }
    result  = eval('context.fn(' + args + ')')
  }
  delete context.fn
  return result
}
// // for fn1.call.call(fn2)
// Function.prototype.myCall = function (context) {
//   context.fn = this
//   context.fn()
// }
fn1.call .call(f2)
f2.fn = this //this = fn1.call Function.prototype.call
f2.fn() // f2.fn1.call() f2 Function.prototype.call()
fn1.call.call.call.call(f2)
f2.fn = this //this = fn1.call.call Function.prototype.call.call
f2.fn() // f2.fn1.call.call() f2 Function.prototype.call.call()
// 原型链很重要，这几天在学习，自己的想法。

// 前提，通过原型链得知，call 是一个内部定义的 Function 对象。
// f1.call 和 f2.call 都为 Function.prototype.call，
// f1.call === f2.call
// f1.call === Function.prototype.call

// 执行f1.call.call(f2)，相当于执行了f2调用f1.call，
// 即f2调用Function.prototype.call（），相当于f2调用自己得call函数,即f2.call()。
// 由于f2.call()传入了空，this为全局global，最后执行为windows.f2()
function fn1 (name, age) {
  this.name = name
  this.age = age
  console.log(this.name)
  console.log(this.sex)
}
obj = {name: 'wujie', age: 18, sex: 'man'}
fn1.myApply(obj, ['wj'])
fn1.myCall(obj, 'mycall')

// 返回一个函数
// 可以传入参数
Function.prototype.myBind = function (context) {
  var context  = context ? context : window, args = [], copyArgument = arguments, result
  context.fn = this
  for(var i = 1, len = arguments.length;i < len;i++) {
    args.push('copyArgument[' + i + ']')
  }
  return function () {
    for(var i = 0, len = arguments.length;i < len;i++) {
      args.push('arguments[' + i + ']')
    }
    return result = eval('context.fn('+ args + ')')
  }
}
//通过apply实现
Function.prototype.myBindByApply = function (context) {
  var self = this, args = []
  args = Array.prototype.slice.call(arguments, 1)
  return function () {
    var bindArgs = Array.prototype.slice.call(arguments)
    return result =  self.apply(context, args.concat(bindArgs))
  }
}
function fn11 (namea) {
  console.log(this.weight)
  console.log(namea)
}
obj11 = {weight: 128}
fnBind = fn11.myBindByApply(obj11)
fnBind('8282828')