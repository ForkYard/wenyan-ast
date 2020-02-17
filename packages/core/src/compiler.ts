import transpilers from './transpilers'
import { ErrorHandler } from './errors/handler'
import { Parser } from './parse'
import { AST, Token } from './types'
import { Transplier } from './transpilers/base'

export interface CompileOptions {
  lang: 'js'
  errorHandler: ErrorHandler
  sourcemap: boolean
}

export class Compiler {
  readonly options: CompileOptions
  private _ast: AST | undefined
  private _tokens: Token[] | undefined
  private _transpiler: Transplier
  private _compiled: string | undefined
  private _initialized = false

  constructor(
    public readonly source: string,
    options: Partial<CompileOptions> = {},
  ) {
    const {
      lang = 'js',
      sourcemap = true,
      errorHandler = new ErrorHandler(),
    } = options

    this.options = {
      lang,
      errorHandler,
      sourcemap,
    }

    const Transpiler = transpilers[lang]
    this._transpiler = new Transpiler({ errorHandler })
  }

  public run() {
    const parser = new Parser(this.source, {
      errorHandler: this.options.errorHandler,
      sourcemap: this.options.sourcemap,
    })

    this._tokens = parser.tokens
    this._ast = parser.getAST()
    this._compiled = this._transpiler.transpile(this.ast)
    this._initialized = true
  }

  get ast() {
    return this._ast!
  }

  get tokens() {
    return this._tokens!
  }

  get compiled() {
    return this._compiled!
  }

  get initialized() {
    return this._initialized
  }
}

export function compile(source: string, options: Partial<CompileOptions> = {}) {
  const compiler = new Compiler(source, options)
  compiler.run()
  return compiler.compiled
}
