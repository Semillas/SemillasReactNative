import React from 'react'
import {
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from 'react-native'
import { Field, reduxForm } from 'redux-form'
import ServiceFormActions from '../Redux/ServiceFormRedux.js'
import styles from './Styles/GenericFormStyle'


const required = value => value ? undefined : 'Required'
const maxLength = max => value =>
    value && value.length > max ? `Must be ${max} characters or less` : undefined
const maxLength35 = maxLength(35)
const number = value => value && isNaN(Number(value)) ? 'Must be a number' : undefined
const minValue = min => value =>
    value && value < min ? `Must be at least ${min}` : undefined
const minValue0 = minValue(0)
const email = value =>
    value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value) ?
      'Invalid email address' : undefined

const submit = values => {
  console.log('Submitting form', values)
  this.props.dispatch(ServiceFormActions.PostRequest(values))
  //TODO: Find where to put errors. http://redux-form.com/6.6.3/docs/api/SubmissionError.md/
}



const renderInput = ({ input: { onChange, ...restInput }, label, keyboardType,
                    type, meta: { touched, error, warning } }) => {
  return (
    <View>
    <Text>{label}</Text>
    <TextInput
      style={styles.input}
      onChangeText={onChange}
      keyboardType = {((keyboardType && keyboardType) || "default")}
      placeholder={label}
      {...restInput}
    />
    {touched && ((error && <Text>{error}</Text>) || (warning && <Text>{warning}</Text>))}
    </View>
  )

}


//class EditServiceForm extends React.Component {
//  static propTypes = {
//    // {items: ["item1", "item2"], nextUrl: null, fetching: false}
//    items: PropTypes.object,
//    nextUrl: PropTypes.string,
////    category: Proptypes.number,
////    searchText: Proptypes.string,
//
//    // dispatch is automatically provided by react-redux, and is used to
//    // interact with the store.
//    dispatch: PropTypes.func.isRequired
//  };
//
//  constructor (props, context) {
//    super(props, context)
//    this.state = {
//      items: {},
//      nextUrl: null,
//      fetching: false
//    }
//



const EditServiceForm = props => {
  const { error, handleSubmit, pristine, reset, submitting } = props




  return (
    <View style={styles.container}>
        <Field
          name="title"
          label="Título"
          component={renderInput}
          validate={[ required, maxLength35 ]}
        />
        <Field
          name="description"
          label="Descripción"
          component={renderInput}
          validate={[ required ]}
        />
        <Field
          label="Precio en Semillas"
          name="seed_price"
          keyboardType="numeric"
         component={renderInput}
          validate={[ required, number ]}
        />

        {error && <Text>{error}</Text>}

        <TouchableOpacity onPress={handleSubmit(submit)}>
          <Text style={styles.button}>Submit</Text>
        </TouchableOpacity>
      </View>
   )
}

export default reduxForm({
    form: 'editService'
})(EditServiceForm)
