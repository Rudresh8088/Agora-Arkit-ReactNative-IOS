
// import React from 'react';
// import type {Node} from 'react';
// import {
//   SafeAreaView,
//   ScrollView,
//   StatusBar,
//   StyleSheet,
//   Text,
//   useColorScheme,
//   View,
// } from 'react-native';

// import {
//   Colors,
//   DebugInstructions,
//   Header,
//   LearnMoreLinks,
//   ReloadInstructions,
// } from 'react-native/Libraries/NewAppScreen';

// const Section = ({children, title}): Node => {
//   const isDarkMode = useColorScheme() === 'dark';
//   return (
//     <View style={styles.sectionContainer}>
//       <Text
//         style={[
//           styles.sectionTitle,
//           {
//             color: isDarkMode ? Colors.white : Colors.black,
//           },
//         ]}>
//         {title}
//       </Text>
//       <Text
//         style={[
//           styles.sectionDescription,
//           {
//             color: isDarkMode ? Colors.light : Colors.dark,
//           },
//         ]}>
//         {children}
//       </Text>
//     </View>
//   );
// };

// const App: () => Node = () => {
//   const isDarkMode = useColorScheme() === 'dark';

//   const backgroundStyle = {
//     backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
//   };

//   return (
//     <SafeAreaView style={backgroundStyle}>
//       <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
//       <ScrollView
//         contentInsetAdjustmentBehavior="automatic"
//         style={backgroundStyle}>
//         <Header />
//         <View
//           style={{
//             backgroundColor: isDarkMode ? Colors.black : Colors.white,
//           }}>
//           <Section title="Step One">
//             Edit <Text style={styles.highlight}>App.js</Text> to change this
//             screen and then come back to see your edits.
//           </Section>
//           <Section title="See Your Changes">
//             <ReloadInstructions />
//           </Section>
//           <Section title="Debug">
//             <DebugInstructions />
//           </Section>
//           <Section title="Learn More">
//             Read the docs to discover what to do next:
//           </Section>
//           <LearnMoreLinks />
//         </View>
//       </ScrollView>
//     </SafeAreaView>
//   );
// };

// const styles = StyleSheet.create({
//   sectionContainer: {
//     marginTop: 32,
//     paddingHorizontal: 24,
//   },
//   sectionTitle: {
//     fontSize: 24,
//     fontWeight: '600',
//   },
//   sectionDescription: {
//     marginTop: 8,
//     fontSize: 18,
//     fontWeight: '400',
//   },
//   highlight: {
//     fontWeight: '700',
//   },
// });

// export default App;





import React , {useState} from 'react';
import { StyleSheet, Text, View , Button ,NativeModules, Platform } from 'react-native';
var ToastExample = NativeModules.ToastExample;

// const HelloWorld = NativeModules.HelloWorldModule;


export default function App() {
  const [count , setcount] = useState(0);
  const changeCount = () => {
   // setcount(count + 1);
    return alert('Hello ReactNative')
  }
  return (
    <View style={styles.container}>
        {/* <Text style={styles.text}>{count}</Text>
        <Button
          title={"Click Me"}
          onPress={changeCount}
        /> */}


   <Button  onPress={() => { 
                      // ToastExample.show('Hello This is from Android',ToastExample.SHORT)
                       ToastExample.navigateToExample()

                     

                      }}  
                      
                title="Click Me"/>

    </View>
  );
}
  
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text : {
    fontSize : 40,
    marginBottom : 30
  }
});




// import React, { Component } from 'react';
// import {
//   Platform,
//   ScrollView,
//   Text,
//   TouchableOpacity,
//   View,
//   NativeModules,
// } from 'react-native';
// import RtcEngine, {
//   RtcLocalView,
//   RtcRemoteView,
//   VideoRenderMode,
// } from 'react-native-agora';
//  var ToastExample = NativeModules.ToastExample;

// import requestCameraAndAudioPermission from './components/Permission';
// import styles from './components/Style';
// const { SwiftComponentManager } = NativeModules
// const { CalendarModule } = NativeModules;
// interface Props {}

// /**
//  * @property peerIds Array for storing connected peers
//  * @property appId
//  * @property channelName Channel Name for the current session
//  * @property joinSucceed State variable for storing success
//  */
// interface State {
//   appId: string;
//   token: null;
//   channelName: string;
//   joinSucceed: boolean;
//   peerIds: number[];
// }

// export default class App extends Component<Props, State> {
//   _engine?: RtcEngine;

//   constructor(props) {
//     super(props);
//     this.state = {
//       appId: '6540a71b7828411d8ab5b45be5a6938f',
//       token: null,
//       channelName: 'Test',
//       joinSucceed: false,
//       peerIds: [],
//     };
//     if (Platform.OS === 'android') {
//       // Request required permissions from Android
//       requestCameraAndAudioPermission().then(() => {
//         console.log('requested!');
//       });
//     }
//   }

//   componentDidMount() {
//     this.init();
//   }

