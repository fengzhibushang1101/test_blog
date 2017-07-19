"use strict";

var sum = function sum(a, b) {
    return a + b;
};
var square = function square(a) {
    return a * a;
};

var data = [1, 1, 3, 5, 5];
var mean = data.reduce(sum) / data.length;
var deviations = data.map(function (a) {
    return a - mean;
});
var stddev = Math.sqrt(deviations.map(square).reduce(sum)) / (data.length - 1);

console.log(mean);
console.log(stddev);
var not = function not(f) {
    return function () {
        return !f.apply(this, arguments);
    };
};
var even = function even(x) {
    return x % 2 === 0;
};
var odd = not(even);

console.log([1, 3, 5, 7, 9].every(odd));
var mapper = function mapper(f) {
    return function (a) {
        return a.map(f);
    };
};

var increment = function increment(x) {
    return x + 1;
};
var incrementer = mapper(increment);
console.log(incrementer([1, 2, 3, 4, 5]));
var compose = function compose(f, g) {
    return function () {
        return f.call(this, g.apply(this, arguments));
    };
};
var square = function square(x) {
    return x * x;
};
var sum = function sum(x, y) {
    return x + y;
};
//# sourceMappingURL=hanshushi.js.map