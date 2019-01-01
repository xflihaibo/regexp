import Calves from '../script/index.js';
describe('测试 init() 方法', function() {
    test('验证数字', () => {
        let num = {
            strictStart: true,
            strictEnding: true,
            children: [
                {
                    number: true
                }
            ]
        };
        let regNum = Calves.init(num);
        let testNum = '1';
        let errorNum = 'A';
        expect(regNum.test(testNum)).toBe(true);
        expect(regNum.test(errorNum)).toBe(false);
        expect(regNum.test('4')).toBe(true);
    });

    test('验证全局匹配', function() {
        let codeglobel = {
            isglobal: true,
            children: [
                {
                    customCharacter: ['a']
                }
            ]
        };
        let regcodeglobel = Calves.init(codeglobel);
        let codeglobelok = '1212a';
        let codeglobelerror = '1212';
        expect(regcodeglobel.test(codeglobelok)).toBe(true);
        expect(regcodeglobel.test(codeglobelerror)).toBe(false);
        expect(regcodeglobel.test('12a12')).toBe(true);
    });

    test('全局验证大小写字母', function() {
        let codeall = {
            isignore: true,
            isglobal: true,
            children: [
                {
                    customCharacter: ['a']
                }
            ]
        };
        let regcodeall = Calves.init(codeall);
        let codeallok = '122a';
        let codeallerror = '234F4';
        expect(regcodeall.test(codeallok)).toBe(true);
        expect(regcodeall.test(codeallerror)).toBe(false);
        expect(regcodeall.test('122A')).toBe(true);
    });

    test('验证全局匹配大小写', function() {
        let codeignore = {
            isignore: true,
            children: [
                {
                    customCharacter: ['a']
                }
            ]
        };
        let regcodeignore = Calves.init(codeignore);
        let codeignoreok = 'a';
        let codeignoreok2 = 'A';
        expect(regcodeignore.test(codeignoreok)).toBe(true);
        expect(regcodeignore.test(codeignoreok2)).toBe(true);
        expect(regcodeignore.test('B')).toBe(false);
        expect(regcodeignore.test('b')).toBe(false);
    });
});

describe('测试手机号码', function() {
    test('验证手机号', () => {
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
        let regPhone = Calves.init(obj);
        let testPhone = '13838624806';
        let errorPhone = '23838624806';
        let errorPhone2 = '12838624806';
        let testPhone2 = '15878457896';
        expect(regPhone.test(testPhone)).toBe(true);
        expect(regPhone.test(errorPhone)).toBe(false);
        expect(regPhone.test(errorPhone2)).toBe(false);
        expect(regPhone.test(testPhone2)).toBe(true);
    });
});

describe('测试匹配图片', function() {
    test('匹配图片', () => {
        let objImg = {
            strictEnding: true,
            children: [
                {
                    customCharacter: ['.']
                },
                {
                    customCharacter: ['png', 'gif', 'jpe?g']
                }
            ]
        };

        let regImg = Calves.init(objImg);
        let testImg = '.png';
        let testImg1 = '.jpg';
        let errorImg = '.pnng';
        expect(regImg.test(testImg)).toBe(true);
        expect(regImg.test(errorImg)).toBe(false);
        expect(regImg.test(testImg1)).toBe(true);
    });
});

describe('测试init()中文', function() {
    test('测试中文', () => {
        let objChinese = {
            children: [
                {
                    matchingChinese: true,
                    minCount: 1,
                    maxCount: 4
                }
            ]
        };
        let regChinese = Calves.init(objChinese);
        let testChinese = '中文';
        let testChinese1 = '匹配中文';
        let errorChinese = 'hello world';
        expect(regChinese.test(testChinese)).toBe(true);
        expect(regChinese.test(errorChinese)).toBe(false);
        expect(regChinese.test(testChinese1)).toBe(true);
    });
});

