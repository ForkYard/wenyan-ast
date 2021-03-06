import { parse } from '../src/parse'
import { VarType, Accessability, AST, Statement } from '../../types'
import { clearLocation } from '../../utils/src'

const expectParsed = <T extends AST>(s: string, v: T) => expect(clearLocation(parse(s))).toEqual<T>(v)
const expectBody = <T extends Statement[]>(s: string, v: T) => expect(clearLocation(parse(s).body)).toEqual<T>(v)

describe('parse', () => {
  it('empty', () => {
    expectParsed('', {
      type: 'Program',
      body: [],
    })
  })

  it('var a = 3', () => {
    expectBody('吾有一數。曰三。名之曰「甲」。', [{
      type: 'VariableDeclaration',
      count: 1,
      varType: VarType.Number,
      names: [
        { type: 'Identifier', name: '甲' },
      ],
      values: [{
        type: 'Literal',
        varType: VarType.Number,
        value: 3,
      }],
      accessability: Accessability.private,
    }])
  })

  it('multiple vars', () => {
    expectBody('吾有三數。曰一。曰三。曰五。名之曰「甲」曰「乙」曰「丙」。', [{
      type: 'VariableDeclaration',
      count: 3,
      varType: VarType.Number,
      names: [
        { type: 'Identifier', name: '甲' },
        { type: 'Identifier', name: '乙' },
        { type: 'Identifier', name: '丙' },
      ],
      values: [{
        type: 'Literal',
        varType: VarType.Number,
        value: 1,
      },
      {
        type: 'Literal',
        varType: VarType.Number,
        value: 3,
      },
      {
        type: 'Literal',
        varType: VarType.Number,
        value: 5,
      }],
      accessability: Accessability.private,
    },
    ])
  })
})
