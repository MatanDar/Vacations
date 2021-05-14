import React from 'react'
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import FavoriteIcon from '@material-ui/icons/Favorite';
import { domain } from '../../../../config'


export default function Followers({ vacationId, followersArr, setShow }) {
    const [isFollow, setIsFollow] = React.useState()
    const user = JSON.parse(localStorage.getItem('user'))

    React.useEffect(() => {
        const found = followersArr.find(follow => follow.user_id === user.id)
        setIsFollow(found)
        console.log(found);
    }, [followersArr])

    const follow = async () => {
        try {
            const res = await fetch(domain + '/add-follow', {
                method: "POST",
                headers: {
                    "Content-type": "application/json"
                },
                body: JSON.stringify({
                    vacationId,
                    userId: user.id
                })
            })
            const data = await res.json()
            setShow(followersArr)
            setIsFollow(!isFollow)
        }
        catch (err) {
            console.log(err);
        }
    }
    
    return (
        <div>
            {!isFollow ?
                <FavoriteBorderIcon
                    onClick={follow}
                />
                :
                <FavoriteIcon
                    onClick={follow}
                />
            }
        </div>
    )
}
