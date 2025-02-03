import Reactotron from "reactotron-react-native";
import { reactotronRedux } from "reactotron-redux";

const reactotron = Reactotron.configure({
  name: "Shopping app",
  host: "localhost",
})
  .useReactNative({
    devTools: true,
    storybook: true,
    asyncStorage: false, // there are more options to the async storage.
    networking: {
      ignoreUrls: /\/(logs|symbolicate)$/,
      ignoreContentTypes: /^(image)\/.*$/i,
    },
    editor: false, // there are more options to editor
    errors: {
      veto: (frame) =>
        frame.fileName.indexOf("/node_modules/react-native/") >= 0,
    }, // or turn it off with false
    overlay: false, // just turning off overlay
  })
  .use(
    reactotronRedux({
      except: ["EFFECT_TRIGGERED", "EFFECT_RESOLVED", "EFFECT_REJECTED"],
      isActionImportant: (action) => {
        return true;
      },
    })
  )
  .connect();

export default reactotron;
