// @flow

import React, {PropTypes} from 'react'
import {  View,
          Modal,
          TouchableHighlight,
          TouchableWithoutFeedback,
          ActivityIndicator
    } from 'react-native'
import { List, ListItem, Text } from 'native-base';
import { connect } from 'react-redux'
import { Actions as NavigationActions } from 'react-native-router-flux'
import CategoryActions from '../Redux/CategoryRedux.js'

// Styles
import styles from './Styles/CategoriesModalStyle'

class CategoriesModal extends React.Component {

  componentWillMount () {
    if (!this.props.categories) {
      this.props.retrieveCategories()
    }
  }

  handlePressCategoryFilter = (value) => {
    this.props.setModalVisible(false)
    this.props.setSelectedValue(value)


  }

  renderRow (data) {
    return (
      <ListItem
          onPress={() => this.handlePressCategoryFilter(data.id)}
        >
          <Text>{data.name}</Text>
      </ListItem>
    )
  }

  renderCategoryList () {
    return (
      <List
        dataArray={this.props.categories}
        renderRow={(item) => this.renderRow(item)}
        ListEmptyComponent={() => <ActivityIndicator /> }
        keyExtractor = {(item, index) => item.id}
      />
    )
  }

  render () {
    return (
      <View >
        <Modal
          animationType="slide"
          transparent={true}
          visible={this.props.display}
          onRequestClose={() => this.props.setModalVisible(false)}
          >
          <TouchableWithoutFeedback onPress={() => this.props.setModalVisible(false)}>
            <View style={styles.container}>
              {this.renderCategoryList()}
           </View>
          </TouchableWithoutFeedback>
        </Modal>
      </View>
    )
  }
}

CategoriesModal.propTypes = {
  display: PropTypes.bool,
  categories: PropTypes.array,
  setModalVisible: PropTypes.func
}

const mapStateToProps = (state) => {
  return {
    display: state.category.displayCategoryFilter,
    categories: state.category.categories,
    selectedValue: state.category.selectedValue
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setModalVisible: (visible) => dispatch(CategoryActions.categorySetDisplayFilter(visible)),
    setSelectedValue: (value) => dispatch(CategoryActions.categorySetSelectedValue(value)),
    retrieveCategories: () => dispatch(CategoryActions.categoryRequest()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CategoriesModal)
