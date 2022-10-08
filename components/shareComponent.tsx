import { Share, View, Button } from 'react-native';
import React from 'react';
export  const  ShareComponent = async ()=>{
   
            try{
             const result =  await Share.share({
                    message:"Test"
                })

                if (result.action === Share.sharedAction) {
                    if (result.activityType) {
                      // shared with activity type of result.activityType
                    } else {
                      // shared
                    }
                  } else if (result.action === Share.dismissedAction) {
                    // dismissed
                  }
            }catch(error){
                alert("There an error, please try again")
            }
    }
