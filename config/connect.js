import {Sequelize} from "sequelize";
const sequelize = new Sequelize("library_db", "root", "root", {
    host: 'localhost',
    dialect: 'mysql',
    sync: true,
});

sequelize.authenticate().then(() => {
    console.log('Connection has been established successfully.');
})
.catch((error) => {
    console.error('Unable to connect to the database:', err);
})

sequelize.sync().then(() => {
    console.log('Book table created successfully!');
 }).catch((error) => {
    console.error('Unable to create table : ', error);
 });

export default sequelize;
