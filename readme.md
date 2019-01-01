# 正则表达式

<div align=center>
<img src="./Image/logo.png" width="160px" align="center"  />
</div>

一个简单灵活的正则表达式生成库

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
> 必填项

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

> 设置自定义匹配参数 (水平制表符（\t），垂直制表符（\v），换行符（\n），回车符（\r），换页符（\f）仅对单个字符有效，** new RegExp 的时候\w ，\.这样的要用两个反斜杠，即\\w, \\. 因为字符串里反斜杠是转义字符，\w 会变成 w。因此传时必须双反斜杠即['\\w', '\\.'] 方可匹配字符 **)
> （/[.](?:png|gif|jpe?g)/$）
> []: 1 括号中的内容可以单独成为一个整体，2，括号中的内容可以进行分组，单独匹配如果不需要(?:)
> 类型：array
> 默认：空

### singleMatch

> 设置 是否需要单独匹配(自定义的值有多个字符有效)
> 类型：boolean
> 默认: false

### isReversal

> 设置匹配值取反
> 类型：boolean
> 默认：false

### minCount

> 设置最小出现次数
> 类型：number
> 默认：空

### maxCount

> 设置最大出现次数
> 类型：number
> 默认：空

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
let regPhone = new Calves(Reg.init(obj));
let testPhone = '13838624806';
console.log(regPhone.test(testPhone));
```

## 快捷方式

Number:数字
Chinese:中文
IDCard: 身份证号
Letter:字母
LetterNumber: 字母数字
LowerCaseEnglish:小写英文
CapitalEnglish: 大写英文
Phone:匹配手机号
Email:Email，
Month: 月份
Days: 日

#### 快捷用法

```javascript
let quick = Calves.quick('Number');
let quickOk = '12';
let quickError = 'hello world';
console.log(quick);
console.log(quick.test(quickOk));
console.log(quick.test(quickError));
```
