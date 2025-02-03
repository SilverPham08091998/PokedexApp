declare module "react-native-config" {
  export interface NativeConfig {
    ENV?: string;
    BUNDLE_ANDROID_ID?: string;
    BUNDLE_IOS_ID?: string;
    APP_NAME?: string;
    APP_CENTER_API_TOKEN?: string;
    APP_CENTER_OWNER_NAME?: string;
    APP_CENTER_OWNER_TYPE?: string;
    APP_CENTER_APP_NAME_ANDROID?: string;
    APP_CENTER_APP_NAME_IOS?: string;
    APK_LINK_ANDROID?: string;
    APP_CENTER_DEPLOYMENT?: string;
    DEEPLINK?: string;
    ANDROID_CODE_PUSH_DEPLOYMENT_KEY?: string;
    IOS_CODE_PUSH_DEPLOYMENT_KEY?: string;
    API_URL?: string;
    API_KEY?: string;
  }

  export const Config: NativeConfig;
  export default Config;
}
