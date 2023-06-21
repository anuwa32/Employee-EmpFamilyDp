import { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import styles from "./styles.module.css";

const EmployeeUpdate = () => {

    const birthDate = new Date();
    const getDate = `${birthDate.getFullYear()}-${birthDate.getMonth() + 1}-${birthDate.getDate()}`;  //for date validation

    const navigate = useNavigate();
    const [error, setError] = useState("");

    const [age, setAge] = useState()
    const [code, setCode] = useState()
    const [initials, setInitials] = useState()
    const [firstname, setFirstname] = useState()
    const [surname, setSurname] = useState()
    const [address1, setAddress1] = useState()
    const [address2, setAddress2] = useState()
    const [dob, setDob] = useState()
    const [status, setStatus] = useState()

    const InputCode = (event) => {
        setCode(event.target.value)
    }
    const InputInitials = (event) => {
        setInitials(event.target.value)
    }
    const InputFirstname = (event) => {
        setFirstname(event.target.value)
    }
    const InputSurname = (event) => {
        setSurname(event.target.value)
    }
    const InputAddress1 = (event) => {
        setAddress1(event.target.value)
    }
    const InputAddress2 = (event) => {
        setAddress2(event.target.value)
    }
    const InputDOB = (event) => {
        setDob(event.target.value)
    }
    const InputStatus = (event) => {
        setStatus(event.target.value)
    }

    useEffect(() => {

        const employeeID = JSON.parse(sessionStorage.getItem("empid"));
        console.log("mmmmm", employeeID)
        axios.get("http://localhost:8086/api/empid/" + employeeID.code)

            .then((response) => {
                console.log("aaaemployeeDetails", response)

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
                console.log(error)
            })
    }, []);


    const handleSubmit = async (e) => {

        e.preventDefault();
        try {
            const empDetailsUpdate = {
                code: code,
                initials: initials,
                firstname: firstname,
                surname: surname,
                address1: address1,
                address2: address2,
                dob: dob,
                status: status
            }

            const employeeID = JSON.parse(sessionStorage.getItem("empid"));
            axios.post('http://localhost:8086/api/empid/update-employeedetails/' + employeeID._id, empDetailsUpdate)
            navigate("/empprofile")

                .then(res => {
                    console.log("res", res)
                });

        } catch (error) {

            if (
                error.response &&
                error.response.status >= 400 &&
                error.response.status <= 500
            ) {
                setError(error.response.data.message);
            }
        }
    };


    return (

        <div>
            <div className={styles.employee_container}>
                <div className={styles.employee_form_container}>
                    <div className={styles.colt}></div>
                    <div className={styles.colt2}>
                        <form className={styles.form_container} onSubmit={handleSubmit}>
                            <h3>Employee Details Update</h3>
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
                                title="The employee code cannot be exceeded by 3 characters."
                                type="text"
                                name="code"
                                value={code}
                                onChange={InputCode}
                                className={styles.input}
                            />
                            <input
                                type="text"
                                name="initials"
                                value={initials}
                                onChange={InputInitials}
                                className={styles.input}
                            />
                            <input
                                maxLength="50"
                                type="text"
                                title="The employee firstname cannot be exceeded by 50 characters."
                                name="firstname"
                                value={firstname}
                                onChange={InputFirstname}
                                className={styles.input}
                            />
                            <input
                                maxLength="50"
                                type="text"
                                title="The employee surname cannot be exceeded by 50 characters."
                                name="surname"
                                value={surname}
                                onChange={InputSurname}
                                className={styles.input}
                            />
                            <input
                                maxLength="100"
                                type="text"
                                title="The address 1 cannot be exceeded by 100 characters."
                                name="address1"
                                value={address1}
                                onChange={InputAddress1}
                                className={styles.input}
                            />
                            <input
                                maxLength="100"
                                type="text"
                                name="address2"
                                title="The address 2 cannot be exceeded by 100 characters."
                                value={address2}
                                onChange={InputAddress2}
                                className={styles.input}
                            />
                            <input
                                type="text"
                                max={getDate}
                                name="dob"
                                value={dob}
                                onChange={InputDOB}
                                className={styles.input}
                            />
                            <select
                                name="status"
                                onChange={InputStatus}
                                value={status}
                                className={styles.input}
                            ><option defaultValue >Select</option>
                                <option value="Active">Active</option>
                                <option value="Inactive">Inactive</option>
                            </select>

                            {error && <div className={styles.error}>{error}</div>}
                            <button type="submit" className={styles.btnb}>
                                Update
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>

    );


};
export default EmployeeUpdate;