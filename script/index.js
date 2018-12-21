export default {
    reg: '',
    init(obj) {
        let initVariable = {
            strictStart: false,
            strictEnding: false,
            isglobal: false,
            isignore: false
        };
        this.reg = '';
        let newobj = Object.assign(initVariable, obj); //merge 数组
        if (newobj.isglobal && newobj.strictStart) {
            throw '1000  全局匹配和开头匹配不能同时使用';
            return false;
        }

        if (newobj.isglobal && newobj.strictEnding) {
            throw '1001 全局匹配和结尾匹配不能同时使用';
            return false;
        }

        this.matching(newobj);
        return this.reg;
    },

    //验证计算
    matching(prames) {
        this.reg += prames.strictStart ? '^' : '';
        if (prames.children.length < 1) {
            throw '1002 匹配参数不能为空！';
            return false;
        }
        prames.children.map(item => {
            if (JSON.stringify(item) === '{}') {
                throw '1003 存在空对象!'; // 如果为空,返回false
                return false;
            }

            this.reg += '[';
            this.reg += item.isReversal ? '^' : ''; //判断取反

            item.number && this.constant('number');
            item.capitalCode && this.constant('capitalCode');
            item.lowercaseCode && this.constant('lowercaseCode');
            item.matchingChinese && this.constant('matchingChinese');
            //自定义字符
            item.customCharacter && item.customCharacter.length > 0 && this.custom(item.customCharacter);
            this.reg += ']';
            this.matchingTimes(item);
        });

        this.reg += prames.strictEnding ? '$' : '';
        this.reg += prames.isglobal ? 'g' : '';
    },

    //定义的长量
    constant(count) {
        let obj = {
            number: '0-9',
            capitalCode: 'a-z',
            lowercaseCode: 'A-Z',
            matchingChinese: '\u4E00-\u9FA5'
        };
        this.reg += obj[count];
    },

    //自定义匹配规则操作
    custom(prames) {
        prames.map(item => {
            this.reg += item;
        });
    },
    //匹配次数
    matchingTimes(prames) {
        if ((prames.minCount && typeof prames.minCount == 'number') || (prames.maxCount && typeof prames.maxCount == 'number')) {
            this.reg += '{';
            this.reg += prames.minCount && typeof prames.minCount == 'number' ? prames.minCount + '' : '1';
            this.reg += prames.maxCount && typeof prames.maxCount == 'number' ? ',' + prames.maxCount + '}' : '}';
        }
    }
};
