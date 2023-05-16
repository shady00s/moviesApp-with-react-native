import AsyncStorage from "@react-native-async-storage/async-storage"

class StorageManagerHandeler {
  static  getPageData = async (pageId: string) => {
        try {
            await AsyncStorage.getItem(pageId, ((error, result) => {
                if (error) {
                    return false
                } else {
                    return result
                }
            }))
        } catch (error) {
            console.log(error);
            return false
        }

    }

   static setPageData = async (pageId: string, pageData: string) => {
        try {
            await AsyncStorage.setItem(pageId, pageData, (error => {
                if (error) {
                    console.log(error);
                    return false
                }

                console.log("added to storage.");
            }))
        } catch (err) {
            console.log(err);

        }


    }

   static getStorageDetails = async ()=> {
        await AsyncStorage.getItem("userData",(err=>{
            if(err){

                console.log(err);
            }
        })).then(data=>{
            console.log(data);
        })
    }
}

export default StorageManagerHandeler;