import styled from 'styled-components';

export const PostInline = styled.div`
display: grid;
grid-template-columns: max-content max-content 1fr;
grid-template-rows: 1fr 1fr 1fr;
grid-gap: 10px;
align-items: center;
justify-items: start;
width: 100%;
max-width: 500px;
`;
