import BaseRequest from '../../utils/BaseRequest';
import { UserType } from '../../../constants/GeneralConstants';

export class GetUsersRequest extends BaseRequest {
    typeOfUser: UserType = UserType.GENERAL_USER;

    constructor(userType: UserType) {
        super();
        this.typeOfUser = userType;
    }
}
