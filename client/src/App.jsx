import { useEffect, useState } from 'react';
import { AppContainer, Canvas, ContentWrapper, DataWrapper, TitleText, UserDataText } from './App.styles';
import useHttp from './hooks/http.hooks';
import { useSnackbar } from 'notistack';
import { CircularProgress } from '@material-ui/core';
import { MapContainer, TileLayer, Marker, Tooltip } from 'react-leaflet';
import collectUserData from './tools/collectUserData';
import canvasFingerprint from './assets/img/canvasFingerprint.png';

const App = () => {
    const { request, error, clearError, loading } = useHttp();
    const { enqueueSnackbar } = useSnackbar();
    const [data, setData] = useState(null);

    // useEffect(() => {
    //     if (data) {
    //         switch (data.type) {
    //             case 'warning':
    //                 enqueueSnackbar(data.message, { variant: 'warning' });
    //                 break;

    //             case 'success':
    //                 enqueueSnackbar(data.message, { variant: 'success' });
    //                 break;

    //             default:
    //                 break;
    //         }
    //     }
    //     // eslint-disable-next-line
    // }, [data]);

    useEffect(() => {
        if (error) {
            enqueueSnackbar(error, { variant: 'error' });
        }
        // eslint-disable-next-line
    }, [error, clearError]);

    useEffect(() => {
        const asyncFunc = async () => {
            try {
                const userData = await collectUserData();
                const data = await request('/api/info', 'POST', userData);
                // console.log(data);
                // setData(data);
            } catch (_) {}
        };
        asyncFunc();
    }, []);

    return (
        <AppContainer>
            <ContentWrapper>
                <Canvas id='canvas-image' src={canvasFingerprint} alt='canvas fingerprint' />
                <TitleText>ВКР. Суров БИБ1801</TitleText>
                <DataWrapper>
                    {loading ? (
                        <CircularProgress />
                    ) : data?.user && !Array.isArray(data.user) ? (
                        <div>
                            <UserDataText>
                                <span>IP: </span>
                                {data.user.ip}
                            </UserDataText>
                            <UserDataText>
                                <span>Город: </span>
                                {data.user.city}
                            </UserDataText>
                            <UserDataText>
                                <span>Платформа: </span>
                                {data.user.platform}
                            </UserDataText>
                            <UserDataText>
                                <span>Агент вашего браузера: </span>
                                {data.user.userAgent}
                            </UserDataText>
                            <MapContainer
                                style={{ height: '500px', marginTop: '15px' }}
                                center={data.user.coordinates}
                                zoom={13}
                                // scrollWheelZoom={false}
                            >
                                <TileLayer
                                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                                    url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
                                />
                                <Marker position={data.user.coordinates}>
                                    <Tooltip offset={[0, 20]} opacity={1} permanent>
                                        Ваше местонахождение
                                    </Tooltip>
                                </Marker>
                            </MapContainer>
                        </div>
                    ) : (
                        <div>{data?.user && JSON.stringify(data.user, null, 4)}</div>
                    )}
                </DataWrapper>
            </ContentWrapper>
        </AppContainer>
    );
};

export default App;