// describe('测试init()错误', function() {
//     test('错误catch', () => {
//         let objChinese = {
//             strictStart: true,
//             strictEnding: true,
//             isglobal: true,
//             children: [{}]
//         };
//         let regChinese = Calves.init(objChinese);
//         expect(regChinese).toThrow('1000 全局匹配和开头匹配不能同时使用');
//     });
// });

describe('测试特定的字符', function() {
    test('特定字符', () => {
        let objspec = {
            strictEnding: true,
            strictStart: true,
            children: [
                {
                    number: true,
                    customCharacter: ['a', 'b', 'c'],
                    minCount: 2,
                    maxCount: 4
                }
            ]
        };
        let regobjspec = Calves.init(objspec);
        expect(regobjspec.test('1122')).toBe(true);
        expect(regobjspec.test('1A31a')).toBe(false);
        expect(regobjspec.test('1a1a')).toBe(true);
    });
});

describe('测试快捷方式', function() {
    test('快捷方式 数字', () => {
        let quick = Calves.quick('Number');
        let quickOk = '12';
        let quickError = 'hello world';
        expect(quick.test(quickOk)).toBe(true);
        expect(quick.test(quickError)).toBe(false);
        expect(quick.test('10001')).toBe(true);
    });

    test('快捷方式 中文', () => {
        let quick = Calves.quick('Chinese');
        let quickOk = '你好';
        let quickError = 'hello world';
        expect(quick.test(quickOk)).toBe(true);
        expect(quick.test(quickError)).toBe(false);
        expect(quick.test('世界')).toBe(true);
    });

    test('快捷方式 月份', () => {
        let quick = Calves.quick('Month');
        let quickOk = '10';
        let quickError = '13';
        expect(quick.test(quickOk)).toBe(true);
        expect(quick.test(quickError)).toBe(false);
        expect(quick.test('5')).toBe(true);
    });
    test('验证手机号', () => {
        let quickPhone = Calves.quick('Phone');
        let testPhone = '13838624801';
        let errorPhone = '23838624806';
        let errorPhone2 = '12838624806';
        let testPhone2 = '15878457896';
        expect(quickPhone.test(testPhone)).toBe(true);
        expect(quickPhone.test(errorPhone)).toBe(false);
        expect(quickPhone.test(errorPhone2)).toBe(false);
        expect(quickPhone.test(testPhone2)).toBe(true);
    });
    test('验证身份证号', () => {
        let quickPhone = Calves.quick('IDCard');
        let testIDCard = '412727199512032221';
        let errorIDCard = 'AS';
        expect(quickPhone.test(testIDCard)).toBe(true);
        expect(quickPhone.test(errorIDCard)).toBe(false);
    });
    test('验证 字母数字大小写', () => {
        let quickLetter = Calves.quick('LetterNumber');
        let testIDCard = '41';
        let errorIDCard = 'AS';
        expect(quickLetter.test(quickLetter)).toBe(false);
        expect(quickLetter.test(quickLetter)).toBe(false);
        expect(quickLetter.test('@#$%^&*')).toBe(false);
    });
    test('验证 字母数字大写', () => {
        let quickLetter = Calves.quick('CapitalEnglish');
        let testIDCard = 'AS';
        let errorIDCard = 'as';
        expect(quickLetter.test(quickLetter)).toBe(false);
        expect(quickLetter.test(quickLetter)).toBe(false);
        expect(quickLetter.test('@#$%^&*')).toBe(false);
    });
    test('验证 字母数字小写', () => {
        let quickLetter = Calves.quick('LowerCaseEnglish');
        let testIDCard = 'as';
        let errorIDCard = 'AS';
        expect(quickLetter.test(quickLetter)).toBe(false);
        expect(quickLetter.test(quickLetter)).toBe(false);
        expect(quickLetter.test('@#$%^&*')).toBe(false);
    });
});

describe('测试版本信息', function() {
    test('验证 测试版本信息', () => {
        expect(Calves.VERSION).toBe('1.0.0');
    });
});
