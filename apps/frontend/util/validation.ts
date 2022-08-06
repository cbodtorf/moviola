export function validateTitle(value: string) {
  let error
  if (!value) {
    error = 'Title is required'
  }
  return error
}

export function validateImage(value: string) {
  let error
  if (!value) {
    error = 'Image is required'
  }
  return error
}

export function validateRating(value: number) {
  let error
  if (!value) {
    error = 'Rating is required'
  }
  return error
}

export function validateYear(value: number) {
  let error
  if (!value) {
    error = 'Year is required'
  }
  return error
}