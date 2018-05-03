//////////////// Certificates and Implementation
///////////////////////////////////////////////////////////////
use_cert = false; // true or false to use certificate in Payment System.
server_com = "./ssl/new_certs/server.p12"; // payment.gharDhuri.com p12 certificate
com_password = "admin";
request_crt = true;   // request for client certificate
reject_unauthorized = false;  // reject if client is not authorized


//////////////// Port used 
/////////////////////////////////////////////////////////////////
server_port = 8000; // Port used for payment.gharDhuri.com
server_portfi = 443; // Port used for payment.gharDhuri.fi


/////////////// URL to be used
//////////////////////////////////////////////////////////////////
host_com = 'localhost'//'localhost'; // host address
host_com_redirect = 'index'; // redirect host address to certain url of host address

//////////////// Configure Web Service
//////////////////////////////////////////////////////////////////
WS_URL = '/ws';
WS_IP = "localhost";
WS_PORT = '8080';

// URLs
login = '/iSuchana/registerUser';
notices = '/iSuchana/notification';
results = '/iSuchana/result';
routines = '/iSuchana/routine';
events = '/iSuchana/events';

// AES Key
aesKey = [ 11, 32, 43, 14, 45, 26, 17, 8, 79, 10, 21, 42, 93, 54, 35, 76 ];