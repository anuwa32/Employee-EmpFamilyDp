import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import styles from "./styles.module.css";
import Sidebar from "../Sidebar";

const Employee = () => {
  const [data, setData] = useState({
    code: "",
    initials: "",
    firstname: "",
    surname: "",
    address1: "",
    address2: "",
    dob: "",
    status: "",
  });

  const birthDate = new Date();
  const getDate = `${birthDate.getFullYear()}-${birthDate.getMonth() + 1}-${birthDate.getDate()}`; //for date validation

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
      const url = "http://localhost:8086/api/employee";
      const { data: res } = await axios.post(url, data);
      navigate("/empfamily");
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
      <div className={styles.employee_container}>
        <div className={styles.employee_form_container}>
          <div className={styles.colt}></div>
          <div className={styles.colt2}>
            <form className={styles.form_container} onSubmit={handleSubmit}>
              <h3>Employee Details</h3>
              <br></br>
              <input
                maxLength="3"
                title="The employee code cannot be exceeded by 3 characters."
                type="text"
                placeholder="Employee Code"
                name="code"
                onChange={handleChange}
                value={data.code}
                required
                className={styles.input}
              />
              <input
                type="text"
                placeholder="Initials"
                name="initials"
                onChange={handleChange}
                value={data.initials}
                required
                className={styles.input}
              />
              <input
                maxLength="50"
                title="The employee firstname cannot be exceeded by 50 characters."
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
                title="The employee surname cannot be exceeded by 50 characters."
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
                maxLength="100"
                title="The address 1 cannot be exceeded by 100 characters."
                placeholder="Address 1"
                name="address1"
                onChange={handleChange}
                value={data.address1}
                required
                className={styles.input}
              />
              <input
                type="text"
                maxLength="100"
                title="The address 2 cannot be exceeded by 100 characters."
                placeholder="Address 2"
                name="address2"
                onChange={handleChange}
                value={data.address2}
                required
                className={styles.input}
              />
              <input
                max={getDate}
                type="date"
                placeholder="Date OF Birth"
                name="dob"
                onChange={handleChange}
                value={data.dob}
                required
                className={styles.input}
              />
              <select
                required
                name="status"
                onChange={handleChange}
                value={data.status}
                className={styles.input}
              ><option defaultValue >Status</option>
                <option value="Active" >Active</option>
                <option value="Inactive">Inactive</option>
              </select>

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
export default Employee;