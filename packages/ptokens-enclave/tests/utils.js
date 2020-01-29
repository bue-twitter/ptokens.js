const ETH_PEOS_BLOCK = {
  author: '0xa4df255ecf08bbf2c28055c65225c9a9847abd94',
  difficulty: '3.40282366920938463463374607431768211454e+38',
  extraData: '0xde830206048f5061726974792d457468657265756d86312e33362e30826c69',
  gasLimit: 10000000,
  gasUsed: 49942,
  hash: '0xf73a6ecc0b07ad520644a153060a4d266e722422950b0e6c94344d4d9db28e82',
  logsBloom:
    '0x00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000200000000020000000000000000000000000000000000000020000000000000000000000000020000000000000000000000000000000000000001000000000000000000000000000800000000040000000000000000000000000000000000000000000000000000000000000000000800000000000000000000000000000000000000000000000000000000000000000000000000000000000000002000000000000000000000000000000000000000000000000000000000008000000080000000000000000000400000000000',
  miner: '0xa4df255ecf08bbf2c28055c65225c9a9847abd94',
  number: 14335101,
  parentHash:
    '0x6a8cc0cfacd1eec85c48487646cf820c289212662aa29fb63944d8cc683b71b4',
  receiptsRoot:
    '0xe4f569036403b83f35dce242ffbf647bfddeca51ba7d0ad0753e0be95c38cdaf',
  sealFields: [
    '0x84176c2d5a',
    '0xb841ef57c25f9f920291b4b8a47873cd993e88ac3d4b6112201ea97a379c2b13b2b3193c9f458c11230a259fdbfaff89ea5319780ce99c80162de471a9ce0980957b00'
  ],
  sha3Uncles:
    '0x1dcc4de8dec75d7aab85b567b6ccd41ad312451b948a7413f0a142fd40d49347',
  signature:
    'ef57c25f9f920291b4b8a47873cd993e88ac3d4b6112201ea97a379c2b13b2b3193c9f458c11230a259fdbfaff89ea5319780ce99c80162de471a9ce0980957b00',
  size: 828,
  stateRoot:
    '0x78720c0b6f8d28980ce1ff6d3a7b62030dfe2c7206613c5b0b47347692322d7f',
  step: '392965466',
  timestamp: 1571861864,
  totalDifficulty: '4.827538980540718891646937609938670051308603218e+45',
  transactions: [
    '0xe3fa455fa55af30fd2510aea046975ac96cca6292d7f74a51565f8cb54a53347'
  ],
  transactionsRoot:
    '0xdf53cc472e115f9a8ab5f83f1012067855680bc13fd00b2dbbacc850f98d180e',
  uncles: []
}

const EOS_PEOS_BLOCK = {
  timestamp: '2019-10-16T09:01:57.000',
  producer: 'teamgreymass',
  confirmed: 0,
  previous: '0347c086212adacc319d08e4edf0abe6c8c3468ec5e79cb04de2984af59e3f14',
  transaction_mroot:
    'a8b28d4413ae22a8fbaf52fc2feee876009ca3fe3679c0ec23dbbd0a05cc8bd9',
  action_mroot:
    '79e32e2b438849422cef5cc452c88970458419f30f679b0c7a414b1968c486f4',
  schedule_version: 282,
  new_producers: null,
  header_extensions: [],
  producer_signature:
    'SIG_K1_KBxHqFmzpyeJzYyWZbUXXhVQPaQQwAEfudeuh6WmCcjhDyQMmdaGVbqc7qZBYeqm1UaBfP8ckFJqucdW939nqgh2NYFrwk',
  transactions: [
    {
      status: 'executed',
      cpu_usage_us: 262,
      net_usage_words: 27,
      trx: {
        id: 'c1e09684a51f756230f16aba30739a8e0744e2125ab3893669483ae65ea3ecd3',
        signatures: [
          'SIG_K1_KhR7D8qXBzjNnsJQLe5ZY2MayhbKasiMTRjjk8VE58Bi7fzruSJ1UPcpTBxiW9nKHLJjfnyumzcVQ1GQKJzPUzrgoWF1GA'
        ],
        compression: 'none',
        packed_context_free_data: '',
        context_free_data: [],
        packed_trx:
          '9edca65d7dc05c26c554000000000100a6823403ea3055000000572d3ccdcd01e0d2b86b1a39623400000000a8ed32324be0d2b86b1a3962343021cd2a1eb3e9adcf5600000000000004454f53000000002a30783032366443364134333536314441384136413737353533386231393241336539333663304632394200',
        transaction: {
          expiration: '2019-10-16T09:02:22',
          ref_block_num: 49277,
          ref_block_prefix: 1422206556,
          max_net_usage_words: 0,
          max_cpu_usage_ms: 0,
          delay_sec: 0,
          context_free_actions: [],
          actions: [
            {
              account: 'eosio.token',
              name: 'transfer',
              authorization: [
                {
                  actor: 'all3manfr3di',
                  permission: 'active'
                }
              ],
              data: {
                from: 'all3manfr3di',
                to: 'provabletokn',
                quantity: '2.2223 EOS',
                memo: '0x026dC6A43561DA8A6A775538b192A3e936c0F29B'
              },
              hex_data:
                'e0d2b86b1a3962343021cd2a1eb3e9adcf5600000000000004454f53000000002a307830323664433641343335363144413841364137373535333862313932413365393336633046323942'
            }
          ],
          transaction_extensions: []
        }
      }
    }
  ],
  block_extensions: [],
  id: '0347c087fe5065dd83c567bd4b4170c76c2b8f56b0399cd3ef19920418c00b96',
  block_num: 55033991,
  ref_block_prefix: 3177694595
}

