import { Partytown } from '@builder.io/partytown/react'
import OverrideComponents from 'src/customizations/src/GlobalOverrides'
import storeConfig from '../../../faststore.config'
import GoogleTagManager from './GoogleTagManager'
import VTEX from './vtex'

const isString = (obj: unknown): obj is string => typeof obj === 'string'

const gtmContainerId = storeConfig.analytics?.gtmContainerId

const includeGTM = typeof gtmContainerId === 'string'
const includeVTEX = storeConfig.platform === 'vtex'

if (process.env.NODE_ENV === 'development' && !includeGTM) {
  console.warn(
    'No GTM container id found. Check the analytics section on your faststore.config.js file for enhanced observability of your store.'
  )
}

function ThirdPartyScripts() {
  const forwards = []
  if (includeVTEX) forwards.push('sendrc', 'vtexaf')
  if (includeGTM) forwards.push('dataLayer.push')

  return (
    <>
      {includeGTM && <GoogleTagManager containerId={gtmContainerId} />}
      {includeVTEX && <VTEX />}
      <OverrideComponents.ThirdPartyScripts />
      <Partytown
        key="partytown"
        // Variables to forward to from main to worker
        forward={forwards}
      />
    </>
  )
}

export default ThirdPartyScripts
