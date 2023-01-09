import { RocketType } from '../models/rocket-model';


export const RocketValidators = {
    createUserValidator(rocket: RocketType) {
        if(!rocket.name) {
            return false;
        } 

        return true;
    }
}