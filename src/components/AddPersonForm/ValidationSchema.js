import * as Yup from 'yup';

const passwordRegex = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.{8,32})(?=.*[`!@#$%^&*(){}[\]:;<>,.?/~_+\-=\\|/])/

const SignupSchema = Yup.object({
  username: Yup.string()
    .max(16, 'Must be 16 characters or less')
    .required('Required'),
  email: Yup.string()
    .email('Invalid email address')
    .required('Required'),
  password: Yup.string()
    .required('No password provided.')
    .min(8, 'Password is too short - should be 8 chars minimum.')
    .max(32, 'Password is too long - should be 32 chars maximum.')
    .matches(passwordRegex, 
      'Password must have at least one capital letter, a non capital letter, one number and a non alphanumeric character'),
  confirmPassword: Yup.string()
    .required()
    .oneOf([Yup.ref('password'), null], 'Passwords must match')
})

export default SignupSchema;