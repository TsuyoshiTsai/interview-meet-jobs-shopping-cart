export const amount = value =>
  String(value)
    .replace(/^0/gi, '')
    .replace(/[^\d]+/gi, '')
    .replace(/\d(?=(\d{3})+$)/gi, '$&,')
