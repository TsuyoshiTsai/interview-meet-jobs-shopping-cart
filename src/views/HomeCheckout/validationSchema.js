import * as Yup from 'yup'

export default Yup.object().shape({
  payment: Yup.number()
    .nullable()
    .required('請選擇付款方式'),
  shipping: Yup.number()
    .nullable()
    .required('請選擇寄送方式'),
  receiver: Yup.object()
    .shape({
      name: Yup.string()
        .max(10, '姓名不能超過 10 個字元')
        .required('請填寫姓名'),
      phone: Yup.string()
        .max(10, '手機號碼不能超過 10 個字元')
        .required('請填寫手機號碼'),
      address: Yup.string()
        .max(100, '地址不能超過 100 個字元')
        .required('請填寫地址'),
    })
    .required(),
  remark: Yup.string(),
})
