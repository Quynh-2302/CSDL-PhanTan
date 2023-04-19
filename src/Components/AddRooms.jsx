
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const AddRooms = () => {
  const navigate = useNavigate();
  const [returnedData, setReturnedData] = useState(['hello']);
  const [employee, setEmployee] = useState({ MaKS: '', TenKS: '', Diachi: '', MaVungMien: '' });

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


  const createEmployee = async () => {
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
      .then(
        res => res.json())
    navigate("/bookings");
    console.log('newData:', newData);
    setReturnedData(newData[0])
  }

  return (
    <div className="container my-5">
      <div className="row">
        <div className="col-md-10 mx-auto col-12 card shadow-lg border-0 p-4">
          <div>
            <h1 className="display-4 text-center">Add Room</h1>
          </div>

          <div className="row my-4">
            <div className="col-md-12 col-12 my-auto">
              <div className="col-md-12 col-12 float-right">
                <form>
                  <div className="form-group">
                    <label htmlFor="name">Mã khách sạn</label>
                    <input
                      type="MaKS"
                      name="MaKS"
                      placeholder="Mã khách sạn"
                      className="form-control"
                      onChange={inputSet}
                      required
                    />
                    <label htmlFor="type">Tên khách sạn</label>
                    <input
                      name="TenKS"
                      placeholder="Tên khách sạn"
                      onChange={inputSet}
                      className="form-control"
                      required
                    />

                    <label htmlFor="price">Địa chỉ</label>
                    <input
                      name="Diachi"
                      placeholder="Địa chỉ"
                      onChange={inputSet}
                      className="form-control"
                      required
                    />
                    <label htmlFor="size">Vùng miền</label>
                    <input
                      name="MaVungMien"
                      placeholder="Vùng miền"
                      onChange={inputSet}
                      className="form-control"
                      required
                    />

                  </div>

                  <div className="form-group form-check"></div>
                </form>
                <button
                  className="btn btn-block btn-outline-primary"
                  onClick={() => createEmployee()}
                >
                  ADD ROOM
                </button>

              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default AddRooms;
