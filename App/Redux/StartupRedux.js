// @flow

import { createActions } from 'reduxsauce'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  startup: null,
  rehidratateApiKey: null
})

export const StartupTypes = Types
export default Creators
