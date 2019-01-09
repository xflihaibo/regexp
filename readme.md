# 正则表达式

<div align=center>
<img src="./Image/logo.png" width="160px" align="center"  />
</div>

一个简单灵活的正则表达式生成库,欢迎 👏👏fork

## 参数

### strictStart

> 设置开头校验 (不能和全局查找 isglobal 同用)
> 类型：boolean
> 默认：false

### strictEnding

> 设置持续到结尾匹配 (不能和全局查找 isglobal 同用)
> 类型：boolean
> 默认：false

### isglobal

> 设置全局查找
> 类型：boolean
> 默认：false

> 注：正则表达式对象具有修饰符 g 时，它将把当前正则表达式对象的 lastIndex 属性设置为紧挨着匹配子串的字符位置，当同一个正则表达式第二次调用时，它会将从 lastIndex 属性所指示的字符串处开始检索，如果没有发现任何匹配结果，它会将 lastIndex 重置为 0。

### isignore

> 设置是否区分大小
> 类型：boolean
> 默认：false

### children

> 设置匹配参数条件
> 类型：array
> 必填：true

## 子级

### number

> 设置数字
> 类型：boolean
> 默认：false

### capitalCode

> 设置小写字母
> 类型：boolean
> 默认：false

### lowercaseCode

> 设置大写字母
> 类型：boolean
> 默认：false

### matchingChinese

> 设置中文
> 类型：boolean
> 默认：false

### customCharacter

> 设置自定义匹配参数

> 类型：array
> 默认：空

> 注：() 括号中的内容可以单独成为一个整体；括号中的内容可以进行分组，单独匹配如果不需要(?:)。[] 方括号中的单独匹配，不可分组，传参的长度大于等于 2 并且非特殊符号（如：‘//n’）匹配用（）单个字符用[]

> 注：水平制表符（\t），垂直制表符（\v），换行符（\n），回车符（\r），换页符（\f）仅对单个字符有效，**new RegExp 的时候\w ，\\.这样的要用两个反斜杠，即\\w, \\. 因为字符串里反斜杠是转义字符，\w 会变成 w。因此传时必须双反斜杠即['\\\\w', '\\\\.'] 方可匹配字符**

### singleMatch

> 设置 是否需要单独匹配(自定义的值有多个字符有效)
> 类型：boolean
> 默认: false

### isReversal

> 设置匹配值取反
> 类型：boolean
> 默认：false

### qualifier

> 限定符 （指定出现数量的代码）
> 类型： objecct | string (?、+、 \*)
> 默认：空

```javascript
    qualifier:{
        minCount:0,
        maxCount:7
    }
```

### minCount

> 设置最小出现次数
> 类型：number
> 默认：0

### maxCount

> 设置最大出现次数
> 类型：number
> 默认：空

### greedyLazy

> 是否是懒惰模式， 默认是贪婪模式
> 类型：boolean
> 默认：false

## 用法

```javascript
let obj = {
    strictStart: true,
    strictEnding: true,
    children: [
        {
            customCharacter: [1]
        },
        {
            customCharacter: [3, 5, 7, 8, 9]
        },
        {
            number: true,
            minCount: 9
        }
    ]
};
let regPhone = Calves.init(obj);
let testPhone = '13838624806';
console.log(regPhone.test(testPhone));
```

## 快捷方式

1.  Number:数字
2.  Chinese:中文
3.  IDCard: 身份证号
4.  Letter:字母
5.  LetterNumber: 字母数字
6.  LowerCaseEnglish:小写英文
7.  CapitalEnglish: 大写英文
8.  Phone:匹配手机号
9.  Email:Email，
10. Month: 月份
11. Days: 日

#### 快捷用法

```javascript
let quick = Calves.quick('Number');
let quickOk = '12';
let quickError = 'hello world';
console.log(quick);
console.log(quick.test(quickOk));
console.log(quick.test(quickError));
```

## fork 启动项目

#### 测试

```bush
//进入到项目中下载依赖
npm inatall or yarn install

测试项目
npm run test
```

#### 文件结构

```
+-- coverage // 生成测试覆盖率报告
+-- image // 静态资源图片
+-- node_modules
|   +-- ...依赖包
+-- script //文件
| +-- index.js
+-- test //项目测试用例
|   +-- index.test.js  //测试用例
+-- index.html //项目预览
+-- package.json //依赖
+-- README.md  //说明文档
+-- .babelrc   //babel 配置
```
