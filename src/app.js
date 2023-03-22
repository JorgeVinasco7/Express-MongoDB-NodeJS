import express from 'express'
import indexRoutes from './routes/index.routes'
import {create} from "express-handlebars";
import path from 'path'
import morgan from 'morgan';

const app = express()
//configuracion plantillas para las vistas, tanto para layouts y partials
const hbs = create({
    layoutsDir: path.join('src/views','layouts'),
    //para porciones de codigo html
    partialsDir: path.join('src/views','partials'),
    defaultLayout:'main',
    extname:'.hbs', 
});
//para que express vea donde esta la carpeta vista
app.set('views', path.join(__dirname,'views'));
//configuramos
app.engine('.hbs',hbs.engine);

//midleware
app.use(morgan('dev'));
app.use(express.urlencoded({extended:false}));

app.set("view engine", ".hbs");

//para las rutas
app.use(indexRoutes)

//archivos estaticos
app.use(express.static(path.join(__dirname,"public")));

export default app