import { onValue, ref } from "firebase/database";
import React, { useState, useEffect } from "react";
import Table from "react-bootstrap/Table";
import { db } from "../firebase";
import { Link } from "react-router-dom";
import "../styles/booking.css"
import 'remixicon/fonts/remixicon.css';
import { useNavigate } from "react-router-dom";

// import styled from "styled-components";
// import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";

// const StatusTD = styled.td`
//   font-weight: bold;
//   color: ${(props) => (props.type === "Pending" ? "blue" : "")};
//   color: ${(props) => (props.type === "Accepted" ? "green" : "")};
//   color: ${(props) => (props.type === "Rejected" ? "red" : "")};
// `;
const Bookings = () => {
  const navigate = useNavigate();

  const [returnedData, setReturnedData] = useState(['test']);
  const [employee, setEmployee] = useState({ MaKS: '', TenKS: '', Diachi: '', MaVungMien: '' });


  useEffect(() => {
    fetchData();
  }, []);


  const inputSet = (e) => {
    const { name, value } = e.target;
    console.log(value);
    if (name === 'TenKS') {
      setEmployee(prevState => ({
        ...prevState,
        [name]: String(value)
      }));
      console.log('int parsed');
      return;
    }
    setEmployee(prevState => ({
      ...prevState,
      [name]: value
    }));
  }
  const fetchData = async () => {
    // console.log(employee);
    const newData = await fetch('/test', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        ...employee
      })
    })
      .then(res => res.json())
    console.log('newData:', newData);
    setReturnedData(newData)
  }


  const fetchData2 = async () => {
    // console.log(employee);
    const newData = await fetch('/hello', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        ...employee
      })
    })
      .then(res => res.json())
    console.log('newData:', newData);
    setReturnedData(newData)
  }

  const deleteData = async (MaKS) => {

    const newData = await fetch('/delete', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        MaKS: MaKS
      })
    })
      .then(res => res.json())
      .then(window.location.reload())
    setReturnedData(newData)
  }

  return (
    <>
      <div className="row my-4">
        <div className="col-md-12 col-12 my-auto">
          <div className="col-md-6 col-6 float-right" >
            <div class="container">
              <input
                type="text"
                class="search-txt-input"
                placeholder="Search..."
                maxlength="100"
                onChange={inputSet}
                name="TenKS"
                required
              />
              {/* <button
                  className="search-button"
                  onClick={() => fetchData2()}
                >Search</button> */}

              <button
                className="search-button"
                onClick={() => fetchData2()}
              ><i class="ri-search-line"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
      {returnedData ? (
        <Table
          striped
          bordered
          hover
          size="sm"
          style={{ marginTop: "60px", width: "90%", margin: "40px auto" }}
        >
          <thead>
            <tr>
              <th>ID</th>
              <th>Tên khách sạn</th>
              <th>Địa chỉ</th>
              <th>Tình trạng phòng</th>
              <th></th>
            </tr>
          </thead>
          <tbody>

            <>
              {returnedData.map(Data => (
                <tr key={Data.MaKS}>
                  <td>{Data.MaKS}</td>
                  <td>{Data.TenKS}</td>
                  <td>{Data.Diachi}</td>
                  <td>{Data.MaVungMien}</td>
                  <td>
                    <button class="delete-button" onClick={() => deleteData(Data.MaKS)}><i class="ri-delete-bin-line"></i> Delete</button>
                  </td>
                </tr>))}
              {/* <td>{booking.endDate}</td>
                  <td>{booking.capacity}</td>
                  <td>{booking.totalPrice}</td> */}
              {/* <StatusTD type={booking.status}>{booking.status}</StatusTD> */}
              {/* {booking.status === "Pending" ? (
                    <>
                      <td style={{ textAlign: "center" }}>
                        <FaCheckCircle
                          color="green"
                          style={{
                            cursor: "pointer",
                            fontSize: "20px",
                          }}
                          onClick={() => updateBooking(booking.id, "Accepted")}
                        />
                      </td>
                      <td style={{ textAlign: "center" }}>
                        <FaTimesCircle
                          color="red"
                          style={{
                            cursor: "pointer",
                            fontSize: "20px",
                          }}
                          onClick={() => updateBooking(booking.id, "Rejected")}
                        />
                      </td>
                    </>
                  ) : (
                    <></>
                  )} */}
            </>



          </tbody>
        </Table>
      ) : (
        <div className="container roomerror">
          <div className="row my-5">
            <div className="col-md-6 col-12 mx-auto">
              <div className="card shadow-lg border-0 p-4 error">
                <h1 className="text-center display-4">No bookings.</h1>
                <Link to="/rooms" className="btn btn-warning mt-4 ">
                  No Bookings
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Bookings;
