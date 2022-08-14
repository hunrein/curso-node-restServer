const mongoose = require('mongoose');

const dbConection = async () => {


    // siempre es conveniente realizar la conección a la base de datos utilizando un try catch, ya que si hubiera algún error podriamos manejarlo.

    try {

        await mongoose.connect( process.env.MONGODB_CNN  , {
            /* useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            useFindAndModify: false */
            // recomendaciones de configuración de Mongoose. Quedaron obsoletas...
            
        });  
            console.log('Base de datos online');
    } catch (error) {
        throw new Error ('Error a la hora de iniciar la base de datos')
    }

}

module.exports = {
    dbConection
}