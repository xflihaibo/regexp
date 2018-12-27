import Calves from '../script/index.js';
describe('测试纯数字', function() {
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
        expect(regPhone.test(testPhone)).toBe(true);
        expect(regPhone.test(errorPhone)).toBe(false);
        expect(regPhone.test(errorPhone2)).toBe(false);
    });
});

describe('测试匹配图片', function() {
    test('匹配图片', () => {
        let objImg = {
            strictEnding: true,
            children: [
                {
                    customCharacter: ['/.']
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
        expect(regImg.test(testImg1)).toBe(true);
        expect(regImg.test(errorImg)).toBe(false);
    });
});

describe('测试快捷方式', function() {
    test('快捷方式 数字', () => {
        let quick = Calves.quick('Number');
        let quickOk = '12';
        let quickError = 'hello world';
        expect(quick.test(quickOk)).toBe(true);
        expect(quick.test(quickError)).toBe(false);
    });

    test('快捷方式 中文', () => {
        let quick = Calves.quick('Chinese');
        let quickOk = '你好';
        let quickError = 'hello world';
        expect(quick.test(quickOk)).toBe(true);
        expect(quick.test(quickError)).toBe(false);
    });

    test('快捷方式 月份', () => {
        let quick = Calves.quick('Month');
        let quickOk = '10';
        let quickError = '13';
        expect(quick.test(quickOk)).toBe(true);
        expect(quick.test(quickError)).toBe(false);
    });
});
