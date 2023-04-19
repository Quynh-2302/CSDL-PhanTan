const config = {
  user: 'sa', // sql user
  password: '123123', //sql user password
  server: 'DAQUYNH', // if it does not work try- localhost
  database: 'KHACHSANMUONGTHANH',
  options: {
    trustedconnection: true,
    enableArithAbort: true,
    instancename: '',  // SQL Server instance name
    trustServerCertificate: true
  },
  port: 50608,
}

module.exports = config;
