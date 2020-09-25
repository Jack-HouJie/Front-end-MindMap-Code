// 命名导出
// module "my-module.js"
function cube (x) {
  return x * x * x;
}
const foo = Math.PI + Math.SQRT2;
var graph = {
  options: {
    color: 'white',
    thickness: '2px'
  },
  draw: function () {
    console.log('From graph draw function');
  }
}
export { cube, foo, graph };

// 在html中应使用带有module类型的script。
// 示例:
//   <script type="module" src="./demo.js"></script>
//
// 在http服务器上访问，否则将会有一个CORS保护报错。
//
// script demo.js

import { cube, foo, graph } from 'my-module.js';
graph.options = {
  color: 'blue',
  thickness: '3px'
};
graph.draw();
console.log(cube(3)); // 27
console.log(foo);    // 4.555806215962888



// 默认导出
// module "my-module.js"
export default function cube(x) {
  return x * x * x;
}

// module "my-module.js"
import cube from 'my-module.js';
console.log(cube(3)); // 27​​​​​

