
 var sum = (a,b)=>{return a+b};
 var square = a=>a*a;

 var data = [1, 1, 3, 5, 5];
 var mean = data.reduce(sum)/data.length;
 var deviations = data.map(a=>a-mean);
 var stddev = Math.sqrt(deviations.map(square).reduce(sum))/(data.length-1);

 console.log(mean);
 console.log(stddev);
 var not = function(f){
     return function(){
         return !f.apply(this, arguments)
     }
 };
 var even = function (x){
     return x%2 === 0
 };
 var odd = not(even);

 console.log([1, 3, 5, 7, 9].every(odd));
 var mapper = function (f) {
     return function(a){
         return a.map(f);
     }
 };

 var increment = function(x) { return x+1; };
 var incrementer = mapper(increment);
 console.log(incrementer([1,2,3,4,5]));
 var compose = function (f, g){
     return function(){
         return f.call(this, g.apply(this, arguments))
     }
 };
 var square = function(x){
     return x*x;
 };
 var sum = function(x, y) {
     return x+y;
 };

