import canvasFingerprint from '../assets/img/canvasFingerprint.png';

const toDataURL = async (src) => {
    return new Promise((resolve) => {
        const img = new Image();
        img.src = src;
        img.onload = function () {
            const canvas = document.createElement('CANVAS');
            const ctx = canvas.getContext('2d');
            canvas.height = this.naturalHeight;
            canvas.width = this.naturalWidth;
            ctx.drawImage(this, 0, 0);
            resolve(canvas.toDataURL());
        };
    });
};

const collectUserData = async () => {
    let userData = {};
    const plugins = [];
    for (let i = 0; i < navigator.plugins.length; i++) {
        plugins.push(navigator.plugins[i].name);
    }

    const canvasValue = await toDataURL(canvasFingerprint);

    try {
        userData = {
            screen_size: {
                is_important: false,
                value: {
                    height: window.screen.height,
                    widht: window.screen.width,
                },
            },
            color_depth: {
                is_important: false,
                value: window.screen.colorDepth,
            },
            pixel_ratio: {
                is_important: false,
                value: window.devicePixelRatio,
            },
            user_agent: {
                is_important: false,
                value: navigator.userAgent,
            },
            do_not_track_header: {
                is_important: true,
                value: window.navigator.doNotTrack,
            },
            cookies: {
                is_important: false,
                value: navigator.cookieEnabled,
            },
            plugins: {
                is_important: false,
                value: plugins,
            },
            timezone: {
                is_important: true,
                value: new Date().getTimezoneOffset(),
            },
            date_format: {
                is_important: true,
                value: new Date('2000-01-01T00:00:00').toLocaleString(),
            },
            languages: {
                is_important: false,
                value: [
                    window.navigator.languages,
                    window.navigator.userLanguage,
                    window.navigator.browserLanguage,
                    window.navigator.systemLanguage,
                ],
            },
            platform: {
                is_important: true,
                value: navigator.platform,
            },
            hardware_concurrency: {
                is_important: true,
                value: navigator.hardwareConcurrency,
            },
            touch_compatibility: {
                is_important: true,
                value: navigator.maxTouchPoints,
            },
            canvas_value: {
                is_important: true,
                value: canvasValue,
            },
        };
    } catch (error) {
        console.log('>>>>Ошибка при получении атрибутов пользователя', error);
    }

    return userData;
};

export default collectUserData;
