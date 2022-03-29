const { Router } = require('express');
const UserData = require('../models/UserData');
const axios = require('axios');
const geoip = require('geoip-lite');
const router = Router();

router.post('/info', async (req, res) => {
    try {
        const usersData = await UserData.find({});

        // const condidates = [];
        const availableCondidates = [];

        // if (condidates.length > 0) {
        //     condidates.forEach((element) => {
        //         const stringedCondidate = JSON.stringify(element);
        //         let counter = 0;
        //         Object.keys(user).forEach((key) => {
        //             if (stringedCondidate.includes(user[key])) counter += 1;
        //         });
        //         console.log(counter);
        //         if (counter > Math.round(PARAMS_NUMBER - PARAMS_NUMBER * 0.2)) {
        //             availableCondidates.push(element);
        //         }
        //     });
        // }

        if (availableCondidates.length > 0) {
            return res
                .status(200)
                .json({ message: 'Есть похожие пользователи', type: 'warning', user: availableCondidates });
        } else {
            const userData = new UserData(req.body);
            // const result = await userData.save();
            if (result) {
                return res.status(201).json({ message: 'Информация добавлена', type: 'success', user: req.body });
            } else {
                return res.status(400).json({ message: 'Что-то пошло не так, попробуйте снова' });
            }
        }
    } catch (error) {
        return res.status(400).json({ message: `Что-то пошло не так, попробуйте снова. ${error}` });
    }
});

module.exports = router;
