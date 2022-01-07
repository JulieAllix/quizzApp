import React from "react";
import { motion } from "framer-motion";

import "./TabsPager.scss";

interface Props {
    value: number;
}

export const TabsPager: React.FC<Props> = (props) => {

    return (
        <motion.div className={'Component_TabsPager'}>
            <motion.div
                className={'Component_TabsPager__pagerAnimatedContainer'}
                transition={{
                    tension: 190,
                    friction: 70,
                    mass: 0.4
                }}
                initial={false}
                animate={{ x: props.value * -100 + "%" }}
            >
                {React.Children.map(props.children, (child, i) => (
                    <div
                        className={'Component_TabsPager__page'}
                        key={i}
                        aria-hidden={props.value !== i}
                        tabIndex={props.value === i ? 0 : -1}
                    >
                        {child}
                    </div>
                ))}
            </motion.div>
        </motion.div>
    );
}
