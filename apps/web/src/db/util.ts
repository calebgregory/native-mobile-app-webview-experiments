import { RxDocument } from 'rxdb'
import { map } from 'rxjs/operators'
import { OperatorFunction } from 'rxjs'

export function doc<T>(): OperatorFunction<RxDocument, T> {
  return map((rxdoc: RxDocument) => {
    return rxdoc && (rxdoc._data as unknown as T)
  })
}

export function docs<T>(): OperatorFunction<RxDocument[], T[]> {
  return map((rxdocs: RxDocument[]) => {
    return rxdocs.map(rxdoc => rxdoc && (rxdoc._data as unknown as T))
  })
}
