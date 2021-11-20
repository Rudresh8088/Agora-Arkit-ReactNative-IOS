// ToastModule.java

package com.awesomeproject;

import android.app.Activity;
import android.content.Intent;
import android.util.Log;
import android.widget.Toast;

import com.awesomeproject.ChannelActivity;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

import java.util.HashMap;
import java.util.Map;


public class ToastModule extends ReactContextBaseJavaModule {
  private static ReactApplicationContext reactContext;

  private static final String DURATION_SHORT_KEY = "SHORT";
  private static final String DURATION_LONG_KEY = "LONG";

  public ToastModule(ReactApplicationContext context) {
    super(context);
    reactContext = context;
  }

  @Override
  public String getName() {
    return "ToastExample";
  }

    @Override
  public Map<String, Object> getConstants() {
    final Map<String, Object> constants = new HashMap<>();
    constants.put(DURATION_SHORT_KEY, Toast.LENGTH_SHORT);
    constants.put(DURATION_LONG_KEY, Toast.LENGTH_LONG);
    return constants;
  }
  
    @ReactMethod
  public void show(String message, int duration) {
    Toast.makeText(getReactApplicationContext(), message, duration).show();
  }



//    @ReactMethod
//    public void myMethod(String name, String location) {
//        Log.d("CalendarModule", "Create event called with name: " + name   + " and location: " + location);
//    }


//   @ReactMethod
//  public void navigateToExample(String channelName, String hostName) {
//       Log.d("NativeModuleData", "ChannelName: " + channelName   + " and hostName: " + hostName);
//
//       Activity activity = getCurrentActivity();
//        if (activity != null) {
    //            Intent intent = new Intent(activity, ChannelActivity.class);

//            Intent intent = new Intent(activity, AgoraARStreamerActivity.class);
//            activity.startActivity(intent);
//
//            if (channelName != null && hostName != null){
//             if (hostName == "Host") {
//
//             } else if (hostName == "Audience") {
//
//             }
//
//            }
//        }
//    }



    @ReactMethod
    public void navigateToExample(String channelName, String person) {
        Activity activity = getCurrentActivity();
        Log.d("hander",activity.toString());
        Log.d("hander",person.toString());
        Log.d("hander",person.toString());
        if (activity != null) {
            if(person.equals("consumer")){
                Log.d("hander1",channelName.toString());
                Intent intent2 = new Intent(activity, AgoraARStreamerActivity.class);
                intent2.putExtra("ChannelName", channelName);
                activity.startActivity(intent2);

            }
            if(person.equals("host")){
                Intent intent = new Intent(activity, AgoraARAudienceActivity.class);
                intent.putExtra("ChannelName", channelName);
                activity.startActivity(intent);
            }
            //  Intent intent = new Intent(activity, MainActivity2.class);
            // Intent intent = new Intent(activity, ChannelActivity.class);

            // activity.startActivity(intent);
        }
    }




}


  