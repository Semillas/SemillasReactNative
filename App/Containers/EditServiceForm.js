import React, { PropTypes } from 'react'
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




class EditServiceForm extends React.Component {
  static propTypes = {
    // dispatch is automatically provided by react-redux, and is used to
    // interact with the store.
    error: PropTypes.string.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    //submitToRedux: PropTypes.func.isRequired
  };

  submit (values, dispatch, props) {
    console.log('Submitting form', values)
    this.props.submitToRedux(values)
    //this.props.submitToRedux(values)
    //this.props.dispatch(ServiceFormActions.PostRequest(values))
    //TODO: Find where to put errors. http://redux-form.com/6.6.3/docs/api/SubmissionError.md/
  }

  renderInput ({ input: { onChange, ...restInput }, label, keyboardType,
                      type, meta: { touched, error, warning } }) {
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


  render () {
    return (
      <View style={styles.container}>
          <Field
            name="title"
            label="Título"
            component={this.renderInput}
            validate={[ required, maxLength35 ]}
          />
          <Field
            name="description"
            label="Descripción"
            component={this.renderInput}
            validate={[ required ]}
          />
          <Field
            label="Precio en Semillas"
            name="seed_price"
            keyboardType="numeric"
           component={this.renderInput}
            validate={[ required, number ]}
          />

          {this.props.error && <Text>{this.props.error}</Text>}

          <TouchableOpacity onPress={this.props.handleSubmit(this.submit)}>
            <Text style={styles.button}>Submit</Text>
          </TouchableOpacity>
        </View>
     )
  }
}

const mapStateToProps = (state) => {
  return {
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    submitToRedux: (values) => dispatch(ServiceFormActions.servicePostRequest(values))
  }
}

export default reduxForm(
  {
      form: 'editService'
  },

  mapStateToProps,
  mapDispatchToProps,
)(EditServiceForm)
