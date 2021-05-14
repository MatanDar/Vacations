
const express = require('express')
const app = express()
var cors = require('cors')
app.use(cors())
const mysql = require('mysql');
app.use(express.static("public"))

app.get('./', (req, res) => {
    res.sendFile(path.join(_dirname, "public", "index.html"))
})

const { Op } = require("sequelize");
const { Sequelize, Model, DataTypes } = require('sequelize');

// ---------------to run the app with localhost server-------------

// const sequelize = new Sequelize('vacations_ltd', 'root', '1234', {
//     host: 'localhost',
//     dialect: 'mysql'
// });


// async function fn() {
//     try {
//         await sequelize.authenticate();
//         console.log('Connection has been established successfully.');
//     } catch (error) {
//         console.error('Unable to connect to the database:', error);
//     }
// }
// fn()


// ---------------to run the app with HEROKU server-------------
sequelize = new Sequelize(process.env.DATABASE_URL, {
    dialect: 'postgres',
    protocol: 'postgres',
    dialectOptions: {
      ssl: {
          require: true,
          rejectUnauthorized: false
      }
  }
  });
  async function fn() {
    try {
      await sequelize.authenticate();
      console.log('Connection has been established successfully.');
    } catch (error) {
      console.error('Unable to connect to the database:', error);
    }
  }

  fn()



app.use(express.urlencoded({
    extended: true
}));
app.use(express.json());

const Users = sequelize.define('users', {
    first_name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    last_name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    timestamps: false
});


const Vacations = sequelize.define('vacations', {
    description: {
        type: DataTypes.STRING,
        allowNull: false
    },
    destination: {
        type: DataTypes.STRING,
        allowNull: false
    },
    pics: {
        type: DataTypes.STRING,
        allowNull: false
    },
    from_date: {
        type: DataTypes.STRING,
        allowNull: false
    },
    till_date: {
        type: DataTypes.STRING,
        allowNull: false
    },
    price: {
        type: DataTypes.STRING,
        allowNull: false
    },

}, {
    timestamps: false
});


const Followers = sequelize.define('followers', {
    user_id: {
        type: DataTypes.NUMBER,
        allowNull: false
    },
    vacation_id: {
        type: DataTypes.NUMBER,
        allowNull: false
    },
}, {
    timestamps: false
});

Vacations.hasMany(Followers, { foreignKey: "vacation_id" });
Followers.belongsTo(Vacations, { foreignKey: "vacation_id" });

Users.hasMany(Followers, { foreignKey: "user_id" });
Followers.belongsTo(Users, { foreignKey: "user_id" });

app.post("/search", async (req, res) => {
    const data = req.body;
    const userId = data.user.id
    const desti = data.search[0].destination.toLowerCase().toUpperCase()
    const from = data.search[0].from
    const till = data.search[0].till

    const filters = {}
    if (from) {
        filters["from_date"] = from
    }
    if (till) {
        filters["till_date"] = till
    }

    try {
        const allReadyFollowId = []
        const followed = await Followers.findAll({
            where: { user_id: userId },
            include: {
                model: Vacations,
                where: {
                    [Op.and]:
                        [
                            {
                                destination: { [Op.like]: `%${desti}%` }
                            },
                            filters

                        ]
                }, include: Followers
            }

        })

        console.log(followed);
        followed.forEach((item) => {
            item.dataValues.vacation.isFollowed = true
            allReadyFollowId.push(item.vacation_id)
        })

        const notFollow = await Vacations.findAll({
            where: {
                [Op.and]:
                    [
                        {
                            destination: { [Op.like]: `%${desti}%` }
                        },
                        filters

                    ],
                id: { [Op.notIn]: allReadyFollowId }
            },
            include: Followers
        })
        const vacations = [...followed, ...notFollow];

        res.json(
            vacations
        )
    }
    catch (err) {
        res.status(404).send({ message: "Invalid information", status: false });
    }

});


app.post('/add-follow', async (req, res) => {
    try {
        const data = req.body
        const user = await Users.findOne({ where: { id: data.userId } })
        const [vacation, created] = await Followers.findOrCreate({
            where: { vacation_id: data.vacationId, user_id: user.id },
            defaults: {
                vacation_id: data.vacationId,
                user_id: user.id
            }
        });
        if (!created) {
            await vacation.destroy()
        }
        res.json(vacation)
    }
    catch (err) {
        res.json({ massge: 'err' })
    }
})

