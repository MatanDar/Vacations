import React from 'react'
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Typography from '@material-ui/core/Typography';
import Follower from './Followers'


export default function UserVacationCard({ vacation, setShow, setVacation }) {
    var dateFormat = require("dateformat");

    return (
        <div className='vacation-row'>
            {vacation.map((item, index) => {
                return item.vacation ? (
                    <Card className='card-root'
                        key={index} >
                        <CardHeader
                            className='vacation-name'
                            style={{ textAlign: 'center' }}
                            title={item.vacation.description}
                            subheader={item.vacation.destination}
                        />
                        <CardMedia
                            className='card-media'
                            image={item.vacation.pics}
                        />
                        <CardContent>
                            <div><span>From: </span>{dateFormat(item.vacation.from_date, "dddd, mmmm d, yyyy")}</div>
                            <div><span>Till: </span>{dateFormat(item.vacation.till_date, "dddd, mmmm d, yyyy")}</div>
                            <Typography
                                variant="body2"
                                color="textSecondary"
                                component="p">
                                Price:{item.vacation.price}
                            </Typography>
                        </CardContent>
                        <CardActions>
                            <Follower
                                setVacation={setVacation}
                                setShow={setShow}
                                vacationId={item.vacation.id}
                                followersArr={item.vacation.followers}
                            />
                            <div>{item.vacation.followers.length}</div>
                        </CardActions>
                    </Card>)
                    :
                    (<Card
                        className='card-root'
                        key={index} >
                        <CardHeader
                            className='vacation-name'
                            style={{ textAlign: 'center' }}
                            title={item.description}
                            subheader={item.destination}
                        />
                        <CardMedia
                            className='card-media'
                            image={item.pics}
                        />
                        <CardContent>
                            <div><span>From: </span>{dateFormat(item.from_date, "dddd, mmmm d, yyyy")}</div>
                            <div><span>Till: </span>{dateFormat(item.till_date, "dddd, mmmm d, yyyy")}</div>
                            <Typography
                                variant="body2"
                                color="textSecondary"
                                component="p">
                                Price:{item.price}
                            </Typography>
                        </CardContent>
                        <CardActions>
                            <Follower
                                setVacation={setVacation}
                                setShow={setShow}
                                vacationId={item.id}
                                followersArr={item.followers}
                            />
                            <div>{item.followers.length}</div>
                        </CardActions>
                    </Card>
                    )
            })}
        </div>
    )
}
