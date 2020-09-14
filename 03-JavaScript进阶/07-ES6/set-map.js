// 去重
let set6 = new Set([1, 2, 2, 3, 4, 3, 5])
console.log('distinct 1:', set6)
let arr1 = [1, 2, 3, 4]
let arr2 = [2, 3, 4, 5, 6]
let set7 = new Set([...arr1, ...arr2])
console.log('distinct 2:', set7)


// 1.向Set中添加元素
let set1 = new Set()
set1.add(1)
set1.add(2)
set1.add(3)
set1.add(3)
console.log('added:', set1)

// 2.从Set中删除元素
let set2 = new Set()
set2.add(1)
set2.add(2)
set2.add(3)
set2.delete(1)
console.log('deleted:', set2)


// 3.判断某元素是否存在
let set3 = new Set()
set3.add(1)
set3.add(2)
set3.add(3)
set3.delete(1)
console.log('has(1):', set3.has(1))
console.log('has(2):', set3.has(2))

// 4.set转数组
let set4 = new Set([4, 5, 6])
console.log('set to array 1:', [...set4])
console.log('set to array 2:', Array.from(set4))