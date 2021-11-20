//
//  HelloWorld.swift
//  AwesomeProject
//
//  Created by Rudresh Uppin on 18/11/21.
//

import Foundation

import UIKit

@objc(HelloWorld)

class HelloWorld: NSObject, RCTBridgeModule{

  static func moduleName() -> String!{
    return "HelloWorld";
  }
  
  //  weak var controller: ViewController?
  
  static func requireMainQueueSetup () -> Bool {
    return true;
  }
  
  var controller = ViewController()
  
  @objc
  func construct(_ channelName: String,isHostOrAudience: String) {
    
    print("channelName",channelName)
    print("isHostOrAudience",isHostOrAudience)
    DispatchQueue.main.async {
//      if isHostOrAudience == "host" {
//        self.controller.joinRemoteSessionCheck(channelName)
//      } else if isHostOrAudience == "consumer" {
//        self.controller.createSessionHost(channelName)//
//      }
      
      self.controller.joinRemoteSessionCheck(channelName)
      
    }
   
    
  }
  
  @objc func constuct(_ name: String,name1: String,name2: String){
    print("channelName",name)
  }
  
  @objc
  func ShowMessage(_ message:NSString, duration:Double) -> Void {
    let alert = UIAlertController(title:nil, message: message as String, preferredStyle: .alert);
    let seconds:Double = duration;
  
    
    DispatchQueue.main.async {
      //      (UIApplication.shared.delegate as? AppDelegate)?.window.rootViewController?.present(alert, animated: true, completion: nil);
      
      let storyboard = UIStoryboard(name: "ViewController", bundle: nil)
      
      if let vc = storyboard.instantiateViewController(withIdentifier: "ViewController") as? ViewController {
        let appDelegate = UIApplication.shared.delegate as! AppDelegate
        appDelegate.window?.rootViewController = vc
      }
      
      
      
    }
    
    
    
    DispatchQueue.main.asyncAfter(deadline: DispatchTime.now() + seconds, execute: {
      alert.dismiss(animated: true, completion: nil);
    })
    
    
  }
}
