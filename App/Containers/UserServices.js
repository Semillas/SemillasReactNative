import React, { PropTypes } from 'react'
import {
  ListView,
  Text,
  View
} from 'react-native'
import InfiniteScrollView from 'react-native-infinite-scroll-view'
import { connect } from 'react-redux'
import UserServicesActions from '../Redux/UserServicesRedux.js'
import ServiceFeed from '../Components/ServiceFeed'

// import styles from './Styles/FeedStyle'

class UserServices extends React.Component {
  static propTypes = {
    // {items: ["item1", "item2"], nextUrl: null, fetching: false}
    items: PropTypes.object,
    nextUrl: PropTypes.string,
//    category: Proptypes.number,
    userUuid: PropTypes.string,

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

    //this.dataSource = this.getUpdatedDataSource(props)
  }

  _rowHasChanged (r1, r2) {
    // You might want to use a different comparison mechanism for performance.
    return JSON.stringify(r1) !== JSON.stringify(r2)
  }

  async componentWillMount () {
    // Initial fetch for data, assuming that userServices is not yet populated.
    this.props.dispatch(UserServicesActions.userServicesRequest(null, this.props.userUuid))
  }

  async loadMoreContentAsync () {
    // In this example, we're assuming cursor-based pagination, where any
    // additional data can be accessed at this.props.feed.nextUrl.
    //
    // If nextUrl is set, that means there is more data. If nextUrl is unset,
    // then there is no existing data, and you should fetch from scratch.
    if (this.props.nextUrl !== 'LastPage') {
      this.props.dispatch(UserServicesActions.userServicesRequest(this.props.nextUrl))
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

  componentWillUnmount() {
    this.props.dispatch(UserServicesActions.userServicesClear())
  }

  renderRow (data) {
    return (
      <ServiceFeed data={data} />
    )
  }

  render () {
    return (
      <View>
      <ListView
        renderScrollComponent={props => <InfiniteScrollView {...props} />}
        dataSource={this.dataSource}
        renderRow={this.renderRow}
        canLoadMore={this.props.nextUrl !== 'LastPage'}
        onLoadMoreAsync={this.loadMoreContentAsync.bind(this)}
        distanceToLoadMore={3}
      />
      </View>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    items: state.userServices.items,
    nextUrl: state.userServices.nextPageUrl,
    userUuid: ownProps.userUuid,
  }
}

export default connect(mapStateToProps)(UserServices)
