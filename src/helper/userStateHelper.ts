import { useState } from "react"
import { DefaultLoader } from "../loaders/defaultLoader"

export enum Permission {
  DEFAULT = "DEFAULT",
  GRANTED = "GRANTED",
  REJECTED = "REJECTED",
}

export const keyNames = {
  MIC_PERMISSION: "MIC_PERMISSION",
  LOCATION_PERMISSION: "LOCATION_PERMISSION",
  ISO_LANUGUAGE: "ISO_LANUGUAGE",
  NAME_OF_USER: "NAME_OF_USER",
  USER_LOCATION: "USER_LOCATION",
  TAWAF_COUNT: "TAWAF_COUNT",
  SAII_COUNT: "SAII_COUNT",
}

export enum UserScreenOnboarding {
  PERMISSION_SCREEN,
  LANGUAGE_SCREEN,
  NAME_SCREEN,
  READY,
}

export interface Country {
  language: string
  iso: string
  flag: string
}

export interface Location {
  lat: number
  lng: number
}

export function useUserState(defaultLoader: DefaultLoader) {
  const [micPermission, setMicPermission] = useState<Permission>(
    defaultLoader.micPermission
  )
  const [locationPermission, setLocationPermission] = useState<Permission>(
    defaultLoader.locationPermission
  )
  const [isoLanguage, setIsoLanguage] = useState<Country | null>(
    defaultLoader.isoLanguage
  )

  const [location, setLocation] = useState<Location | null>(
    defaultLoader.location
  )

  const [tawafCount, setTawafCount] = useState<string | null>(
    defaultLoader.tawafCount
  )

  const [saiiCount, setSaiiCount] = useState<string | null>(
    defaultLoader.saiiCount
  )

  const [name, setName] = useState<string | null>(defaultLoader.name)

  const setMicPermissionState = (micPermission: Permission) => {
    setMicPermission(micPermission)
    localStorage.setItem(keyNames.MIC_PERMISSION, micPermission)
  }

  const setLocationPermissionState = (locationPermission: Permission) => {
    setLocationPermission(locationPermission)
    localStorage.setItem(keyNames.LOCATION_PERMISSION, locationPermission)
  }

  const setIsoLanguageState = (isoLanguage: Country) => {
    setIsoLanguage(isoLanguage)
    localStorage.setItem(keyNames.ISO_LANUGUAGE, JSON.stringify(isoLanguage))
  }

  const setLocationState = (location: Location) => {
    setLocation(location)
    localStorage.setItem(keyNames.USER_LOCATION, JSON.stringify(location))
  }

  const setTawafCountState = (tawafCount: string) => {
    setTawafCount(tawafCount)
    localStorage.setItem(keyNames.TAWAF_COUNT, tawafCount)
  }

  const setSaiiCountState = (saiiCount: string) => {
    setSaiiCount(saiiCount)
    localStorage.setItem(keyNames.SAII_COUNT, saiiCount)
  }

  const setNameState = (name: string) => {
    setName(name)
    localStorage.setItem(keyNames.NAME_OF_USER, name)
  }

  const getUserScreen = (): UserScreenOnboarding => {
    return computeUserScreen(
      micPermission,
      locationPermission,
      name,
      isoLanguage
    )
  }

  const computeUserScreen = (
    micPermission: Permission,
    locationPermission: Permission,
    name: string | null,
    isoLanguage: Country | null
  ): UserScreenOnboarding => {
    if (
      micPermission === Permission.GRANTED &&
      locationPermission === Permission.GRANTED &&
      name &&
      isoLanguage
    ) {
      return UserScreenOnboarding.READY
    } else if (
      micPermission === Permission.DEFAULT ||
      locationPermission === Permission.DEFAULT
    ) {
      return UserScreenOnboarding.PERMISSION_SCREEN
    } else if (
      micPermission === Permission.REJECTED &&
      locationPermission === Permission.REJECTED
    ) {
      return UserScreenOnboarding.READY
    } else if (!isoLanguage) {
      return UserScreenOnboarding.LANGUAGE_SCREEN
    } else if (!name) {
      return UserScreenOnboarding.NAME_SCREEN
    }

    // By default put them on the first screen
    return UserScreenOnboarding.PERMISSION_SCREEN
  }

  return {
    micPermission,
    locationPermission,
    isoLanguage,
    location,
    name,
    tawafCount,
    saiiCount,
    setMicPermission: setMicPermissionState,
    setLocationPermission: setLocationPermissionState,
    setIsoLanguage: setIsoLanguageState,
    setLocation: setLocationState,
    setName: setNameState,
    setTawafCount: setTawafCountState,
    setSaiiCount: setSaiiCountState,
    getUserScreen,
    computeUserScreen,
  }
}

// const { micPermission, locationPermission, isoLanguage, name, setMicPermission, setLocationPermission, setIsoLanguage, setName, getUserScreen, computeUserScreen } = useUserState(loadedData);