//   /**
//    * @name init
//    * @description Function to initialize the Rtc Engine, attach event listeners and actions
//    */
//   init = async () => {
//     const { appId } = this.state;
//     this._engine = await RtcEngine.create(appId);
//     await this._engine.enableVideo();

//     this._engine.addListener('Warning', (warn) => {
//       console.log('Warning', warn);
//     });

//     this._engine.addListener('Error', (err) => {
//       console.log('Error', err);
//     });

//     // If RemoteUser  joined the RTC channel
//     this._engine.addListener('UserJoined', (uid, elapsed) => {
//       console.log('UserJoined', uid, elapsed);
//       // Get current peer IDs
//       const { peerIds } = this.state;
//       // If new user
//       if (peerIds.indexOf(uid) === -1) {
//         this.setState({
//           // Add peer ID to state array
//           peerIds: [...peerIds, uid],
//         });
//       }
//     });

//     this._engine.addListener('UserOffline', (uid, reason) => {
//       console.log('UserOffline', uid, reason);
//       const { peerIds } = this.state;
//       this.setState({
//         // Remove peer ID from state array
//         peerIds: peerIds.filter((id) => id !== uid),
//       });
//     });

//     // If Local user joins RTC channel
//     this._engine.addListener('JoinChannelSuccess', (channel, uid, elapsed) => {
//       console.log('JoinChannelSuccess', channel, uid, elapsed);
//       // Set state variable to true
//       this.setState({
//         joinSucceed: true,
//       });
//     });
//   };

//   /**
//    * @name startCall
//    * @description Function to start the call
//    */
//   startCall = async () => {
//     // Join Channel using null token and channel name
//     await this._engine?.joinChannel(
//       this.state.token,
//       this.state.channelName,
//       null,
//       0
//     );
//     // SwiftComponentManager.passValueFromReact(this.state.channelName)
    
//     // if(Platform.OS == "android"){
//     //   NativeModules.HelloWorldModule.ShowMessage("This is first time we are creating bridge. :)", 5000);
//     // }
//     // else if(Platform.OS == "ios"){
//     //   SwiftComponentManager.passValueFromReact(this.state.channelName)
//     // }

//   };

//   /**
//    * @name endCall
//    * @description Function to end the call
//    */
//   endCall = async () => {
//     await this._engine?.leaveChannel();
//     this.setState({ peerIds: [], joinSucceed: false });
//   };

//   // startCall = async () => {
//   //   "some url string",
//   //   { artist: "Bruce Springsteen", title: "Born in the USA" },
//   //   [{ url: "url", type: "image" },
//   //    { url: "another url", type: "link" }]
  
//   // }
//   NativeAndroid = async () => {
//     // NativeModules.HelloWorldModule.myMethod("bridge.");

//     // if(Platform.OS == "android"){      

//     // }
//     // else if(Platform.OS == "ios"){
//     //   SwiftComponentManager.passValueFromReact(this.state.channelName)
//     // }


//     //  NativeModules.HelloWorldModule.ShowMessage("This is first time we are creating bridge. :)", 5000);

//     // NativeModules.HelloWorldModule.myMethod('channelname', 'host');



//                            ToastExample.navigateToExample()

//   }


//   render() {
//     return (
//       <View style={styles.max}>
//         <View style={styles.max}>
//           <View style={styles.buttonHolder}>
//             <TouchableOpacity onPress={this.startCall} style={styles.button}>
//               <Text style={styles.buttonText}> Start Call </Text>
//             </TouchableOpacity>
//             <TouchableOpacity onPress={this.endCall} style={styles.button}>
//               <Text style={styles.buttonText}> End Call </Text>
//             </TouchableOpacity>
//             <TouchableOpacity onPress={this.NativeAndroid} style={styles.button}>
//               <Text style={styles.buttonText}> Native Android</Text>
//             </TouchableOpacity>
//           </View>
//           {this._renderVideos()}
//         </View>
//       </View>
//     );
//   }

//   _renderVideos = () => {
//     const { joinSucceed } = this.state;
//     return joinSucceed ? (
//       <View style={styles.fullView}>
//         <RtcLocalView.SurfaceView
//           style={styles.max}
//           channelId={this.state.channelName}
//           renderMode={VideoRenderMode.Hidden}
//         />
//         {this._renderRemoteVideos()}
//       </View>
//     ) : null;
//   };

//   _renderRemoteVideos = () => {
//     const { peerIds } = this.state;
//     return (
//       <ScrollView
//         style={styles.remoteContainer}
//         contentContainerStyle={{ paddingHorizontal: 2.5 }}
//         horizontal={true}
//       >
//         {peerIds.map((value) => {
//           return (
//             <RtcRemoteView.SurfaceView
//               style={styles.remote}
//               uid={value}
//               channelId={this.state.channelName}
//               renderMode={VideoRenderMode.Hidden}
//               zOrderMediaOverlay={true}
//             />
//           );
//         })}
//       </ScrollView>
//     );
//   };
// }
