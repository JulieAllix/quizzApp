import React, {useEffect, useRef, useState} from "react";
import { useMeasure } from "./use-measure";
import { motion } from "framer-motion";

import {FormTab} from "./TabsList/FormTab";
import {PictogramCustom} from "../components/PictogramCustom";
import {QuizzTab} from "./TabsList/QuizzTab";
import {SettingsTab} from "./TabsList/SettingsTab";
import {TabsPager} from "./TabsList/TabsPager";

import "./TabsList.scss";



interface Props {

}

export const TabsList: React.FC<Props> = (props) => {
    const [value, setValue] = useState<number>(0);

    const childRefs = useRef(new Map());
    const tabListRef = useRef(null);
    const { bounds, ref } = useMeasure();

    useEffect(() => {
        const target = childRefs.current.get(value);
        const container = tabListRef.current;
        if (target) {
            const cRect = container.getBoundingClientRect();

            // when container is `display: none`, width === 0.
            // ignore this case
            if (cRect.width === 0) {
                return;
            }
        }
    }, [value, bounds]);

    return (
        <div className={'Component_TabsList'}>

                <div className={'Component_TabsList__tabContainer'} ref={ref}>
                    <div className={'Component_TabsList__tabList'} ref={tabListRef}>
                        <motion.div
                            className={value === 0 ? 'Component_TabsList__tabItem Component_TabsList__tabItem__active': 'Component_TabsList__tabItem'}
                            whileHover={{ backgroundColor: "#f1f3f5" }}
                            transition={{ duration: 0.1 }}
                            whileTap={{ backgroundColor: "#e9ecef" }}
                            ref={el => childRefs.current.set(0, el)}
                            onClick={() => setValue(0)}
                        >
                            <div>Quizz</div>
                        </motion.div>
                        <motion.div
                            className={value === 1 ? 'Component_TabsList__tabItem Component_TabsList__tabItem__active': 'Component_TabsList__tabItem'}
                            whileHover={{ backgroundColor: "#f1f3f5" }}
                            transition={{ duration: 0.1 }}
                            whileTap={{ backgroundColor: "#e9ecef" }}
                            ref={el => childRefs.current.set(1, el)}
                            onClick={() => setValue(1)}
                        >
                            <PictogramCustom name={value === 1 ? 'AddPink' : 'AddGrey'} width={'55px'}/>
                        </motion.div>
                        <motion.div
                            className={value === 2 ? 'Component_TabsList__tabItem Component_TabsList__tabItem__active': 'Component_TabsList__tabItem'}
                            whileHover={{ backgroundColor: "#f1f3f5" }}
                            transition={{ duration: 0.1 }}
                            whileTap={{ backgroundColor: "#e9ecef" }}
                            ref={el => childRefs.current.set(2, el)}
                            onClick={() => setValue(2)}
                        >
                            <div>Settings</div>
                        </motion.div>
                    </div>
                </div>

            <TabsPager value={value}>
                <QuizzTab />
                <FormTab />
                <SettingsTab />
            </TabsPager>
        </div>
    );
}
