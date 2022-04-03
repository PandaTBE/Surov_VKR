import { useEffect, useMemo, useState } from 'react';
import {
    AppContainer,
    Canvas,
    ContentWrapper,
    DataWrapper,
    TitleText,
    UserDataText,
    AccordionItemsWrapper,
    CanvasWrapper,
    CanvasImage,
    FieldWrapper,
} from './App.styles';
import useHttp from './hooks/http.hooks';
import { useSnackbar } from 'notistack';
import { CircularProgress } from '@material-ui/core';
import collectUserData from './tools/collectUserData';
import canvasFingerprint from './assets/img/canvasFingerprint.png';
import { cloneDeep } from 'lodash';
import { Accordion, AccordionSummary, Alert, AccordionDetails, Typography } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const App = () => {
    const { request, error, clearError, loading } = useHttp();
    const { enqueueSnackbar } = useSnackbar();
    const [data, setData] = useState(null);

    useEffect(() => {
        if (data) {
            switch (data.type) {
                case 'warning':
                    enqueueSnackbar(data.message, { variant: 'warning' });
                    break;
                case 'success':
                    enqueueSnackbar(data.message, { variant: 'success' });
                    break;
                default:
                    break;
            }
        }
        // eslint-disable-next-line
    }, [data]);

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
                setData({ ...data });
            } catch (_) {}
        };
        asyncFunc();
    }, []);

    return (
        <AppContainer>
            <ContentWrapper>
                <Canvas id='canvas-image' src={canvasFingerprint} alt='canvas fingerprint' />
                <TitleText>Выпускная квалификационная работа</TitleText>
                <TitleText>
                    <span>Выполнил:</span> Студент Суров Н. Д.
                </TitleText>
                <TitleText>
                    <span>Группа:</span> БИБ1801
                </TitleText>
                <TitleText>
                    <span>Тема:</span> Деанонимизация пользователей на основе цифровых отпечатков браузера
                </TitleText>
                <DataWrapper>
                    {loading ? (
                        <CircularProgress />
                    ) : (
                        <>
                            <Alert severity={data?.type}>{data?.message}</Alert>
                            <AccordionItemsWrapper>
                                {data?.users.map((element, index) => (
                                    <Accordion>
                                        <AccordionSummary
                                            expandIcon={<ExpandMoreIcon />}
                                            aria-controls='panel1a-content'
                                        >
                                            <Typography>User {element._id || index + 1}</Typography>
                                        </AccordionSummary>
                                        <AccordionDetails>
                                            <UserDataText>
                                                {data &&
                                                    Object.keys(element).map((key) => {
                                                        let markField = false;
                                                        if (
                                                            data?.changedFields &&
                                                            data?.changedFields[element._id] &&
                                                            data?.changedFields[element._id][key]
                                                        ) {
                                                            markField = true;
                                                        }
                                                        if (key !== 'canvas_value') {
                                                            return (
                                                                <FieldWrapper isMark={markField}>
                                                                    <Typography>
                                                                        {`${key}: ${JSON.stringify(
                                                                            element[key],
                                                                            null,
                                                                            4,
                                                                        )}`}
                                                                    </Typography>
                                                                </FieldWrapper>
                                                            );
                                                        } else {
                                                            return (
                                                                <CanvasWrapper>
                                                                    <Typography>canvas_value: </Typography>
                                                                    <CanvasImage
                                                                        src={element.canvas_value.value}
                                                                        alt={'canvas fingerprint'}
                                                                    />
                                                                </CanvasWrapper>
                                                            );
                                                        }
                                                    })}
                                                {}
                                                {/* <Typography>
                                                    screen_size: {JSON.stringify(element.screen_size, null, 4)}
                                                </Typography>
                                                <Typography>
                                                    color_depth: {JSON.stringify(element.color_depth, null, 4)}
                                                </Typography>
                                                <Typography>
                                                    pixel_ratio: {JSON.stringify(element.pixel_ratio, null, 4)}
                                                </Typography>
                                                <Typography>
                                                    user_agent: {JSON.stringify(element.user_agent, null, 4)}
                                                </Typography>
                                                <Typography>
                                                    do_not_track_header:{' '}
                                                    {JSON.stringify(element.do_not_track_header, null, 4)}
                                                </Typography>
                                                <Typography>
                                                    cookies: {JSON.stringify(element.cookies, null, 4)}
                                                </Typography>
                                                <Typography>
                                                    plugins: {JSON.stringify(element.plugins, null, 4)}
                                                </Typography>
                                                <Typography>
                                                    timezone: {JSON.stringify(element.timezone, null, 4)}
                                                </Typography>
                                                <Typography>
                                                    date_format: {JSON.stringify(element.date_format, null, 4)}
                                                </Typography>
                                                <Typography>
                                                    languages: {JSON.stringify(element.languages, null, 4)}
                                                </Typography>
                                                <Typography>
                                                    platform: {JSON.stringify(element.platform, null, 4)}
                                                </Typography>
                                                <Typography>
                                                    hardware_concurrency:{' '}
                                                    {JSON.stringify(element.hardware_concurrency, null, 4)}
                                                </Typography>
                                                <Typography>
                                                    touch_compatibility:{' '}
                                                    {JSON.stringify(element.touch_compatibility, null, 4)}
                                                </Typography>
                                                <Typography>
                                                    canvas_value: {JSON.stringify(element.canvas_value, null, 4)}
                                                </Typography> */}
                                            </UserDataText>
                                        </AccordionDetails>
                                    </Accordion>
                                ))}
                            </AccordionItemsWrapper>
                        </>
                    )}
                </DataWrapper>
            </ContentWrapper>
        </AppContainer>
    );
};

export default App;
