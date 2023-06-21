import { Link,useNavigate } from "react-router-dom";
import styles from "./styles.module.css";
import axios from "axios";
import React, { useState, useEffect } from "react";


const Profile = () => {

    const [age, setAge] = useState()
    const [code, setCode] = useState()
    const [initials, setInitials] = useState()
    const [firstname, setFirstname] = useState()
    const [surname, setSurname] = useState()
    const [address1, setAddress1] = useState()
    const [address2, setAddress2] = useState()
    const [dob, setDob] = useState()
    const [status, setStatus] = useState()

    const navigate = useNavigate();

    const deleteEmployee = () => {  //delete employee data
        const confirmBox = window.confirm(
            "Are you sure want to delete your account?"
        )
        if (confirmBox === true) {
            //const employeefamID = JSON.parse(sessionStorage.getItem("empfamilyid"));
            const employeeID = JSON.parse(sessionStorage.getItem("empid"));
            axios.delete("http://localhost:8086/api/empid/" + employeeID._id)
            //axios.delete("http://localhost:8086/api/empfamilyid/" + employeefamID._id)

                .then((res) => {
                    alert("Your account is successfully deleted");
                });
        }
        //navigate("/")
        window.location = "/"
    }

    useEffect(() => {

        const employeeID = JSON.parse(sessionStorage.getItem("empid"));
        console.log("empdetails", employeeID)
        axios.get("http://localhost:8086/api/empid/" + employeeID.code)

            .then((response) => {
                console.log("getUserDetails", response)
                console.log("EmpFrstname",response.data.employeeDetails[0].firstname )

                setAge(response.data.employeeAge)
                setCode(response.data.employeeDetails[0].code)
                setInitials(response.data.employeeDetails[0].initials)
                setFirstname(response.data.employeeDetails[0].firstname)
                setSurname(response.data.employeeDetails[0].surname)
                setAddress1(response.data.employeeDetails[0].address1)
                setAddress2(response.data.employeeDetails[0].address2)
                setDob(response.data.employeeDetails[0].dob)
                setStatus(response.data.employeeDetails[0].status)

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
                            <h3>Employee Profile</h3>
                            <br></br>
                            <input
                                readOnly
                                type="text"
                                name="age"
                                value={age}
                                className={styles.input}
                            />
                            <input
                                readOnly
                                type="text"
                                name="code"
                                value={code}
                                className={styles.input}
                            />
                            <input
                                type="text"
                                name="initials"
                                value={initials}
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
                                name="address1"
                                value={address1}
                                className={styles.input}
                            />
                            <input
                                type="text"
                                name="address2"
                                value={address2}
                                className={styles.input}
                            />
                            <input
                                type="text"
                                name="dob"
                                value={dob} //.split("T")[0]
                                className={styles.input}
                            />
                            <input
                                type="text"
                                name="status"
                                value={status}
                                className={styles.input}
                            />

                        </form>
                    </div>
                </div>
            </div>

            <Link to="/empupdate">
                <button type="button" className={styles.update_btn}>
                    Update
                </button>
            </Link>

            <Link>
                <button onClick={deleteEmployee} type="button" className={styles.delete_btn}>
                    Delete
                </button>
            </Link>

            <Link to="/empid">
                <button type="button" className={styles.back_btn1}>
                    Back
                </button>
            </Link>

        </div>
    );

}
export default Profile;