const ETH_PBTC_BLOCK = {
  difficulty: '5673842091',
  extraData: '0xd883010909846765746888676f312e31332e34856c696e7578',
  gasLimit: 8000000,
  gasUsed: 415422,
  hash: '0xeb92df818886d5c4e4f23ba6aeb79c56587f6c79bd5b66c0e22d304a9db224c9',
  logsBloom:
    '0x00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000040000000004000000000000000000000000000000400000000040000000000000000000000028000000000000000000000000000000000000000000000000000000010200040000000000000000008801000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000002000000000000000000000000000000000000000000000000000008080000000000000004020000200000000000000000000008000000000000000000000000000400000000004',
  miner: '0x4ccfb3039b78d3938588157564c9ad559bafab94',
  mixHash: '0x32aea3c6828464507464cb428f2f8b1eb632f861b5b61f646f0c24194fa1d3fa',
  nonce: '0x57992020038a47a7',
  number: 7101473,
  parentHash:
    '0x265598907db63841079a98e3396ba4b1496301286f673272a44c0a663e64ca4f',
  receiptsRoot:
    '0x3dd8e9680d56e6b5b1dfc2529c92698e23d30dce8afd87e3fc0377df147e48f1',
  sha3Uncles:
    '0x1dcc4de8dec75d7aab85b567b6ccd41ad312451b948a7413f0a142fd40d49347',
  size: 1065,
  stateRoot:
    '0x5b44b0dd77f1ece83c1b8b7cc5460e45c446d20dd8c0dc97d52aca9ccc1535a0',
  timestamp: 1578664954,
  totalDifficulty: '29743087084423706',
  transactions: [
    '0x14253114dad94e408b10abb37a85adf7f6bf70fef4e527080ba8a9aef4a55fa0',
    '0xabd1adc0072771ede757f648fc532fefbbc14f1d130ba522bb85fe259d6687ca',
    '0x19ed51f468b42f78b7b8152035a2148f528849b465dfea8cb8dfaac423b50b08'
  ],
  transactionsRoot:
    '0x25f396bbb2babf7a04ce757380be6cd3e5766e77da9955752968495e24c29d4c',
  uncles: []
}

const BTC_PBTC_BLOCK = {
  id: '00000000000013068675dc3694319815bef985de15deb505541d70387a193e69',
  height: 1657098,
  version: 536928256,
  timestamp: 1578591247,
  tx_count: 5,
  size: 1297,
  weight: 4099,
  merkle_root:
    'd7e2095d95a0174bbe4503181b80d5d4136d088123e4057401f5ca7bdcc36718',
  previousblockhash:
    '00000000000068cfcbcc8023d97b0900d6c905f2dbf5fffef34c6b7dfb07d254',
  nonce: 729798261,
  bits: 453023995
}

export { ETH_PEOS_BLOCK, EOS_PEOS_BLOCK, ETH_PBTC_BLOCK, BTC_PBTC_BLOCK }
