import React, { PropTypes } from 'react'
import {
  ListView,
  RefreshControl
} from 'react-native'
import InfiniteScrollView from 'react-native-infinite-scroll-view'
import { connect } from 'react-redux'
import FeedActions from '../Redux/FeedRedux.js'
import GeoActions from '../Redux/GeoRedux.js'
import ServiceFeed from '../Components/ServiceFeed'

// import styles from './Styles/FeedStyle'

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

    this.dataSource = new ListView.DataSource({
      rowHasChanged: this._rowHasChanged.bind(this)
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
        refreshing={this.state.fetching}
        onRefresh={this.refresh.bind(this)}
      />
    )
  }

  refresh () {
    this.props.dispatch(FeedActions.feedClear())
    this.props.dispatch(FeedActions.feedRequest(undefined))
  }

	_geo_success(position){
    // Initial fetch for data, assuming that feed is not yet populated.
		return this.props.retrieveLocation
	}

	getPosition() {
		var maximumAge = 60 * 60 * 3 // 3 hours
		navigator.geolocation.getCurrentPosition(
			this._geo_success(),
			(error) => alert(error.message),
			{enableHighAccuracy: false, timeout: 4000, maximumAge: maximumAge }
		);
  }

  async componentWillMount () {
    // Initial fetch for data, assuming that feed is not yet populated.
    this.props.dispatch(FeedActions.feedRequest(null))
		this.getPosition()
  }

  async loadMoreContentAsync () {
    // In this example, we're assuming cursor-based pagination, where any
    // additional data can be accessed at this.props.feed.nextUrl.
    //
    // If nextUrl is set, that means there is more data. If nextUrl is unset,
    // then there is no existing data, and you should fetch from scratch.
    if (this.props.nextUrl !== 'LastPage') {
      this.props.dispatch(FeedActions.feedRequest(this.props.nextUrl))
    }
  }

  getUpdatedDataSource (props) {
    // See the ListView.DataSource documentation for more information on
    // how to properly structure your data depending on your use case.
    let rows = props.items
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
      <ServiceFeed data={data} />
    )
  }

  render () {
    return (
      <ListView
        renderScrollComponent={props => <InfiniteScrollView {...props} />}
        dataSource={this.dataSource}
        renderRow={this.renderRow}
        refreshControl={this._renderRefreshControl()}
        canLoadMore={this.props.nextUrl !== 'LastPage'}
        onLoadMoreAsync={this.loadMoreContentAsync.bind(this)}
        distanceToLoadMore={10}
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

const mapDispatchToProps = (dispatch) => {
  return {
    retrieveLocation: (position) => dispatch(GeoActions.geoSuccess(position)),
		dispatch: dispatch
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Feed)
