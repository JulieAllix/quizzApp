import * as React from 'react';

import {ressourcesSVG} from "./PictogramCustom/index";
import './PictogramCustom.scss';

type ressourcesSVGType = typeof ressourcesSVG;

interface Props {
    name: ressourcesSVGType;
    width: string;
    margin?: string;
}

export const PictogramCustom: React.FC<Props> = (props) => {

    let SVG = (ressourcesSVG)[props.name];

    return (
        <div className={'Component_PictogramCustom'} style={props.margin ? {margin: `${props.margin}`, width: `${props.width}px`, height: `${props.width}px`} : {width: `${props.width}px`, height: `${props.width}px`}}>
            <SVG
                width={props.width}
                alt={`${props.name} icône`}
            />
        </div>
    );
};

