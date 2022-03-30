const { Router } = require('express');
const UserData = require('../models/UserData');
const axios = require('axios');
const geoip = require('geoip-lite');
const router = Router();

router.post('/info', async (req, res) => {
    PARAMS_NUMBER = 14;
    try {
        // const currentUser = await UserData.findOne(req.body);
        // if (currentUser) {
        //     res.status(200).json({
        //         message: 'Точно такоей пользователь уже есть!',
        //         type: 'warning',
        //         user: currentUser,
        //     });
        // }
        const usersData = await UserData.find({});
        // return res.status(200).json({ message: 'Есть похожие пользователи', type: 'warning', user: usersData });

        const availableCondidates = [];

        if (usersData.length > 0) {
            usersData.forEach((element) => {
                let counter = 0;
                Object.keys(req.body).forEach((key) => {
                    if (JSON.stringify(req.body[key]) === JSON.stringify(element[key])) {
                        counter += 1;
                    }
                });
                if (counter > Math.round(PARAMS_NUMBER - PARAMS_NUMBER * 0.2)) {
                    availableCondidates.push(element);
                }
            });
        }

        if (availableCondidates.length > 0) {
            // Второй этап
            availableCondidates.forEach((element) => {
                importantKeys = Object.keys(req.body).filter((key) => req.body[key].is_important);
                console.log(importantKeys);
            });
        }

        if (availableCondidates.length > 0) {
            return res
                .status(200)
                .json({ message: 'Есть похожие пользователи', type: 'warning', users: availableCondidates });
        } else {
            // const userData = new UserData(req.body);
            // const result = await userData.save();
            // if (result) {
            //     return res.status(201).json({ message: 'Информация добавлена', type: 'success', user: req.body });
            // } else {
            //     return res.status(400).json({ message: 'Что-то пошло не так, попробуйте снова' });
            // }
        }
    } catch (error) {
        return res.status(400).json({ message: `Что-то пошло не так, попробуйте снова. ${error}` });
    }
});

module.exports = router;
