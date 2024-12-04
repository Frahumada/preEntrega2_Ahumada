import express from 'express';
import handlebars from 'express-handlebars';
import cartRouter from './routes/cartRouter.js'
import productRouter from './routes/productsRouters.js';
import morgan from 'morgan';
import { __dirname } from './path.js';
import { errorHandler } from './middlewares/errorHandler.js';


const app = express();

app.use(express.static(__dirname + '/public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));


app.engine('handlebars',handlebars.engine());
app.set('views', __dirname + '/views');
app.set('view engine', 'handlebars');


app.use('/api/carts/', cartRouter);
app.use('/api/products/', productRouter);


app.use(errorHandler);

app.get('/', (req, res) => {
    res.status(200).render('templates/home', {productos: products, js: 'productos.js', css: 'productos.css'})
});

const PORT = 8080;

app.listen(PORT, ()=>{
    console.log(`Escuchando en el puerto ${PORT}`);
});