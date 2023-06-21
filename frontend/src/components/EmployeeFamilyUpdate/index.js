import { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import styles from "./styles.module.css";

const EmployeeUpdate = () => {

    // const [data, setData] = useState({
    //     code: "",
    //     firstname: "",
    //     surname: "",
    //     relationship: "",
    // });


    const navigate = useNavigate();
    const [error, setError] = useState("");

    const [code, setCode] = useState()
    const [firstname, setFirstname] = useState()
    const [surname, setSurname] = useState()
    const [relationship, setRelationship] = useState()

    const InputCode = (event) => {
        setCode(event.target.value)
    }
    const InputFirstname = (event) => {
        setFirstname(event.target.value)
    }
    const InputSurname = (event) => {
        setSurname(event.target.value)
    }
    const InputRelationship = (event) => {
        setRelationship(event.target.value)
    }
    useEffect(() => {

        const employeeFamID = JSON.parse(sessionStorage.getItem("empfamilyid"));
        console.log("dddd", employeeFamID)
        axios.get("http://localhost:8086/api/empfamilyid/" + employeeFamID.code)

            .then((response) => {

                setCode(response.data[0].code)
                setFirstname(response.data[0].firstname)
                setSurname(response.data[0].surname)
                setRelationship(response.data[0].relationship)

                console.log(response.data)

            })

            .catch(function (error) {
                console.log(error)
            })
    }, []);

    const handleSubmit = async (e) => {

        e.preventDefault();
        try {
            const empFamilyDetailsUpdate = {
                code: code,
                firstname: firstname,
                surname: surname,
                relationship: relationship
            }

            const employeeFamID = JSON.parse(sessionStorage.getItem("empfamilyid"));
            axios.post('http://localhost:8086/api/empfamilyid/update-employeefamilydetails/' + employeeFamID._id, empFamilyDetailsUpdate)
            navigate("/empfamilyprofile")

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
                        <form className={styles.form_container} onSubmit = {handleSubmit}>
                            <h3>Update Employee Family Details</h3>
                            <br></br>
                            <input
                                maxLength="3"
                                readOnly
                                type="text"
                                name="code"
                                value={code}
                                onChange= {InputCode}
                                className={styles.input}
                            />
                            <input
                                maxLength="50"
                                title="The firstname cannot be exceeded by 50 characters."
                                type="text"
                                name="firstname"
                                value={firstname}
                                onChange = {InputFirstname}
                                className={styles.input}
                            />
                            <input
                                maxLength="50"
                                title="The lastname cannot be exceeded by 50 characters."
                                type="text"
                                name="surname"
                                value={surname}
                                onChange={InputSurname}
                                className={styles.input}
                            />

                            <input
                                type="text"
                                name="relationship"
                                value={relationship}
                                onChange = {InputRelationship}
                                className={styles.input}
                            />
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