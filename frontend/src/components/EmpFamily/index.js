import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import styles from "./styles.module.css";
import Sidebar from "../Sidebar";

const EmployeeFamily = () => {
    const [data, setData] = useState({
        code: "",
        firstname: "",
        surname: "",
        relationship: "",
        tnumber:"",
    });

function refreshPage() {
    window.location.reload(false);
} 

const [error, setError] = useState("");
const navigate = useNavigate();

const handleChange = ({ currentTarget: input }) => {
  setData({ ...data, [input.name]: input.value });
};

const handleSubmit = async (e) => {

    e.preventDefault();
    try {
      const url = "http://localhost:8086/api/empfamily";
      const { data: res } = await axios.post(url, data);
      navigate("/");
      console.log(res.message);
      console.log(res.data);
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
    <div className={styles.empfamily_container}>
      <div className={styles.empfamily_form_container}>
        <div className={styles.colt}></div>
        <div className={styles.colt2}>
          <form className={styles.form_container} onSubmit={handleSubmit}>
            <h3>Employee Family Details</h3>
            <br></br>
            <input
              maxLength="3"
              type="text"
              placeholder="Employee Code"
              name="code"
              onChange={handleChange}
              value={data.code}
              required
              className={styles.input}
            />
            <input
              maxLength="50"
              type="text"
              placeholder="Firstname"
              name="firstname"
              onChange={handleChange}
              value={data.firstname}
              required
              className={styles.input}
            />
            <input
              maxLength="50"
              type="text"
              placeholder="Surname"
              name="surname"
              onChange={handleChange}
              value={data.surname}
              required
              className={styles.input}
            />
            <input
              type="text"
              placeholder="Relationship"
              name="relationship"
              onChange={handleChange}
              value={data.relationship}
              required
              className={styles.input}
            />
             <input
              type="number"
              placeholder="Telephone number"
              name="tnumber"
              onChange={handleChange}
              value={data.tnumber}
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
export default EmployeeFamily;