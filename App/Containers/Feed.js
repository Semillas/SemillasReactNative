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
    // Assume data shape looks like:
    // {items: ["item1", "item2"], nextUrl: null, fetching: false}
    items: PropTypes.array,
    nextPageUrl: PropTypes.string,
//    fetching: Proptypes.bool,
//    category: Proptypes.integer,
//    searchText: Proptypes.string,

    // dispatch is automatically provided by react-redux, and is used to
    // interact with the store.
    dispatch: PropTypes.func.isRequired
  };

  constructor (props, context) {
    super(props, context)
    this.props = {} //When implementing persistance. We can remove this and expire old props based on time.

    this.state = {
      dataSource: new ListView.DataSource({
        rowHasChanged: this._rowHasChanged.bind(this)
      }),
      feed: {items: {}, nextPageUrl: null, fetching: false}
    }

    // Update the data store with initial data.
    // const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
//    this.state = {
//      dataSource: ds.cloneWithRows([
//        'row 1',
//        'row 2',
//      ]),
//    };
    this.state.dataSource = this.getUpdatedDataSource(props)
    // this.state['feed'] = {items: ["item1", "item2"], nextUrl: null, fetching: false}
  }

  async componentWillMount () {
    // Initial fetch for data, assuming that feed is not yet populated.
    this._loadMoreContentAsync()
  }

  componentWillReceiveProps (nextProps) {
    // Trigger a re-render when receiving new props (when redux has more data).
    this.setState({
      dataSource: this.getUpdatedDataSource(nextProps)
    })
  }
  _rowHasChanged (r1, r2) {
    // You might want to use a different comparison mechanism for performance.
    return JSON.stringify(r1) !== JSON.stringify(r2)
  }

  _renderRefreshControl () {
    // Reload all data
    return (
      <RefreshControl
        refreshing={this.state.feed.fetching}
        onRefresh={this._loadMoreContentAsync.bind(this)}
      />
    )
  }

  _loadMoreContentAsync = async () => {
    // In this example, we're assuming cursor-based pagination, where any
    // additional data can be accessed at this.props.feed.nextUrl.
    //
    // If nextUrl is set, that means there is more data. If nextUrl is unset,
    // then there is no existing data, and you should fetch from scratch.
    this.props.dispatch(FeedActions.feedRequest(this.props.nextPageUrl))
  }

  getUpdatedDataSource (props) {
    // See the ListView.DataSource documentation for more information on
    // how to properly structure your data depending on your use case.
    let rows = props.items

    //let ids = rows.map((obj, index) => index)
    let ids = Object.keys(rows)

    return this.state.dataSource.cloneWithRows(rows, ids)
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
        dataSource={this.state.dataSource}
        renderRow={this.renderRow}
        refreshControl={this._renderRefreshControl()}
        canLoadMore={!!this.props.nextPageUrl}
        onLoadMoreAsync={this._loadMoreContentAsync.bind(this)}
      />
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    items: state.feed.items,
    nextPageUrl: state.feed.nextPageUrl,
    searchText: ownProps.searchText,
    category: ownProps.category

  }
}

export default connect(mapStateToProps)(Feed)
