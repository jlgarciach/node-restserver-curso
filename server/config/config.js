/*
    Configuración de puerto:
*/
process.env.PORT = process.env.PORT || 3000;

/* 
  Entorno
*/
process.env.NODE_ENV = process.env.NODE_ENV || 'dev';

/* 
  Vencimiento del token
  60 segundos
  60 minutos
  24 horas
  30 dias
*/
process.env.CADUCIDAD_TOKEN = 60 * 60 * 24 * 30;

/* 
  SEED de autenticación
*/
process.env.SEED = process.env.SEED || 'este-es-el-seed-desarrollo';


/* 
    Base de datos
*/
let urlDB;

if (process.env.NODE_ENV === 'dev') {
    urlDB = 'mongodb://localhost:27017/cafe';
} else {
    urlDB = process.env.MONGO_URI; // agrague variable de acceso
}

process.env.URLDB = urlDB;

/* 
    Google Client ID
*/

process.env.CLIENT_ID = process.env.CLIENT_ID || '628706711100-41vc7afba7ti6k7hu563qqkmtbq11qpq.apps.googleusercontent.com';