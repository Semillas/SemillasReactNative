import { takeLatest } from 'redux-saga'
import API from '../Services/Api'
import SemillasApi from '../Services/SemillasApi'
import FixtureAPI from '../Services/FixtureApi'
import DebugSettings from '../Config/DebugSettings'

/* ------------- Types ------------- */

import { StartupTypes } from '../Redux/StartupRedux'
import { TemperatureTypes } from '../Redux/TemperatureRedux'
import { LoginTypes } from '../Redux/LoginRedux'
import { OpenScreenTypes } from '../Redux/OpenScreenRedux'
import { UsersTypes } from '../Redux/UsersRedux'
import { FeedTypes } from '../Redux/FeedRedux'
import { ServicePostTypes } from '../Redux/ServicePostRedux'
import { UserServicesTypes } from '../Redux/UserServicesRedux'

/* ------------- Sagas ------------- */

import { startup } from './StartupSagas'
import { login } from './LoginSagas'
import { getTemperature } from './TemperatureSagas'
import { getUser } from './UsersSagas'
import { getUserServices } from './UserServicesSagas'
import { getFeed } from './FeedSagas'
import { getService, postService } from './ServiceSagas'
import { openScreen } from './OpenScreenSagas'

/* ------------- API ------------- */

// The API we use is only used from Sagas, so we create it here and pass along
// to the sagas which need it.
const api = DebugSettings.useFixtures ? FixtureAPI : API.create()
const semillasApi = SemillasApi.create()

/* ------------- Connect Types To Sagas ------------- */

export default function * root () {
  yield [
    // some sagas only receive an action
    takeLatest(StartupTypes.STARTUP, startup),
    takeLatest(OpenScreenTypes.OPEN_SCREEN, openScreen),

    // some sagas receive extra parameters in addition to an action
    takeLatest(LoginTypes.LOGIN_REQUEST, login, semillasApi),
    takeLatest(TemperatureTypes.TEMPERATURE_REQUEST, getTemperature, api),
    takeLatest(UsersTypes.USERS_REQUEST, getUser, semillasApi),
    takeLatest(FeedTypes.FEED_REQUEST, getFeed, semillasApi),
    takeLatest(FeedTypes.SERVICE_REQUEST, getService, semillasApi),
    takeLatest(ServicePostTypes.SERVICE_POST_REQUEST, postService, semillasApi),
    takeLatest(UserServicesTypes.USER_SERVICES_REQUEST, getUserServices, semillasApi),
  ]
}
