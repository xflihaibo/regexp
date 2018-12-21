# 正则表达式

> 一个简单灵活的正则表达式生成库

## 参数

### strictStart

> 设置开始校验 (不能和全局查找 isglobal 同用)
> 类型：boolean
> 默认：false

### strictEnding

> 设置结尾校验 (不能和全局查找 isglobal 同用)
> 类型：boolean
> 默认：false

### isglobal

> 设置全局查找
> 类型：boolean
> 默认：false

### isignore

> 设置是否区分大小
> 类型：boolean
> 默认：false

### children

> 设置匹配参数条件
> 类型：array
> 默认：null

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

> 设置自定义匹配参数 (水平制表符（\t），垂直制表符（\v），换行符（\n），回车符（\r），换页符（\f）)
> 类型：array
> 默认：空

### isReversal

> 设置取反
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
            customCharacter: [35789]
        },
        {
            number: true,
            minCount: 9
        }
    ]
};
let regPhone = new RegExp(Reg.init(obj));
let testPhone = '13838624806';
console.log(regPhone.test(testPhone));
```
