import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import UploadPicture from './UploadPicture'
import { domain } from '../../../config'


const useStyles = makeStyles((theme) => ({
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '-webkit-fill-available'
    },
    paper: {
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    },
}));

export default function EditModal({ open, setOpen, setEditVacation, editVacation, setAdminShow, setImage, image }) {
    const [description, setDescription] = React.useState(editVacation.description)
    const [destination, setDestination] = React.useState(editVacation.destination)
    const [from_date, setFrom_date] = React.useState(editVacation.from_date)
    const [till_date, setTill_date] = React.useState(editVacation.till_date)
    const [price, setPrice] = React.useState(editVacation.price)
    const classes = useStyles();

    const handleClose = () => {
        setOpen(false);
        setEditVacation('')
    };

    const save = async (e) => {
        e.preventDefault()
        if (destination === '' || description === '' || from_date === '' || till_date === '' || price === '') {
            alert('Must Fill all Fields')
            return
        }
        try {
            const res = await fetch(domain + '/update-vacation', {
                method: "PATCH",
                headers: {
                    "Content-type": "application/json"
                },
                body: JSON.stringify({
                    id: editVacation.id,
                    description,
                    destination,
                    image,
                    from_date,
                    till_date,
                    price
                })
            })
            const data = await res.json()
            console.log(data)
            setOpen(false)
            setAdminShow(data)
        }
        catch (err) {
            console.log(err);
        }
    }



    return (
        <div>
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                className={classes.modal}
                open={open}
                onClose={handleClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <Fade in={open}>
                    <div className={classes.paper}>
                        <form className="edit-form">
                            <h4>Edit Vacations:</h4>
                            <div className='wrap-div'>
                                <input
                                    value={description}
                                    onChange={(e) => { setDescription(e.target.value) }} />
                            </div>

                            <div className='wrap-div'>
                                <input
                                    value={destination}
                                    onChange={(e) => { setDestination(e.target.value) }} />
                            </div>
                            <div >
                                <UploadPicture
                                    setImage={setImage}
                                    image={image}
                                    editVacationPics={editVacation.pics}
                                    editVacation={editVacation}
                                />
                            </div >
                            <div className='wrap-div'>
                                <input
                                    type='date'
                                    value={from_date}
                                    onChange={(e) => { setFrom_date(e.target.value) }} />
                            </div>

                            <div className='wrap-div'>
                                <input
                                    type='date'
                                    value={till_date}
                                    onChange={(e) => { setTill_date(e.target.value) }} />
                            </div>

                            <div className='wrap-div'>
                                <input
                                    value={price}
                                    onChange={(e) => { setPrice(e.target.value) }} />
                            </div>
                            <button className='save-btn' type='submit' onClick={save}>Save Change</button>
                        </form>
                    </div>
                </Fade>
            </Modal>
        </div>
    );
}
