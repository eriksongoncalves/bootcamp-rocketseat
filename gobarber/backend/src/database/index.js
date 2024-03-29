import Sequelize from 'sequelize';
import databaseConfig from '../config/database';
import mongoose from 'mongoose';

import User from '../app/models/User';
import File from '../app/models/File';
import Appointment from '../app/models/Appointment';

const models = [User, File, Appointment];

class Database {
    constructor() {
        this.init();
        this.mongo();
    }

    init() {
        this.connection = new Sequelize(databaseConfig);
        models
            .map(model => model.init(this.connection))
            .map(model => model.associate && model.associate(this.connection.models));
    }

    mongo() {
        this.mogoConnection = mongoose.connect(
            'mongodb://localhost:27017/gobarber',
            {
                useNewUrlParser: true,
                useFindAndModify: true
            }
        );
    }
}

export default new Database();