import React, { useEffect} from 'react'
import { useSelector} from 'react-redux'
import cogoToast from "cogo-toast";
import { selectToastNotification} from "../../../store/misc/common/CommonSelector";
import { NotificationType} from "../../../store/misc/common/general-models/NotificationType";


export const  ToastMessage = ()  => {

    const toastNotification = useSelector(selectToastNotification)


    useEffect(() => {
        if(toastNotification.type === NotificationType.ERROR){
            cogoToast.error(toastNotification.message)
        }
    },[toastNotification])

    return <div></div>


}
