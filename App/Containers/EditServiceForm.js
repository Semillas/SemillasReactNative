import React from 'react'
import {
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from 'react-native'
import { Field, reduxForm } from 'redux-form'



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
}

const renderInput = ({ input: { onChange, ...restInput }, label, keyboardType}) => {
  debugger;
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
    </View>

  )
}

const renderNumericInput = ({ input: { onChange, ...restInput }}) => {
  return (
    <TextInput
      style={styles.input}
      onChangeText={onChange}
      {...restInput}
    />
  )
}


const EditServiceForm = props => {
  const { handleSubmit, pristine, reset, submitting } = props

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

        <TouchableOpacity onPress={handleSubmit(submit)}>
          <Text style={styles.button}>Submit</Text>
        </TouchableOpacity>
      </View>
   )
}

//export default EditServiceForm
const styles = StyleSheet.create({
    button: {
          backgroundColor: 'blue',
          color: 'white',
          height: 30,
          lineHeight: 30,
          marginTop: 10,
          textAlign: 'center',
          width: 250
        },
    container: {

        },
    input: {
          borderColor: 'black',
          borderWidth: 1,
          height: 37,
          width: 250
        }
})

export default reduxForm({
    form: 'editService'
})(EditServiceForm)
