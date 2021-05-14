import React from 'react'
import LoadPic from './LoadPic'

export default function UploadPicture({ editVacation, editVacationPics, setImage, image }) {
    const [loading, setLoading] = React.useState(false)
    const [currrntPic, setCurrrntPic] = React.useState(false)

    const uploadImage = async e => {
        const files = e.target.files
        const data = new FormData()
        data.append('file', files[0])
        data.append('upload_preset', 'Vacation-app')
        setLoading(true)
        try {
            const res = await fetch('https://api.cloudinary.com/v1_1/dac31pka6/image/upload',
                {
                    method: 'POST',
                    body: data
                })
            const file = await res.json()
            console.log(file);
            setImage(file.secure_url)
            setLoading(false)
            setCurrrntPic(true)
        }
        catch (err) {
            console.log(err);
        }
    }
    return (
        <div className='uplouad-wrap'>
            <label className='upload-profle-pic-label new-pic' for='file-upload'>Add Picture</label>
            <br />
            <input
                id='file-upload'
                className='addPic-input'
                type='file'
                name='file'
                placeholder='New Picture'
                onChange={uploadImage}
            />
            {loading ?
                <LoadPic />
                :
                <>
                    { currrntPic ?
                        <img className='add-pic' src={image} />
                        :
                        <img className="image" src={editVacation.pics} />}
                </>
            }

        </div>
    )
}
