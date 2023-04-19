const config = require('./dbConfig'),
  sql = require('mssql');


const getEmployees = async (TenKS) => {
  try {
    let pool = await sql.connect(config);
    console.log('ket noi thanh cong');
    let hotels = await pool.request().query(`SELECT * FROM KHACHSANMUONGTHANH.dbo.KhachSan where TenKS = '${TenKS}'`);
    return hotels;
  }
  catch (err) {
    console.log(err);
  }
}

const getAllEmployees = async () => {
  try {
    let pool = await sql.connect(config);
    console.log('ket noi thanh cong');
    let hotels = await pool.request().query(`SELECT * FROM KHACHSANMUONGTHANH.dbo.KhachSan`);
    return hotels;
  }
  catch (err) {
    console.log(err);
  }
}

const createEmployee = async (Hotel) => {
  try {
    let pool = await sql.connect(config);
    let hotels = await pool.request()
      .query(`INSERT INTO KHACHSANMUONGTHANH.dbo.KhachSan (MaKS, TenKS, Diachi, MaVungMien) VALUES
    ('${Hotel.MaKS}', '${Hotel.TenKS}', '${Hotel.Diachi}', '${Hotel.MaVungMien}')`);
    console.log('Hotel: ', Hotel);
    return hotels;
  }
  catch (err) {
    console.error('Problem in Create Employee', err);
  }
}

const createThenGet = async (Hotel) => {
  const newEmployee = await createEmployee(Hotel)
  console.log(Hotel);
  await getEmployees();
}

const deleteEmployee = async (MaKS) => {
  try {
    let pool = await sql.connect(config);
    let hotels = await pool.request()
      .query(`DELETE  [KHACHSANMUONGTHANH].[dbo].[KhachSan] WHERE MaKS = '${MaKS}'`);
    return hotels;
  }
  catch (err) {
    console.error('Problem in Delete Employee', err);
  }
}

module.exports = {
  createThenGet: createThenGet,
  createEmployee: createEmployee,
  getEmployees: getEmployees,
  getAllEmployees: getAllEmployees,
  deleteEmployee: deleteEmployee
}
