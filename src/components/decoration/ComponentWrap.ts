import styled from "styled-components";

type ComponentWrap = {
    width?: string
    height?: string
}

export const ComponentWrap = styled.div<ComponentWrap>`
  border-radius: 20px;
  background: #FFF;
  padding: 20px;
  width: 100%;
  max-width: ${props => props.width};
  height: ${props => props.height};
  display: flex;
  align-items: flex-start;
  flex-direction: column;
  gap: 12px;
`