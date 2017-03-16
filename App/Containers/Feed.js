import React, { PropTypes } from 'react'
import {
  ListView,
  Text,
  View,
  RefreshControl
} from 'react-native'
import InfiniteScrollView from 'react-native-infinite-scroll-view'
import { connect } from 'react-redux'
import FeedActions from '../Redux/FeedRedux.js'

import styles from './Styles/UsageExamplesScreenStyle'


class Feed extends React.Component {
  static propTypes = {
    // {items: ["item1", "item2"], nextUrl: null, fetching: false}
    items: PropTypes.object,
    nextUrl: PropTypes.string,
//    category: Proptypes.number,
//    searchText: Proptypes.string,

    // dispatch is automatically provided by react-redux, and is used to
    // interact with the store.
    dispatch: PropTypes.func.isRequired
  };

  constructor (props, context) {
    super(props, context)
    this.state = {
      items: {},
      nextUrl: null,
      fetching: false
    }

    this. dataSource = new ListView.DataSource({
      rowHasChanged: this._rowHasChanged.bind(this)
    })

    this.dataSource = this.getUpdatedDataSource(props)
  }

  _rowHasChanged (r1, r2) {
    // You might want to use a different comparison mechanism for performance.
    return JSON.stringify(r1) !== JSON.stringify(r2)
  }

  _renderRefreshControl () {
    // Reload all data
    return (
      <RefreshControl
        refreshing={this.state.fetching}
        onRefresh={this.refresh.bind(this)}
      />
    )
  }

  refresh () {
    this.props.dispatch(FeedActions.feedClear())
    this.props.dispatch(FeedActions.feedRequest(undefined))
  }

  async componentWillMount () {
    // Initial fetch for data, assuming that feed is not yet populated.
    this.props.dispatch(FeedActions.feedRequest(null))
  }

  async loadMoreContentAsync() {
    // In this example, we're assuming cursor-based pagination, where any
    // additional data can be accessed at this.props.feed.nextUrl.
    //
    // If nextUrl is set, that means there is more data. If nextUrl is unset,
    // then there is no existing data, and you should fetch from scratch.
    if (this.props.nextUrl != 'LastPage'){
      this.props.dispatch(FeedActions.feedRequest(this.props.nextUrl))
    }
  }

  getUpdatedDataSource (props) {
    // See the ListView.DataSource documentation for more information on
    // how to properly structure your data depending on your use case.
    let rows = props.items

    //let ids = rows.map((obj, index) => index)
    let ids = Object.keys(rows)

    return this.dataSource.cloneWithRows(rows, ids)
  }


  componentWillReceiveProps (nextProps) {
    // Trigger a re-render when receiving new props (when redux has more data).
    this.dataSource = this.getUpdatedDataSource(nextProps)
    this.props.nextUrl = nextProps.nextPageUrl
  }

  renderRow (data) {
    return (
      <View >
      <Text>{data.uuid}</Text>
      <Text>{data.title}</Text>
      <Text>{data.title}</Text>
      <Text>{data.title}</Text>
      </View >
    )
  }

  render () {
    return (
      <ListView
        renderScrollComponent={props => <InfiniteScrollView {...props} />}
        dataSource={this.dataSource}
        renderRow={this.renderRow}
        refreshControl={this._renderRefreshControl()}
        canLoadMore={this.props.nextUrl != 'LastPage'}
        onLoadMoreAsync={this.loadMoreContentAsync.bind(this)}
        distanceToLoadMore={3}
      />
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    items: state.feed.items,
    nextUrl: state.feed.nextPageUrl,
    searchText: ownProps.searchText,
    category: ownProps.category

  }
}

export default connect(mapStateToProps)(Feed)
