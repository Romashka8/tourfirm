import React, {ReactNode} from 'react';
import {ComponentWrap} from "../decoration/ComponentWrap";
import {ComponentTitle} from "../decoration/ComponentTitle";
import styled from "styled-components";
import {ProfileText} from "../../pages/admin/chapters/profile/Profile_Styles";

type FeaturesObject = {
    action: string
    icon: ReactNode
}
type FeaturesData = {
    features: FeaturesObject[]
}
export const iconStyle={marginRight: '10px', color: '#4318ff'}

export const Features: React.FC<FeaturesData> = ({features}) => {

    return (
        <ComponentWrap height={'32vh'}>
            <ComponentTitle>Overview of features</ComponentTitle>
            <ProfileText>You can use the functionality described below to change the data.</ProfileText>
            {features.map((el, index) => {
                return (
                    <FeatureItem key={index}>
                        {el.icon}{el.action}
                    </FeatureItem>
                )
            })}
        </ComponentWrap>
    );
};
const FeatureItem = styled.li`
  display: flex;
  align-items: center;
  text-align: left;
  color: #2B3674;
  font-weight: 500;
`
