import { Country,Location, Permission, keyNames } from "../helper/userStateHelper"

export interface DefaultLoader {
  micPermission: Permission
  locationPermission: Permission
  isoLanguage: Country | null
  location: Location | null
  name: string | null
}

export default async function loader(): Promise<DefaultLoader> {
  let isoLanguage = null

  try {
    isoLanguage = JSON.parse(
      localStorage.getItem(keyNames.ISO_LANUGUAGE)!
    ) as Country
  } catch (err) {
    // do nothing
  }

  let location = null

  try {
    location = JSON.parse(
      localStorage.getItem(keyNames.USER_LOCATION)!
    ) as Location
  } catch (err) {
    // do nothing
  }

  return {
    micPermission:
      (localStorage.getItem(keyNames.MIC_PERMISSION) as Permission) ??
      Permission.DEFAULT,
    locationPermission:
      (localStorage.getItem(keyNames.LOCATION_PERMISSION) as Permission) ??
      Permission.DEFAULT,
    isoLanguage,
    location,
    name: localStorage.getItem(keyNames.NAME_OF_USER),
  }
}
