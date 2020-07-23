import { AsyncStorage }from 'react-native'
import { Notifications, Permission} from 'expo'

const NOTIFICATION_KEY='IdaciMobileFlashcards:notifications'

export function handleSetLocalNotification() {
  clearLocalNotification()
  .then(setLocalNotification)
}

export function clearLocalNotification() {
  return AsyncStorage.removeItem(NOTIFICATION_KEY)
  .then(Notifications.cancelAllScheduledNotificationsAsync)
}

function createNotification(){
  return {
    title:'Quiz Time',
    body:'dont forget to take a quiz today',
    android:{
      sound:true,
      priority:'high',
      sticky:false,
      vibrate:true,

    }
  }
}
export function setLocalNotification(){
  AsyncStorage.getItem(NOTIFICATION_KEY)
  .then(JSON.parse)
  .then((data)=>{
    if (data === null){
      Permission.askAsync(Permission.NOTIFICATIONS)
      .then(({status})=>{
        if(status === 'granted'){
          Notifications.cancelAllScheduledNotificationsAsync()

            let tomorrow = new Date()
            tomorrow.setDate(tomorrow.getDate() + 1)
            tomorrow.setHours(20)
            tomorrow.setMinutes(0)

            Notifications.scheduleLocalNotificationAsync(
              createNotification(),
              {
                time:tomorrow,
                repeat:'day',
              }
            )

            AsyncStorage.setItem(NOTIFICATION_KEY,JSON.stringify(true))
        }
      })
    }
  })
}