/**
 * 牛客网输入输出
 */
while (line = readline()) {
  var lines = line.split(' ');
  var a = parseInt(lines[0]);
  var b = parseInt(lines[1]);
  print(a + b);
}


// 多行输入
var n = parseInt(readline());
var ans = 0;
for (var i = 0; i < n; i++) {
  lines = readline().split(" ")
  for (var j = 0; j < lines.length; j++) {
    ans += parseInt(lines[j]);
  }
}
print(ans);
print(n)

// 1.关键词问题
// 得到单词数
var word_count
word_count = +readline()
// 得到所有单词
var words = {}
for (var i = 0; i < word_count; i++) {
  var word = readline().toString()
  if (!words[word]) {
    words[word] = 1
  } else {
    words[word] += 1
  }
}
var keyword_count = 0
for (var word in words) {
  if (words[word] > Math.floor(word_count / 100)) {
    keyword_count++
  }
}
print(keyword_count)


//2.模拟赛
// E EM M MH H
var question_count = 0
// E M H
var emh_count = [0, 0, 0]
while (line = readline()) {
  var lines = line.split(' ');
  while (lines[0] && lines[2] && lines[4]) {
    question_count++
    lines[0] -= 1
    lines[2] -= 1
    lines[4] -= 1
  }
  while (lines[0] && lines[2] && !lines[4] && lines[3]) {
    question_count++
    lines[0] -= 1
    lines[2] -= 1
    lines[3] -= 1
  }
  while (!lines[0] && lines[2] && lines[4] && lines[1]) {
    question_count++
    lines[1] -= 1
    lines[2] -= 1
    lines[4] -= 1
  }
  while (lines[0] && !lines[2] && lines[4] && lines[1]) {
    question_count++
    lines[0] -= 1
    lines[1] -= 1
    lines[4] -= 1
  }
  while (lines[0] && !lines[2] && lines[4] && lines[3]) {
    question_count++
    lines[0] -= 1
    lines[3] -= 1
    lines[4] -= 1
  }
}

// emh_count[0] += +lines[0]
// emh_count[0] += +lines[1]
// emh_count[1] += +lines[1]
// emh_count[1] += +lines[2]
// emh_count[1] += +lines[3]
// emh_count[0] += +lines[3]
// emh_count[0] += +lines[4]

// 3.铺瓷砖
var n = parseInt(readline());
var ans = 0;
for (var i = 0; i < n; i++) {
  var n = +readline()
  if (n = 1) {
    print(1)
  }
  else if (n = 2) {
    print(2)
  }
  else if (n = 3) {
    print(4)
  }
  else {
    var count = 0
    while (n > 3) {
      n -= 3
      count++
    }
    if (n = 1) {
      print(count + 1)
    }
    else if (n = 2) {
      print(count + 2)
    }
    else if (n = 3) {
      print(count + 4)
    }
  }
}

/**
 * 
 * @param {Array} arr 数组
 * @param {Number} num 几等分
 */
function three (arr, num) {
  let count = 0
  for (let i = 0; i < arr.length; i += num) {
    count++
  }
  let result = []
  for (let i = 0; i < num; i++) {
    result.push(count * i + '-' + count * (i + 1))
  }
  return result
}


