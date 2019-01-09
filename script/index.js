(function() {
    var root = (typeof self == 'object' && self.self === self && self) || (typeof global == 'object' && global.global === global && global) || this || {};
    var Calves = function(obj) {
        if (obj instanceof Calves) return obj;
        if (!(this instanceof Calves)) return new Calves(obj);
        this.Calveswrapped = obj;
    };
    if (typeof exports != 'undefined' && !exports.nodeType) {
        if (typeof module != 'undefined' && !module.nodeType && module.exports) {
            exports = module.exports = Calves;
        }
        exports.Calves = Calves;
    } else {
        root.Calves = Calves;
    }

    // Calves version.
    Calves.VERSION = '1.0.0';
    Calves.reg = '';
    var character = {
        number: '\\d',
        capitalCode: 'a-z',
        lowercaseCode: 'A-Z',
        matchingChinese: '\u4E00-\u9FA5'
    };
    // 简便方式
    Calves.quick = function(obj) {
        let quickUser = {
            Number: `^[0-9]*$`, //数字
            Chinese: `^[\u4e00-\u9fa5]*$`, //中文
            IDCard: `^\\d{8,18}|[0-9x]{8,18}|[0-9X]{8,18}?$`, //身份证号
            Letter: `^[A-Za-z]+$ `, //字母
            LetterNumber: `^[A-Za-z0-9]+$`, //字母数字
            LowerCaseEnglish: `^[a-z]+$`, //小写英文
            CapitalEnglish: `^[A-Z]+$`, //大写英文
            Phone: `^1[35789]\\d{9}$`, // :匹配手机号
            Email: `^\\w+([-+.]\\w+)*@\\w+([-.]\\w+)*\\.\\w+([-.]\\w+)*$`, //Email，
            Month: `^(0?[1-9]|1[0-2])$`, //月份
            Days: '^((0?\\d)|((1|2)\\d)|30|31)$' //日
        };

        if (!quickUser[obj]) {
            throw Error('1004   正则匹配不存在！');
        } else {
            return new RegExp(quickUser[obj]);
        }
    };

    // init 初始化数据
    Calves.init = function(obj) {
        let initVariable = {
            strictStart: false,
            strictEnding: false,
            isglobal: false,
            isignore: false
        };
        Calves.reg = '';
        let newobj = Object.assign(initVariable, obj); //merge object
        if (newobj.isglobal && newobj.strictStart) {
            throw Error('1000 全局匹配和开头匹配不能同时使用');
        }
        if (newobj.isglobal && newobj.strictEnding) {
            throw Error('1001 全局匹配和结尾匹配不能同时使用');
        }
        matching(newobj);
        return resultValue(newobj);
    };

    //验证计算
    var matching = function(prames) {
        Calves.reg += prames.strictStart ? '^' : '';
        if (prames.children.length < 1) {
            throw Error('1002 匹配参数不能为空！');
        }
        //循环对子元素进行操作赋值
        prames.children.map(item => {
            if (JSON.stringify(item) === '{}') {
                throw Error('1003 存在空对象!'); // 如果为空,返回false
            }

            let codeNumber =
                (!item.number ? 0 : 1) +
                (!item.capitalCode ? 0 : 2) +
                (!item.lowercaseCode ? 0 : 2) +
                (!item.matchingChinese ? 0 : 2) +
                (!item.customCharacter ? 0 : item.customCharacter.length); //获取长度判读是否需要用()或{}

            let isBrackets = false, // 获取数值 判断使用 ()：[]
                codebool = false;
            if (codeNumber > 1) {
                codebool = true;
                let items = item.customCharacter;
                if (items) {
                    for (let i = 0; i < items.length; i++) {
                        if (items[i].length >= 2 && items[i].slice(0, 2) !== '\\') {
                            isBrackets = true;
                        }
                    }
                }

                if (isBrackets) {
                    Calves.reg += item.singleMatch ? '(?:' : '('; //是否需要单独匹配
                } else {
                    Calves.reg += item.isReversal ? '[^' : '['; //判断是否取反
                }
            }

            item.number && constant('number');
            item.capitalCode && constant('capitalCode');
            item.lowercaseCode && constant('lowercaseCode');
            item.matchingChinese && constant('matchingChinese');
            //自定义字符
            item.customCharacter && item.customCharacter.length > 0 && custom(item.customCharacter, isBrackets);

            Calves.reg += codebool ? (isBrackets ? ')' : ']') : '';
            matchingTimes(item);
        });
        Calves.reg += prames.strictEnding ? '$' : '';
    };

    //定义的常量 character[number]
    var constant = function(count) {
        Calves.reg += character[count];
    };

    //自定义匹配规则操作(a|b|c)
    var custom = function(prames, bool) {
        Calves.reg += bool ? prames.join('|') : prames.join('');
    };

    //匹配次数{min,max}
    var matchingTimes = function(prames) {
        if ((prames.minCount && typeof prames.minCount == 'number') || (prames.maxCount && typeof prames.maxCount == 'number')) {
            Calves.reg += '{';
            Calves.reg += prames.minCount && typeof prames.minCount == 'number' ? prames.minCount + '' : '0';
            Calves.reg += prames.maxCount && typeof prames.maxCount == 'number' ? ',' + prames.maxCount + '}' : '}';
        }
        Calves.reg += prames.greedyLazy ? '?' : ''; //匹配贪婪或懒惰模式
    };

    //返回值结果
    var resultValue = function(prames) {
        if (prames.isglobal || prames.isignore) {
            let pra = prames.isignore ? 'i' : '' + prames.isglobal ? 'g' : ''; //是否匹配大小写 是否全局匹配
            return new RegExp(Calves.reg, pra);
        } else {
            return new RegExp(Calves.reg);
        }
    };
})();
