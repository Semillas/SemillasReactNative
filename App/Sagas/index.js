import { takeLatest } from 'redux-saga'
import SemillasApi from '../Services/SemillasApi'

/* ------------- Types ------------- */

// import { StartupTypes } from '../Redux/StartupRedux'
import { LoginTypes } from '../Redux/LoginRedux'
import { OpenScreenTypes } from '../Redux/OpenScreenRedux'
import { UsersTypes } from '../Redux/UsersRedux'
import { FeedTypes } from '../Redux/FeedRedux'
import { ServiceTypes } from '../Redux/ServiceRedux'
import { UserServicesTypes } from '../Redux/UserServicesRedux'
import { CategoryTypes } from '../Redux/CategoryRedux'

/* ------------- Sagas ------------- */

// import { startup } from './StartupSagas'
import { login, signup, setApiKey } from './LoginSagas'
import { getUser, profilePost, profilePhotoPost, searchUser } from './UsersSagas'
import { getUserServices } from './UserServicesSagas'
import { getFeed } from './FeedSagas'
import { getCategories } from './CategorySagas'
import {  getService,
          postService,
          photoPostService,
          deleteService,
          deleteServicePhoto} from './ServiceSagas'
import { openScreen } from './OpenScreenSagas'

/* ------------- API ------------- */

// The API we use is only used from Sagas, so we create it here and pass along
// to the sagas which need it.
const semillasApi = SemillasApi.create()

/* ------------- Connect Types To Sagas ------------- */

const root = function * root () {
  yield [
    // some sagas only receive an action
    //takeLatest(StartupTypes.STARTUP, startup),
    takeLatest(OpenScreenTypes.OPEN_SCREEN, openScreen),

    // some sagas receive extra parameters in addition to an action
    takeLatest(LoginTypes.LOGIN_REQUEST, login, semillasApi),
    takeLatest(LoginTypes.SET_API_KEY, setApiKey, semillasApi),
    takeLatest(LoginTypes.SIGNUP_REQUEST, signup, semillasApi),
    takeLatest(UsersTypes.PROFILE_POST_REQUEST, profilePost, semillasApi),
    takeLatest(UsersTypes.PROFILE_PHOTO_POST_REQUEST, profilePhotoPost, semillasApi),
    takeLatest(UsersTypes.USERS_REQUEST, getUser, semillasApi),
    takeLatest(FeedTypes.FEED_REQUEST, getFeed, semillasApi),
    takeLatest(ServiceTypes.SERVICE_REQUEST, getService, semillasApi),
    takeLatest(ServiceTypes.SERVICE_POST_REQUEST, postService, semillasApi),
    takeLatest(UserServicesTypes.USER_SERVICES_REQUEST, getUserServices, semillasApi),
    takeLatest(ServiceTypes.SERVICE_PHOTO_POST_REQUEST, photoPostService, semillasApi),
    takeLatest(ServiceTypes.SERVICE_DELETION_REQUEST, deleteService, semillasApi),
    takeLatest(ServiceTypes.SERVICE_PHOTO_DELETION_REQUEST, deleteServicePhoto, semillasApi),
    takeLatest(CategoryTypes.CATEGORY_REQUEST, getCategories, semillasApi),
    takeLatest(UsersTypes.USERS_SEARCH_REQUEST, searchUser, semillasApi)
  ]
}

export default root
