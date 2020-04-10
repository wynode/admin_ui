import isObject from 'lodash/isObject'
import { Notification } from 'element-ui'

const notifyOptions = {
  type: 'error',
  dangerouslyUseHTMLString: true,
}

export function nonFieldError(error) {
  return error.non_field_errors ? error.non_field_errors : []
}

export function formError(error) {
  const newErrors = {}

  if (error instanceof Object) {
    Object.entries(error).forEach((result) => {
      const [key, value] = result
      newErrors[key] = Array.isArray(value) ? value.join(',') : value
    })
  }
  return newErrors
}

export function allErrors(error, options) {
  if (isObject(error)) {
    const message = Object.values(error).join('<br>')
    Notification({ ...notifyOptions, ...options, message })
  } else {
    Notification({ ...notifyOptions, ...options, error })
  }
}

export function errorFormat(error, { isFormError = true, ...options } = {}) {
  if (error.non_field_errors) {
    const message = nonFieldError(error).join('<br>')
    Notification({ ...notifyOptions, ...options, message })
  }
  return isFormError ? formError(error) : error
}
