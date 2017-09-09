// a library to wrap and simplify api calls
import apisauce from 'apisauce'
import I18n from 'react-native-i18n'

// our "constructor"
const create = (baseURL = 'https://www.semillasocial.org') => {
  // ------
  // STEP 1
  // ------
  //
  // Create and configure an apisauce-based api object.
  //
  const api = apisauce.create({
    // base URL is read from the "constructor"
    baseURL,
    // here are some default headers
    headers: {
      'Cache-Control': 'no-cache',
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Accept-Language': I18n.locale
    },
    // 10 second timeout...
    timeout: 10000
  })

   baseURL = 'https://requestb.in'
   const requestBin = apisauce.create({
     // base URL is read from the "constructor"
     baseURL,
     // here are some default headers
     headers: {
       'Cache-Control': 'no-cache',
       'Content-Type': 'application/json',
       'Accept': 'application/json'
     },
     // 10 second timeout...
     timeout: 10000
   })

  // Force OpenWeather API Key on all requests
  // api.addRequestTransform((request) => {
  // request.params['APPID'] = '0e44183e8d1018fc92eb3307d885379c'
  // })

  // Wrap api's addMonitor to allow the calling code to attach
  // additional monitors in the future.  But only in __DEV__ and only
  // if we've attached Reactotron to console (it isn't during unit tests).
  if (__DEV__ && console.tron) {
    api.addMonitor(console.tron.apisauce)
    const naviMonitor = (response) => console.log('hey!  listen! ', response)
    api.addMonitor(naviMonitor)
  }

  // ------
  // STEP 2
  // ------
  //
  // Define some functions that call the api.  The goal is to provide
  // a thin wrapper of the api layer providing nicer feeling functions
  // rather than "get", "post" and friends.
  //
  // I generally don't like wrapping the output at this level because
  // sometimes specific actions need to be take on `403` or `401`, etc.
  //
  // Since we can't hide from that, we embrace it by getting out of the
  // way at this level.


  const setHeader = api.setHeader

  const login = (email, password) => api.post('/rest-auth/login/', {'email': email, 'password': password})

  const signup = (email, password1, password2) => api.post('/rest-auth/registration/', {'email': email, 'password1': password1, 'password2': password2})

  // const logout = (email, password) => api.post('/rest-auth/logout/', {})

  const getFeed = function (nextPageUrl, category, searchText, lat, lon) {
    if (nextPageUrl != null) {
      return api.get(nextPageUrl)
    } else {
      return api.get(
        '/api/v1/service/feed',
        {
          category: category,
          search: searchText,
          lat: lat,
          lon: lon
        }
      )
    }
  }

  const getUserServices = function (nextPageUrl, userUuid) {
    if (nextPageUrl != null) {
      return api.get(nextPageUrl)
    } else {
      return api.get('/api/v1/user/' + userUuid + '/services')
    }
  }

  const getUserDetail = (uuid) => api.get('/api/v1/user/' + uuid + '/')
  const getServiceDetail = (uuid) => api.get('/api/v1/service/' + uuid + '/')
  const deleteService = (uuid) => api.delete('/api/v1/service/delete/' + uuid + '/')
  const deleteServicePhoto = (id) => api.delete('/api/v1/service/photo/delete/' + id + '/')

  const postService = (title, description, category, seedsPrice) =>
    api.post('/api/v1/service/',
      {
        'title': title,
        'description': description,
        'category': category,
        'seeds_price': seedsPrice
      }
    )

  const putService = (title, description, category, seedsPrice, uuid) =>
    api.patch('/api/v1/service/edit/' + uuid + '/',
      {
        'title': title,
        'description': description,
        'category': category,
        'seeds_price': seedsPrice
      }
    )

  const putUser = (uuid, name, email, phone, telegramId, FaircoinAddress) =>
    api.patch('/api/v1/user/update/' + uuid + '/',
      {
        'name': name,
        'email': email,
        'phone': phone,
        'telegram_id': telegramId,
        'faircoin_address': FaircoinAddress
      }
    )

  const putUserPhoto  = (uuid, pictureUrl) => {
    const data = new FormData()
    data.append('picture', {
      uri: pictureUrl,
      type: 'application/octet-stream',
      name: 'placeholder.jpg'
    })

    return api.put('/api/v1/user/update/' + uuid + '/',
      data
    )
  }

  const photoPostService = (photoUrl, serviceUuid) => {
    // create formdata
    const data = new FormData()
    data.append('photo', {
      uri: photoUrl,
      type: 'image/jpeg',
      name: 'placeholder.jpg'
    })

    // post your data.
    return api.post(
      '/api/v1/service/photo_upload/'.concat(serviceUuid, '/'),
      data
    )
  }

  const getCategories = function () {
    return api.get('/api/v1/service/categories')
  }


  // ------
  // STEP 3
  // ------
  //
  // Return back a collection of functions that we would consider our
  // interface.  Most of the time it'll be just the list of all the
  // methods in step 2.
  //
  // Notice we're not returning back the `api` created in step 1?  That's
  // because it is scoped privately.  This is one way to create truly
  // private scoped goodies in JavaScript.
  //
  return {
    // a list of the API functions from step 2
    login,
    signup,
    getUserDetail,
    setHeader,
    getServiceDetail,
    getFeed,
    postService,
    putService,
    getUserServices,
    getCategories,
    deleteService,
    deleteServicePhoto,
    photoPostService,
    putUser,
    putUserPhoto
  }
}

// let's return back our create method as the default.
export default {
  create
}