app.post("/add-vacation", async (req, res) => {
    const newVac = req.body;
    console.log(newVac)
    try {
        const jane = await Vacations.create({
            description: newVac.description,
            destination: newVac.destination,
            pics: newVac.image,
            from_date: newVac.from_date,
            till_date: newVac.till_date,
            price: newVac.price
        });
        console.log(jane.toJSON);
        res.status(201).send({ newVac: newVac, message: "Vacation created", status: true });
    }
    catch (err) {
        res.status(404).send({ message: "Invalid information", status: false });
    }
});

app.patch('/update-vacation', async (req, res) => {
    try {
        const data = req.body
        const vacation = await Vacations.findOne({
            where: { id: data.id }
        });
        vacation.update({
            description: data.description,
            destination: data.destination,
            pics: data.image,
            from_date: data.from_date,
            till_date: data.till_date,
            price: data.price
        })
        res.json(vacation)
    }
    catch (err) {
        res.json({ message: 'err' })
    }
})


app.delete('/delete-vacation/:id', async (req, res) => {
    try {
        const data = req.body
        Followers.destroy({
            where: {
                vacation_id: data.id
            }
        })
        Vacations.destroy({
            where: {
                id: data.id
            }
        })
        res.json(data)
    }
    catch (err) {
        res.json({ massge: 'err' })
    }
})


app.get('/edit-vacation/:id', async (req, res) => {
    try {
        const data = req.params
        const vacation = await Vacations.findOne({
            where: { id: data.id }
        });
        res.json(vacation)
    }
    catch (err) {
        res.json({ massge: 'err' })
    }
})


app.get('/admin', async (req, res) => {
    try {
        const vacation = await Vacations.findAll({
            include: [
                { model: Followers, include: { model: Users } }
            ],
        })
        res.json(vacation)
    }
    catch (err) {
        res.json({ message: 'err' })
    }
})

app.get('/all-vacations/:id', async (req, res) => {
    const data = req.params.id
    console.log(data);
    try {
        const allReadyFollowId = []
        const allReadyFollow = await Followers.findAll({
            where: { user_id: data },
            include: {
                model: Vacations, include: Followers
            }
        });
        allReadyFollow.forEach((item) => {
            item.dataValues.vacation.isFollowed = true
            allReadyFollowId.push(item.vacation_id)
        })
        const notFollow = await Vacations.findAll({
            where: {
                id: { [Op.notIn]: allReadyFollowId },
            },
            include: Followers
        })
        const vacations = [...allReadyFollow, ...notFollow];
        res.json(vacations)
    }
    catch (err) {
        res.send({ message: 'err' })
    }
})


app.post("/login", async (req, res) => {
    const newUser = req.body
    try {
        const user = await Users.findOne({
            where: { username: newUser.userName, password: newUser.password }
        });
        if (user === null) {
            console.log('Not found!');
            res.status(201).send({ message: "Wrong username or password", success: false })

        }
        else if (newUser.userName === 'admin' && newUser.password === 'admin')
            res.status(201).send({ message: "Welcome to Vacations.com " + user.username, admin: true })

        else {
            console.log(user instanceof Users); // true
            console.log(user.userName + ' ' + user.password);
            res.status(201).json({ message: "Welcome to Vacations.com " + user.username, success: true, id: user.id })
        }
    }
    catch (err) {
        res.send({ message: "error" })
    }
});


app.post("/signup", async (req, res) => {
    const newUser = req.body;
    console.log(newUser)
    try {
        const [user, created] = await Users.findOrCreate({
            where: { username: newUser.userName },
            defaults: {
                first_name: newUser.firstName,
                last_name: newUser.lastName,
                username: newUser.userName,
                password: newUser.password,
            },
        });
        if (!created) {
            return res.status(203).send({ message: "Username already taken", status: false });
        }
        res.status(201).send({ newUser: newUser, message: "Account created", status: true });
    } catch (err) {
        res.status(404).send({ message: "Invalid information", status: false });
    }
});


app.listen(process.env.PORT || 4000, () => {
    console.log("the server is listening on port 4000")
})