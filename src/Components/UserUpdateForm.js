import React, { useState } from 'react'
import Constants from '../utilities/Constants'

export default function UserUpdateForm(props) {
    const initialFormData = Object.freeze({
        id: props.user.id,
        description: props.user.description,
        grade: props.user.grade,
        attendanceStatus: props.user.attendanceStatus
    });

    const [formData, setFormData] = useState(initialFormData);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const command = {
            id: formData.id,
            description: formData.description,
            grade: formData.grade,
            attendanceStatus: formData.attendance
        };

        const url = Constants.API_URL_UPDATE_POST;

        fetch(url, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(command)
        })
            .then(response => response.json())
            .then(responseFromServer => {
                console.log(responseFromServer);
            })
            .catch((error) => {
                console.log(error);
                alert(error);
            });

        props.onuserUpdated(command);
    };

    return (
        <form className="w-100 px-5">

            <div className="mt-5">
                <label className="h3 form-label">id</label>
                <input disabled value={formData.id} name="id" type="text" className="form-control" onChange={handleChange} />
            </div>

            <div className="mt-5">
                <label className="h3 form-label">description</label>
                <input value={formData.description} name="description" type="text" className="form-control" onChange={handleChange} />
            </div>

            <div className="mt-4">
                <label className="h3 form-label">grade</label>
                <input value={formData.grade} name="grade" type="text" className="form-control" onChange={handleChange} />
            </div>

            <div className="mt-4">
                <label className="h3 form-label">attendance</label>
                <input value={formData.attendanceStatus} name="attendance" type="text" className="form-control" onChange={handleChange} />
            </div>

            <button onClick={handleSubmit} className="btn btn-dark btn-lg w-100 mt-5">Submit</button>
            <button onClick={() => props.onuserUpdated(null)} className="btn btn-secondary btn-lg w-100 mt-3">Cancel</button>
        </form>
    );
}
