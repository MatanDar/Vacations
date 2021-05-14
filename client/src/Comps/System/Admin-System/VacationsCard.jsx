import React from 'react'
import './style.css';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Typography from '@material-ui/core/Typography';
import EditIcon from '@material-ui/icons/Edit';
import DeleteVacation from './DeleteVacation'
import EditModal from './EditModal'
import ProgressLoad from './ProgressLoad/ProgressLoad'

export default function VacationsCard({editVacation, setEditVacation, setAdminShow, adminVac, setOpen, open, setImage, image }) {
    const [isLoad, setIsLoad] = React.useState(false)
    var dateFormat = require("dateformat");

    const findVacation = async (id) => {
        const find = adminVac.find(vacation => vacation.id === id)
        setEditVacation(find)
        setIsLoad(true)
        setTimeout(() => {
            setOpen(true)
            setIsLoad(false)
        }, 1000);
    }

    return (
        <div className='vacation-row '>
            { open && <EditModal
                editVacation={editVacation}
                setEditVacation={setEditVacation}
                setOpen={setOpen}
                open={open}
                setAdminShow={setAdminShow}
                setImage={setImage}
                image={image}
            />}
            {isLoad ? <ProgressLoad />
                :
                <>
                    {adminVac.map((item, index) => {
                        return (
                            <Card
                                className='card-root fadeInDown'
                                key={index}
                            >
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
                                    <Typography variant="body2" color="textSecondary" component="p">
                                        Price:  {item.price}
                                    </Typography>
                                </CardContent>
                                <CardActions>

                                    <EditIcon
                                        onClick={() => { findVacation(item.id) }}
                                        className='icons'
                                        setImage={setImage}
                                        image={image}
                                    />

                                    <DeleteVacation
                                        setAdminShow={setAdminShow}
                                        vacationId={item.id}
                                        setOpen={setOpen}
                                        className='icons'
                                    />
                                </CardActions>
                            </Card>
                        )
                    })}
                </>}
        </div>
    )
}
