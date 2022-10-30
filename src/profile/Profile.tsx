import React, {useEffect} from "react";
import {useAuth0} from "@auth0/auth0-react";

const Profile = () => {
    const {user, isAuthenticated, isLoading} = useAuth0();

    if (isLoading) {
        return <div>Loading ...</div>;
    }

    return (
        <div>
            {

                isAuthenticated
                    ?
                    <div style={{display: "flex", flexDirection: "row", alignItems: "center"}}>
                        <img style={{marginRight: 5}} src={user!.picture} alt={user!.name} width={25} height={25}/>
                        {user!.email}
                    </div>
                    :
                    null
            }
        </div>
    );
};

export default Profile;
