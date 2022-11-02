import { Link, useNavigate } from "react-router-dom";
import styles from "./styles.module.css";
import axios from "axios";
import React, { useState, useEffect } from "react";

const Profile = () => {

    const [code, setCode] = useState()
    const [firstname, setFirstname] = useState()
    const [surname, setSurname] = useState()
    const [relationship, setRelationship] = useState()

    const navigate = useNavigate();

    const deleteEmployeeFamilyDt = () => {  //delete employee family details
        const confirmBox = window.confirm(
            "Are you sure want to delete your family details account?"
        )
        if (confirmBox === true) {
            const employeefamID = JSON.parse(sessionStorage.getItem("empfamilyid"));
            axios.delete("http://localhost:8086/api/empfamilyid/" + employeefamID._id)

                .then((res) => {
                    alert("Your account is successfully deleted");
                });
        }
        //navigate("/empfamid")
        window.location = "/empfamid"
    }

    useEffect(() => {

        const employeefamID = JSON.parse(sessionStorage.getItem("empfamilyid"));
        console.log("TTTT", employeefamID)

        axios.get("http://localhost:8086/api/empfamilyid/" + employeefamID.code)


            .then((response) => {
                console.log("family", response)

                setCode(response.data[0].code)
                setFirstname(response.data[0].firstname)
                setSurname(response.data[0].surname)
                setRelationship(response.data[0].relationship)

                console.log(response.data)
            })

            .catch(function (error) {
                console.log(error);
            });
    }, []);

    return (

        <div>
            <div className={styles.employee_container}>
                <div className={styles.employee_form_container}>
                    <div className={styles.colt}></div>
                    <div className={styles.colt2}>
                        <form className={styles.form_container}>
                            <h3>Employee Family Details</h3>
                            <br></br>
                            <input
                                readOnly
                                type="text"
                                name="code"
                                value={code}
                                className={styles.input}
                            />
                            <input
                                type="text"
                                name="firstname"
                                value={firstname}
                                className={styles.input}
                            />
                            <input
                                type="text"
                                name="surname"
                                value={surname}
                                required
                                className={styles.input}
                            />
                            <input
                                type="text"
                                name="relationship"
                                value={relationship}
                                className={styles.input}
                            />

                        </form>
                    </div>
                </div>
            </div>

            <Link to="/empfamilyupdate">
                <button type="button" className={styles.update_btn}>
                    Update
                </button>
            </Link>

            <Link>
                <button onClick={deleteEmployeeFamilyDt} type="button" className={styles.delete_btn}>
                    Delete
                </button>
            </Link>

            <Link to="/empfamid">
                <button type="button" className={styles.back_btn1}>
                    back
                </button>
            </Link>

        </div>
    );

}
export default Profile;