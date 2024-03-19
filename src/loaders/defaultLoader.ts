import { Permission, keyNames } from "../helper/userStateHelper";

export interface DefaultLoader {
  micPermission: Permission;
  locationPermission: Permission;
  isoLanguage: string | null;
  name: string | null;
}

export default async function loader(): Promise<DefaultLoader> {
  return {
    micPermission:
      (localStorage.getItem(keyNames.MIC_PERMISSION) as Permission) ??
      Permission.DEFAULT,
    locationPermission:
      (localStorage.getItem(keyNames.LOCATION_PERMISSION) as Permission) ??
      Permission.DEFAULT,
    isoLanguage: localStorage.getItem(keyNames.ISO_LANUGUAGE),
    name: localStorage.getItem(keyNames.NAME_OF_USER),
  };
}
