import styled from 'styled-components/macro';

export const AppContainer = styled.div`
    min-height: 100vh;
    margin: 0 auto;
    background-color: grey;
`;

export const ContentWrapper = styled.div`
    padding-top: 20px;
    width: 1180px;
    height: 100%;
    margin: 0 auto;
`;

export const TitleText = styled.div`
    font-size: 20px;
    color: white;
    font-weight: 600;
    letter-spacing: 1.2;
`;

export const UserDataText = styled.div`
    font-size: 16px;
    color: white;
    span {
        font-weight: 500;
    }
`;

export const DataWrapper = styled.div`
    margin-top: 15px;
`;
