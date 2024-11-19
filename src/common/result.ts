import { Nullable } from './types.js'

type ErrorResult<T = unknown> = {
  code: number
  title: string
  detail: Nullable<string>
  meta: T
}

export type Result<T, E = unknown> =
  | {
      success: false
      data: Nullable<T>
      errors: ErrorResult<E>[]
    }
  | {
      success: true
      data: T
      errors: ErrorResult[]
    }

export function createSuccessfulResult<T>(data: T): Result<T> {
  return {
    success: true,
    data: data,
    errors: [],
  }
}

export function createFailureResult<T>(errors: ErrorResult[], data: Nullable<T> = null): Result<T> {
  return {
    success: false,
    data: data,
    errors: errors,
  }
}

export function mapResult<TData, TMappedData, TMappedErrors>(
  result: Result<TData>,
  mapData: (data: Nullable<TData>) => Nullable<TMappedData>,
  mapErrors: (errors: ErrorResult[]) => TMappedErrors[]
): { data: Nullable<TMappedData>; errors: TMappedErrors[] } {
  return {
    data: mapData(result.data),
    errors: mapErrors(result.errors),
  }
}
