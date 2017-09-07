// @flow

import React, {PropTypes} from 'react'
import { View, Text, Modal, TouchableHighlight } from 'react-native'
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
      <View >
        <Modal
          animationType="slide"
          transparent={true}
          visible={this.props.display}
          onRequestClose={() => {alert("Modal has been closed.")}}
          >
          <View style={styles.container}>
            <Text>Hello World!</Text>

            <TouchableHighlight onPress={() => {
                            this.props.setModalVisible(!this.props.display)
                          }}>
              <Text>Hide Modal</Text>
            </TouchableHighlight>
         </View>
        </Modal>
      </View>
    )
  }
}

CategoriesModal.propTypes = {
  display: PropTypes.bool,
  categories: PropTypes.object,
  setModalVisible: PropTypes.func
}

const mapStateToProps = (state) => {
  return {
    display: state.category.displayCategoryFilter,
    categories: state.category.categories
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setModalVisible: (visible) => dispatch(CategoryActions.categorySetDisplayFilter(visible)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CategoriesModal)
