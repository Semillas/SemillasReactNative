// @flow

import React from 'react'
import { ScrollView, Text } from 'react-native'
import { connect } from 'react-redux'
import { Actions as NavigationActions } from 'react-native-router-flux'
import CategoryActions from '../Redux/CategoryRedux.js'

// Styles
import styles from './Styles/CategoriesModalStyle'

class CategoriesModal extends React.Component {

  // constructor (props) {
  //   super(props)
  //   this.state = {}
  // }

  render () {
    return (
      <View style={{marginTop: 22}}>
        <Modal
          animationType="slide"
          transparent={false}
          visible={this.props.display}
          onRequestClose={() => {alert("Modal has been closed.")}}
          >
         <View style={{marginTop: 22}}>
          <View>
            <Text>Hello World!</Text>

            <TouchableHighlight onPress={() => {
                            this.props.setModalVisible(!this.props.display)
                          }}>
              <Text>Hide Modal</Text>
            </TouchableHighlight>

          </View>
         </View>
        </Modal>

        <TouchableHighlight onPress={() => {
                    this.props.setModalVisible(true)
                  }}>
          <Text>Show Modal</Text>
        </TouchableHighlight>

      </View>
    )
  }
}

CategoriesModal.propTypes = {
  display: PropTypes.bool
  categories: PropTypes.object,
  setModalVisible: PropTypes.func
}

const mapStateToProps = (state) => {
  return {
    display: state.categories.diplayCategoryFilter,
    categories: state.categories.categories
}

const mapDispatchToProps = (dispatch) => {
  return {
    setModalVisible: (visible) => dispatch(CategoryActions.categorySetDisplayFilter(visible)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CategoriesModal)
