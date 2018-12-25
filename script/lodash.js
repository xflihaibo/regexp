(function() {
  var root = (typeof self == 'object' && self.self === self && self) || (typeof global == 'object' && global.global === global && global) || this || {};
  // console.log(root);
  // Create a safe reference to the Underscore object for use below.
  var Reg = function(obj) {
    if (obj instanceof Reg) return obj;
    if (!(this instanceof Reg)) return new Reg(obj);
    this.Regwrapped = obj;
  };

  if (typeof exports != 'undefined' && !exports.nodeType) {
    if (typeof module != 'undefined' && !module.nodeType && module.exports) {
      exports = module.exports = Reg;
    }
    exports.Reg = Reg;
  } else {
    root.Reg = Reg;
  }

  // Current version.
  Reg.VERSION = '1.0.0';

  Reg.reg = '';
  Reg.character = {
    number: '0-9',
    capitalCode: 'a-z',
    lowercaseCode: 'A-Z',
    matchingChinese: '\u4E00-\u9FA5'
  };
  Reg.init = function(obj) {
    let initVariable = {
      strictStart: false,
      strictEnding: false,
      isglobal: false,
      isignore: false
    };
    Reg.reg = '';
    let newobj = Object.assign(initVariable, obj); //merge 数组
    if (newobj.isglobal && newobj.strictStart) {
      throw '1000  全局匹配和开头匹配不能同时使用';
      return false;
    }

    if (newobj.isglobal && newobj.strictEnding) {
      throw '1001 全局匹配和结尾匹配不能同时使用';
      return false;
    }

    Reg.matching(newobj);
    return Reg.reg;
  };

  //验证计算
  Reg.matching = function(prames) {
    Reg.reg += prames.strictStart ? '^' : '';
    if (prames.children.length < 1) {
      throw '1002 匹配参数不能为空！';
      return false;
    }
    //循环对子元素进行操作赋值
    prames.children.map(item => {
      if (JSON.stringify(item) === '{}') {
        throw '1003 存在空对象!'; // 如果为空,返回false
        return false;
      }

      let isBrackets =
        item.customCharacter &&
        item.customCharacter.some(item => {
          if (item.length >= 3) {
            return true;
          } else if (item.length >= 2 && item.slice(0, 1) !== '/') {
            return true;
          } else {
            return false;
          }
          //return item.length >= 2 && item.slice(0, 1) !== '/';
        });

      if (isBrackets) {
        Reg.reg += '(';
        Reg.reg += item.singleMatch ? '?:' : ''; //判断取反
      } else {
        Reg.reg += '[';
        Reg.reg += item.isReversal ? '^' : ''; //判断取反
      }

      item.number && Reg.constant('number');
      item.capitalCode && Reg.constant('capitalCode');
      item.lowercaseCode && Reg.constant('lowercaseCode');
      item.matchingChinese && Reg.constant('matchingChinese');
      //自定义字符
      item.customCharacter && item.customCharacter.length > 0 && Reg.custom(item.customCharacter, isBrackets);

      Reg.reg += isBrackets ? ')' : ']';

      Reg.matchingTimes(item);
    });

    Reg.reg += prames.strictEnding ? '$' : '';
    Reg.reg += prames.isglobal ? 'g' : '';
  };

  //定义的长量
  Reg.constant = function(count) {
    Reg.reg += Reg.character[count];
  };

  //自定义匹配规则操作
  Reg.custom = function(prames, bool) {
    Reg.reg += bool ? prames.join('|') : prames.join('');
  };
  //匹配次数
  Reg.matchingTimes = function(prames) {
    if ((prames.minCount && typeof prames.minCount == 'number') || (prames.maxCount && typeof prames.maxCount == 'number')) {
      Reg.reg += '{';
      Reg.reg += prames.minCount && typeof prames.minCount == 'number' ? prames.minCount + '' : '1';
      Reg.reg += prames.maxCount && typeof prames.maxCount == 'number' ? ',' + prames.maxCount + '}' : '}';
    }
  };
})();
