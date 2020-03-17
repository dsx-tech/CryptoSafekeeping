import { mount} from '@vue/test-utils'
import BitcoinPage  from '@/pages/BitcoinPage.vue'
let bitcoin = require('bitcoinjs-lib')
const wrapper = mount(BitcoinPage)
const j = bitcoin.ECPair.fromWIF('L2uPYXe17xSTqbCjZvL2DsyXPCbXspvcu5mHLDYUgzdUbZGSKrSr')

describe('BitcoinPage.vue', () => {
  it("Sign tratsacton test", () => {
         const defaultData = wrapper.vm.SignTransaction('7d067b4a697a09d2c3cff7d4d9506c9955e93bff41bf82d439da7d030382bc3e',
          '1KRMKfeZcmosxALVYESdPNez1AP1mEtywp', 0.8, 'fkdkdk')
        expect(defaultData).toEqual('02000000013ebc8203037dda39d482bf41ff3be955996c50d9d4f7cfc3d2097a694a7' +
        'b067d000000006b483045022100931b6db94aed25d5486884d83fc37160f37f3368c0' +
        'd7f48c757112abefec983802205fda64cff98c849577026eb2ce916a50ea70626a766' +
        '9f8596dd89b720a26b4d501210365db9da3f8a260078a7e8f8b708a1161468fb2323f' +
        'fda5ec16b261ec1056f455ffffffff0180380100000000001976a914ca0d36044e0dc' +
        '08a22724efa6f6a07b0ec4c79aa88ac00000000')

  }),
  it("hh", () => {
    expect(wrapper.setMethods.Aaa(1, 2)).toEqual(3);
  })
})