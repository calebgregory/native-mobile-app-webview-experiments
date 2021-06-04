import { RxDocument } from 'rxdb'
import { map } from 'rxjs/operators'
import { OperatorFunction } from 'rxjs'

export function doc<T>(): OperatorFunction<RxDocument, T> {
  return map((rxdoc: RxDocument) => {
    console.log('rxdoc', rxdoc)
    return rxdoc && (rxdoc._data as unknown as T)
  })
}
