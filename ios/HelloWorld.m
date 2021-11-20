//
//  HelloWorld.m
//  AwesomeProject
//
//  Created by Rudresh Uppin on 18/11/21.
//

#import <Foundation/Foundation.h>
#import <React/RCTBridgeModule.h>

@interface RCT_EXTERN_MODULE(HelloWorld, NSObject)
RCT_EXTERN_METHOD(ShowMessage:(NSString *)message duration:(double *)duration)
RCT_EXTERN_METHOD(construct:(NSString *)channelName isHostOrAudience:(NSString *)isHostOrAudience)

//RCT_EXTERN_METHOD(construct:(NSString *)name name1:(NSString *)name1 name2:(NSString *)name2)

@end
