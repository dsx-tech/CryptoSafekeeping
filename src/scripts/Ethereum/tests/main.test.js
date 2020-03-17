const sendToken = require('./ERC-20-test')

let nonce = 60;
let nonce2 = 13;
let txNum = 9;

test('single sig token: ', () => {
    expect(sendToken.sendToken(nonce));
});

test('multi sig token: ', () => {
    expect(sendToken.sendTokenMulti(nonce, nonce2, txNum));
});