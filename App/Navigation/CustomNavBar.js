import React, { PropTypes } from 'react'
import { View, Image, LayoutAnimation } from 'react-native'
import NavItems from './NavItems'
import styles from './Styles/CustomNavBarStyle'
import SearchBar from '../Components/SearchBar'
import CategoriesModal from '../Containers/CategoriesModal'
import { connect } from 'react-redux'
import { Metrics, Images } from '../Themes'
import FeedActions from '../Redux/FeedRedux.js'
import CategoryActions from '../Redux/CategoryRedux.js'

class CustomNavBar extends React.Component {

  constructor (props) {
    super(props)
    this.state = {
      showSearchBar: false,
      categoriesModalVisible: false
    }
  }

  showCategoriesModal = () => {
    this.props.setModalVisible(true)
  }

  showSearchBar = () => {
    this.setState({showSearchBar: true})
  }

  cancelSearch = () => {
    this.setState({showSearchBar: false})
    this.props.cancelSearch()
  }

  onSearch = (searchTerm) => {
    this.props.performSearch(searchTerm)
  }

  renderMiddle () {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut)
    if (this.state.showSearchBar) {
      return <SearchBar onSearch={this.props.performSearch} searchTerm={this.props.searchTerm} onCancel={this.cancelSearch} />
    } else {
      return (
        <Image resizeMode='cover' style={styles.logo} source={Images.clearLogo} />
      )
    }
  }

  renderRightButtons () {
    if (this.state.showSearchBar) {
      return <View style={{width: Metrics.icons.medium}} />
    } else {
      return (
        <View style={styles.rightButtons}>
          {NavItems.filterButton(this.showCategoriesModal)}
          {NavItems.searchButton(this.showSearchBar)}
        </View>
      )
    }
  }

  renderLeftButtons () {
    if (this.state.showSearchBar) {
      return null
    } else {
      return (
        <View style={styles.leftButtons}>
          {NavItems.hamburgerButton()}
        </View>
      )
    }
  }

  render () {
    let state = this.props.navigationState
    let selected = state.children[state.index]
    while (selected.hasOwnProperty('children')) {
      state = selected
      selected = selected.children[selected.index]
    }

    const containerStyle = [
      styles.container,
      this.props.navigationBarStyle,
      state.navigationBarStyle,
      selected.navigationBarStyle
    ]

    return (
      <View style={containerStyle}>
        {this.renderLeftButtons()}
        {this.renderMiddle()}
        {this.renderRightButtons()}
        <CategoriesModal />
      </View>
    )
  }
}

CustomNavBar.propTypes = {
  navigationState: PropTypes.object,
  navigationBarStyle: View.propTypes.style
}

const mapStateToProps = (state) => {
  return {
    searchTerm: state.feed.searchText
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    performSearch: (searchTerm) => dispatch(FeedActions.feedUpdateSearch(searchTerm)),
    cancelSearch: () => dispatch(FeedActions.feedCancelSearch()),
    setModalVisible: (visible) => dispatch(CategoryActions.categorySetDisplayFilter(visible))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CustomNavBar)
