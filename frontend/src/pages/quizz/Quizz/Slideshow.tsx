import React, { useState } from "react";
import {motion, AnimatePresence} from "framer-motion";

import {ButtonCustom} from "../../../components/ButtonCustom";

import {CardData} from "@Models/types/bases/Form";
import "./Slideshow.scss";

const variants = {
    enter: direction => ({
        x: direction > 0 ? -1000 : 1000,
        opacity: 0,
    }),
    center: {
        x: 0,
        opacity: 1,
    },
    exit: direction => ({
        x: direction > 0 ? 1000 : -1000,
        opacity: 0,
    }),
}

interface Props {
    cardsData: CardData[],
    quizzMode: "random" | "training" | null;
    setQuizzMode: (value: "random" | "training" | null) => void;
    handleSuccess: (value: number) => void;
    handleFailed: (value: number) => void;
}

export const Slideshow = (props: Props) => {
    const [[page, direction], setPage] = useState<number[]>([0, 0]);
    const [showTranslation, setShowTranslation] = useState<boolean>(false);

    const paginate = (direction) => {
        if (page + direction > props.cardsData.length -1) {
            props.setQuizzMode(null)
        } else if (page + direction === -1) {

        } else {
            setPage([ page + direction, direction ])
        }
    };

    return (
        <div className={'Component_Slideshow'}>
            <AnimatePresence custom={direction}>
                <motion.div
                    key={page}
                    custom={direction}
                    style={{
                        minHeight: "260px",
                        width: "100%",
                        boxShadow: "0px 0px 25px rgba(0, 0, 0, 0.1)",
                        background: "#FFFFFF",
                        borderRadius: "20px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        padding: "20px",
                        position: "absolute",
                        left: 0,
                    }}

                    variants={variants}
                    initial="enter"
                    animate="center"
                    exit="exit"

                    drag={"x"}
                    dragConstraints={{ left: 0, right: 0 }}
                    dragElastic={1}
                    onDragEnd={ (e, { offset, velocity }) => {
                        if (offset.x > 100) {
                            paginate(-1)
                        } else if (offset.x < -100) {
                            paginate(1)
                        }
                    }}
                >
                    <div className={showTranslation ? 'Component_Slideshow__cardContent Component_Slideshow__answer' : 'Component_Slideshow__cardContent'}>
                        {!showTranslation && props.cardsData[page]?.nativeLanguageValue}
                        {showTranslation && props.cardsData[page]?.languageToLearnValue}
                    </div>
                </motion.div>
            </AnimatePresence>
            {props.quizzMode === "random" ?
                <div className={'Component_Slideshow__buttonsWrapper'}>
                    <div className={'Component_Slideshow__buttonWrapper'}>
                        <ButtonCustom onClick={() => setShowTranslation(!showTranslation)}>{showTranslation ? "Question" : "Answer"}</ButtonCustom>
                    </div>
                    <div className={'Component_Slideshow__buttonWrapper'}>
                        <ButtonCustom onClick={() => props.handleFailed(page)}>Failed</ButtonCustom>
                    </div>
                </div>
                : props.quizzMode === "training" &&
                <div className={'Component_Slideshow__buttonsWrapper'}>
                    <div className={'Component_Slideshow__buttonWrapper'}>
                        <ButtonCustom onClick={() => setShowTranslation(!showTranslation)}>{showTranslation ? "Question" : "Answer"}</ButtonCustom>
                    </div>
                    <div className={'Component_Slideshow__buttonWrapper'}>
                        <ButtonCustom onClick={() => props.handleSuccess(page)}>Success</ButtonCustom>
                    </div>
                </div>
            }
        </div>
    )
};
