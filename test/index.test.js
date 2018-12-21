import Reg from '../script/index.js';
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
        let regNum = new RegExp(Reg.init(num));
        let testNum = '1';
        let errorNum = 'A';
        console.log(regNum);
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
        let regPhone = new RegExp(Reg.init(obj));
        let testPhone = '13838624806';
        let errorPhone = '23838624806';
        let errorPhone2 = '12838624806';
        expect(regPhone.test(testPhone)).toBe(true);
        expect(regPhone.test(errorPhone)).toBe(false);
        expect(regPhone.test(errorPhone2)).toBe(false);
    });
});
