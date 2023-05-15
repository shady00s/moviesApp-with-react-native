import AsyncStorage from "@react-native-async-storage/async-storage"

class StorageManagerHandeler {
    getPageData = async (pageId: string) => {
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

    setPageData = async (pageId: string, pageData: string) => {
        try {
            await AsyncStorage.setItem(pageId, pageData, (error => {
                if (error) {
                    console.log(error);
                    return false
                }
            }))
        } catch (err) {
            console.log(err);

        }


    }
}

export default StorageManagerHandeler;