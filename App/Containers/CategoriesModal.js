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
import { Colors, Metrics } from '../Themes/'
import Icon from 'react-native-vector-icons/FontAwesome'

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
    function renderText(data, selectedValue) {
      if (selectedValue == data.id) {
        return (
          <View style={{flex:1, flexDirection:'row'}}>
            <Icon name='check' style={styles.selectedCategory} size={Metrics.icons.small} />
            <Text style={styles.selectedCategory}> {data.name}</Text>
          </View>
        )
      } else {
        return (
          <Text>{data.name}</Text>
      )
      }
    }
    return (
      <ListItem
          onPress={() => this.handlePressCategoryFilter(
            data.id)}
        >
        {renderText(data, this.props.selectedValue)}
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
