

import React, { Component } from 'react';
import {
  Platform,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  NativeModules,
} from 'react-native';
import RtcEngine, {
  RtcLocalView,
  RtcRemoteView,
  VideoRenderMode,
} from 'react-native-agora';
import _ from "lodash";
 var ToastExample = NativeModules.ToastExample;

import requestCameraAndAudioPermission from './Components/Permission';
import styles from './Components/Style';


interface Props {}

/**
 * @property peerIds Array for storing connected peers
 * @property appId
 * @property channelName Channel Name for the current session
 * @property joinSucceed State variable for storing success
 */
interface State {
  appId: string;
  token: null;
  channelName: string;
  joinSucceed: boolean;
  peerIds: number[];
  isHostorAudience:string;

}

export default class App extends Component<Props, State> {
  _engine?: RtcEngine;
  constructor(props) {
    super(props);

    this.state = {
      appId: '9f21bfdc6e1645feac4a70a1b525f0a6',
      token: null,
      channelName: 'tester',
      joinSucceed: false,
      peerIds: [],
      isHostorAudience:'',
    };
    if (Platform.OS === 'android') {
      // Request required permissions from Android
      requestCameraAndAudioPermission().then(() => {
        console.log('requested!');
      });
    }
  }

  componentDidMount() {
    this.init();
  }

  /**
   * @name init
   * @description Function to initialize the Rtc Engine, attach event listeners and actions
   */
  init = async () => {
    const { appId } = this.state;
    this._engine = await RtcEngine.create(appId);
    this._engine.switchCamera()
    await this._engine.enableVideo();

    this._engine.addListener('Warning', (warn) => {
      console.log('Warning', warn);
    });

    this._engine.addListener('Error', (err) => {
      console.log('Error', err);
    });

    // If RemoteUser  joined the RTC channel
    this._engine.addListener('UserJoined', (uid, elapsed) => {
      console.log('UserJoined', uid, elapsed);
      // Get current peer IDs
      //  ToastExample.navigateToExample(this.state.channelName, 'host');
      const { peerIds } = this.state;
      // If new user
      if (peerIds.indexOf(uid) === -1) {
        this.setState({
          // Add peer ID to state array
          peerIds: [...peerIds, uid],
          isHostorAudience:'host',
        }
        ,()=>{
          // console.log(this.state ,"saas")
          // this.state.peerIds.length &&
            // ToastExample.navigateToExample(this.state.channelName, 'host');
        }
        );

      // this.NativeAndroid();

      }
    });

    this._engine.addListener('UserOffline', (uid, reason) => {
      console.log('UserOffline', uid, reason);
      const { peerIds } = this.state;
      this.setState({
        // Remove peer ID from state array
        peerIds: peerIds.filter((id) => id !== uid),
      });
    });

    // If Local user joins RTC channel
    this._engine.addListener('JoinChannelSuccess', (channel, uid, elapsed) => {
      console.log('JoinChannelSuccess', channel, uid, elapsed,this.state.peerIds);
      // Set state variable to true
      this.setState({
        joinSucceed: true,
        isHostorAudience:'consumer',
      },()=>{
        //  ToastExample.navigateToExample(this.state.channelName, 'consumer');

      });

    //  this.NativeAndroid();

    });
  };

  /**
   * @name startCall
   * @description Function to start the call
   */


  startCall = async () => {

    // Join Channel using null token and channel name

    // await this._engine?.joinChannel(
    //   this.state.token,
    //   this.state.channelName,
    //   null,
    //   0
    // );


    if(Platform.OS == "android"){
      ToastExample.navigateToExample(this.state.channelName, 'host');
    }
    else if(Platform.OS == "ios"){
      NativeModules.HelloWorld.construct(this.state.channelName, "host");
    }


  };
  /**
   * @name endCall
   * @description Function to end the call
   */

  endCall = async () => {
    await this._engine?.leaveChannel();
    this.setState({ peerIds: [], joinSucceed: false });

  };


  NativeAndroid =  () => {
      ToastExample.navigateToExample(this.state.channelName, this.state.isHostorAudience);
  }


  render() {
    return (
      <View style={styles.max}>
        <View style={styles.max}>
          <View style={styles.buttonHolder}>
            <TouchableOpacity onPress={this.startCall} style={styles.button}>
              <Text style={styles.buttonText}> Start as Host </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={this.endCall} style={styles.button}>
              <Text style={styles.buttonText}> End Call </Text>
            </TouchableOpacity>
          
          </View>
          {this._renderVideos()}
        </View>
      </View>
    );
  }

  _renderVideos = () => {
    const { joinSucceed } = this.state;
    return joinSucceed ? (
      <View style={styles.fullView}>
        <RtcLocalView.SurfaceView
          style={styles.max}
          channelId={this.state.channelName}
          renderMode={VideoRenderMode.Hidden}
        />
        {this._renderRemoteVideos()}
      </View>
    ) : null;
  };

  _renderRemoteVideos = () => {
    const { peerIds } = this.state;
    return (
      <ScrollView
        style={styles.remoteContainer}
        contentContainerStyle={{ paddingHorizontal: 2.5 }}
        horizontal={true}
      >
        {peerIds.map((value) => {
          return (
            <RtcRemoteView.SurfaceView
              style={styles.remote}
              uid={value}
              channelId={this.state.channelName}
              renderMode={VideoRenderMode.Hidden}
              zOrderMediaOverlay={true}
            />
          );
        })}
      </ScrollView>
    );
  };
}
