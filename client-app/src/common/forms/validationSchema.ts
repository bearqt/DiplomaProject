import * as yup from "yup";

const validationsForm = {
  chatName: yup.string().required("Обязательное поле"),
  description: yup.string().required("Обязательное поле")
};

export default validationsForm;