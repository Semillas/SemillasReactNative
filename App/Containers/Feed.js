import React, { PropTypes } from 'react'
import {
  ListView,
  ActivityIndicator,
  RefreshControl
} from 'react-native'
import InfiniteScrollView from 'react-native-infinite-scroll-view'
import { connect } from 'react-redux'
import FeedActions from '../Redux/FeedRedux.js'
import GeoActions from '../Redux/GeoRedux.js'
import ServiceFeed from '../Components/ServiceFeed'

// import styles from './Styles/FeedStyle'
const STATUS_INITIAL = 0
const STATUS_REQUESTED_LOCALIZATION = 1
const STATUS_REQUESTED_FEED = 2
const STATUS_FEED_RETRIEVED = 3

class Feed extends React.Component {
  static propTypes = {
    // {items: ["item1", "item2"], nextUrl: null, fetching: false}
    items: PropTypes.object,
    nextUrl: PropTypes.string,
    requestStatus: PropTypes.number,
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
    this.getPosition()
    this.feedRequest(
      refresh=true,
      position=this.props.location.position,
    )


  }

	_geo_success(){
    // Initial fetch for data, assuming that feed is not yet populated.
		return this.props.retrieveLocationSuccess
	}

	_geo_failure(){
    // Initial fetch for data, assuming that feed is not yet populated.
		return this.props.retrieveLocationFailure
	}

	getPosition() {
		var maximumAge = 60 * 60 * 3 // 3 hours

		navigator.geolocation.getCurrentPosition(
			this._geo_success(),
			this._geo_failure(),
			{enableHighAccuracy: false, timeout: 4000, maximumAge: maximumAge }
		);

    this.props.geolocationRequested()
  }

  feedRequest(refresh=false, position)
  {

    if (!position) {
      position = this.props.location.position
    }

    nextUrl = refresh ? null : this.props.nextUrl

    if (nextUrl !== 'LastPage') {
      this.props.dispatch(FeedActions.feedRequest(
        nextUrl,
        this.props.searchText,
        this.props.category,
        position
      ))
    }
  }

  async componentDidMount () {
    // Initial fetch for data, assuming that feed is not yet populated.
    this.props.dispatch(FeedActions.feedClear())
		this.getPosition()
  }

  async loadMoreContentAsync () {
    // In this example, we're assuming cursor-based pagination, where any
    // additional data can be accessed at this.props.feed.nextUrl.
    //
    // If nextUrl is set, that means there is more data. If nextUrl is unset,
    // then there is no existing data, and you should fetch from scratch.
    this.feedRequest()
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
    //this.dataSource = this.getUpdatedDataSource(nextProps)
    console.log('requestStatus: ', nextProps.requestStatus)
    if (nextProps.requestStatus === STATUS_FEED_RETRIEVED) {
      this.dataSource = this.getUpdatedDataSource(nextProps)
    }
    // Geolocation just arrived
    if ((nextProps.requestStatus === STATUS_REQUESTED_LOCALIZATION) &&
      ((nextProps.location) && (nextProps.location.requestFinished === true))) {
      this.feedRequest(
        refresh=false,
        position=nextProps.location.position,
      )
    }
  }

  renderRow (data) {
    return (
      <ServiceFeed data={data} />
    )
  }

  render () {
    if (this.props.location.fetching) {
      return <ActivityIndicator />
    } else {
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
}

const mapStateToProps = (state, ownProps) => {
  return {
    items: state.feed.items,
    nextUrl: state.feed.nextPageUrl,
    searchText: ownProps.searchText,
    category: ownProps.category,
    location: state.location,
    requestStatus: state.feed.requestStatus
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    retrieveLocationSuccess: (position) => dispatch(GeoActions.geoSuccess(position)),
    retrieveLocationFailure: (error) => dispatch(GeoActions.geoFailure(error)),
    geolocationRequested: () => dispatch(FeedActions.geolocationRequested()),
		dispatch: dispatch
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Feed)
