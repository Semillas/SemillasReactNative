// @flow

import React, {PropTypes} from 'react'
import {  View,
          Modal,
          TouchableHighlight,
          FlatList,
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

  renderRow (data) {
    return (
      <ListItem>
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
          <View style={styles.container}>
            {this.renderCategoryList()}
         </View>
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
    categories: state.category.categories
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setModalVisible: (visible) => dispatch(CategoryActions.categorySetDisplayFilter(visible)),
    retrieveCategories: () => dispatch(CategoryActions.categoryRequest()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CategoriesModal)
