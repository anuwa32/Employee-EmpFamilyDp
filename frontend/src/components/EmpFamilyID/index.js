import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import styles from "./styles.module.css";
import Sidebar from "../Sidebar";

const EmpID = () => {
    const [data, setData] = useState({
        _id: "",
        code: "",
    });

    function refreshPage() {
        window.location.reload(false);
    }

    const [error, setError] = useState("");

    const handleChange = ({ currentTarget: input }) => {
        setData({ ...data, [input.name]: input.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const url = "http://localhost:8086/api/empfamilyid/insert-employeefamilyid";
            const { data: res } = await axios.post(url, data);
            console.log("ddd", res);
            console.log("DDD ID", res.employeefam.code);
            window.sessionStorage.setItem("empfamilyid", JSON.stringify(res.employeefam));
            window.location = "/empfamilyprofile";
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
            <Sidebar />
            <div className={styles.employee_container}>
                <div className={styles.employee_form_container}>
                    <div className={styles.colt}></div>
                    <div className={styles.colt2}>
                        <form className={styles.form_container} onSubmit={handleSubmit}>
                            <h3>Employee Family Details</h3>
                            <br></br>
                            <br></br>
                            <input
                                type="text"
                                placeholder="Employee Id"
                                name="code"
                                onChange={handleChange}
                                value={data.code}
                                required
                                className={styles.input}
                            />

                            {error && <div className={styles.error}>{error}</div>}

                            <button type="submit" className={styles.btnb}>
                                Save
                            </button>
                        </form>
                    </div>
                </div>
            </div>

            <Link to="">
                <button type="button" onClick={refreshPage} className={styles.clear_btn}>
                    Clear
                </button>
            </Link>

        </div>
    );

};

export default EmpID;
