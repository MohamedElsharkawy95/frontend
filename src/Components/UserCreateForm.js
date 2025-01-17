import React, { useState } from 'react'
import Constants from '../utilities/Constants'

export default function UserCreateForm(props) {
    const initialFormData = Object.freeze({
        title: "",
        content: ""
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
            description: formData.description,
            grade: formData.grade,
            studentId: formData.studentId,
            classId: formData.classId,
            attendanceStatus: formData.attendance
        };

        const url = Constants.API_URL_CREATE_POST;

        console.log(url);
        console.log("obj", command);

        fetch(url, {
            method: 'post',
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

        props.onuserCreated(command);
    };

    return (
        <form className="w-100 px-5">
            <h1 className="mt-5">Create new activity</h1>

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
                <input value={formData.attendance} name="attendance" type="text" className="form-control" onChange={handleChange} />
            </div>

            <div className="mt-4">
                <label className="h3 form-label">Class</label>
                <input value={formData.classId} name="classId" type="text" className="form-control" onChange={handleChange} />
            </div>

            <div className="mt-4">
                <label className="h3 form-label">staudent</label>
                <input value={formData.studentId} name="studentId" type="text" className="form-control" onChange={handleChange} />
            </div>


            <button onClick={handleSubmit} className="btn btn-dark btn-lg w-100 mt-5">Submit</button>
            <button onClick={() => props.onuserCreated(null)} className="btn btn-secondary btn-lg w-100 mt-3">Cancel</button>
        </form>
    );
}
