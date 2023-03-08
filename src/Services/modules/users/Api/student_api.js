import ApiManager from './ApiManager'

export const student_login = async data => {
  try {
    const result = await ApiManager('/student/login', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        Accept: 'application/json',
      },
      data: data,
    })
    return result
  } catch (error) {
    return error
  }
}
