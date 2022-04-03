const { Router } = require('express');
const UserData = require('../models/UserData');
const axios = require('axios');
const geoip = require('geoip-lite');
const router = Router();

router.post('/info', async (req, res) => {
    PARAMS_NUMBER = 14;
    try {
        const currentUser = await UserData.findOne(req.body);
        if (currentUser) {
            res.status(200).json({
                message: 'Точно такой пользователь уже есть!',
                type: 'warning',
                users: [currentUser],
            });
        }
        const usersData = await UserData.find({});
        // return res.status(200).json({ message: 'Есть похожие пользователи', type: 'warning', user: usersData });

        const availableCondidates = [];
        const changedFields = {};

        if (usersData.length > 0) {
            usersData.forEach((element) => {
                let counter = 0;
                Object.keys(req.body).forEach((key) => {
                    if (JSON.stringify(req.body[key]) === JSON.stringify(element[key])) {
                        counter += 1;
                    } else {
                        changedFields[element._id] = {
                            ...changedFields[element._id],
                            [key]: {
                                storedValue: element[key],
                                currentValue: req.body[key],
                            },
                        };
                    }
                });
                if (counter > Math.round(PARAMS_NUMBER - PARAMS_NUMBER * 0.3)) {
                    availableCondidates.push(element);
                }
            });
        }

        if (availableCondidates.slice().length > 0) {
            // Второй этап
            availableCondidates.slice().forEach((element, index) => {
                let difCounter = 0;
                importantKeys = Object.keys(req.body).filter((key) => req.body[key].is_important);
                importantKeys.forEach((importantKey) => {
                    if (element[importantKey].value !== req.body[importantKey].value) {
                        changedFields[element._id] = {
                            [importantKey]: {
                                storedValue: element[importantKey],
                                currentValue: req.body[importantKey],
                            },
                        };
                        difCounter += 1;
                    }
                });
                if (difCounter > 0) availableCondidates.splice(index, 1);
            });
        }

        if (availableCondidates.length > 0) {
            return res.status(200).json({
                message: 'Есть похожие пользователи',
                type: 'warning',
                users: availableCondidates,
                changedFields,
            });
        } else {
            const userData = new UserData(req.body);
            const result = await userData.save();
            if (result) {
                return res
                    .status(201)
                    .json({ message: 'Информация добавлена в базу данных', type: 'success', users: [req.body] });
            } else {
                return res.status(400).json({ message: 'Что-то пошло не так, попробуйте снова' });
            }
        }
    } catch (error) {
        //return res.status(400).json({ message: `Что-то пошло не так, попробуйте снова. ${error}` });
    }
});

module.exports = router;
