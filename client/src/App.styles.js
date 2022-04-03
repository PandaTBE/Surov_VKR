import styled from 'styled-components/macro';

export const AppContainer = styled.div`
    min-height: 100vh;
    margin: 0 auto;
    background-color: grey;
`;

export const ContentWrapper = styled.div`
    padding: 20px;
    width: 700px;
    height: 100%;
    margin: 0 auto;
    position: relative;
`;

export const TitleText = styled.div`
    font-size: 20px;
    color: white;
    font-weight: 600;
    letter-spacing: 1.2;
    margin-top: 10px;
    span {
        font-weight: 800;
    }
`;

export const UserDataText = styled.div`
    span {
        font-weight: 500;
    }
`;

export const DataWrapper = styled.div`
    margin-top: 15px;
`;

export const Canvas = styled.img`
    position: absolute;
    top: -111111110%;
    left: -11111111110%;
`;

export const AccordionItemsWrapper = styled.div`
    margin-top: 15px;
`;

export const CanvasWrapper = styled.div`
    display: flex;
`;

export const CanvasImage = styled.img`
    margin-left: 15px;
    width: 400px;
    height: auto;
`;

export const FieldWrapper = styled.div`
    background-color: ${(props) => (props.isMark ? 'red' : 'white')};
`;
