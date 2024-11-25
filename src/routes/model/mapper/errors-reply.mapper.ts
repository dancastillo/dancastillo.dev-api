import { DCError } from '@dancastillo/error'
import { ErrorReply, ErrorsReply } from '../types/errors.js'

export function mapErrorsReply(errors: DCError[]): ErrorsReply {
  return errors.map(
    (error: DCError): ErrorReply => ({
      code: error.code,
      message: error.title,
    })
  )
}
