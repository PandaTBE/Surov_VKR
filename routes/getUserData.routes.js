const { Router } = require('express');
const UserData = require('../models/UserData');
const axios = require('axios');
const geoip = require('geoip-lite');
const router = Router();

router.post('/info', async (req, res) => {
    try {
        const { platform, userAgent } = req.body;

        const data = await axios.get('https://www.cloudflare.com/cdn-cgi/trace').then((response) => response.data);

        const clodflareData = data
            .trim()
            .split('\n')
            .reduce(function (obj, pair) {
                pair = pair.split('=');
                return (obj[pair[0]] = pair[1]), obj;
            }, {});

        const geo = geoip.lookup(clodflareData.ip);

        const user = {
            platform,
            userAgent,
            ip: clodflareData.ip,
            city: geo.city,
            coordinates: geo.ll,
        };

        const condidates = await UserData.findOne(user);
        if (condidates) {
            return res.status(200).json({ message: 'Вы уже заходили на сайт!', type: 'warning', user: condidates });
        }

        const userData = new UserData(user);

        await userData.save();

        res.status(201).json({ message: 'Информация добавлена', type: 'success', user });
    } catch (error) {
        res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' });
    }
});

module.exports = router;
