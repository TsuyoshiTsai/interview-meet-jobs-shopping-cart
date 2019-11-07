import * as Yup from 'yup'

export default Yup.object().shape({
  title: Yup.string().required('請填寫標題'),
  content: Yup.string().required('請填寫內容'),
})
