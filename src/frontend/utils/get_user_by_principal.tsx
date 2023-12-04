import {useSelector} from "react-redux";
import {User} from "../../declarations/user_canister/user_canister.did";

function useGetUser() {
    const {profile, all_friends} = useSelector((state: any) => state.filesReducer);
    let users = [...all_friends, profile];

    function getUser(userId: string): String | null {
        const friend = users.find((f) => f.id == userId.toString())
        return friend ? friend.name : null;
    }

    // make a function that get return the user principal by getting name as input
    function getUserByName(name: string): User | null {
        return users.find((f) => f.name == name)
    }

    return {getUser, getUserByName}
}

export default useGetUser;