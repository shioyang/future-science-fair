'use client'
/** @jsxImportSource @emotion/react */

import type {MyFormType} from "@/app/MyForm/use-my-form";
import {useMyForm} from "@/app/MyForm/use-my-form";
import {css} from "@emotion/react";
import {FieldErrors} from "react-hook-form";

const MyForm = () => {
    const {register, handleSubmit, formState: {errors}, watch} = useMyForm();

    const participantType = watch("participantType");

    const onSubmit = (data: MyFormType) => {
        console.log(data)
    }

    const onError = (errors: FieldErrors<MyFormType>) => {
        console.log('errors:', errors)
    }

    const debugMode: boolean = true

    return (
        <form onSubmit={handleSubmit(onSubmit, onError)} css={styles.form}>
            <div css={styles.item}>
                <label>お名前は？</label>
                <div css={styles.input}>
                    <input {...register("name")} />
                    <div css={styles.error}>
                        {errors.name && <span>{errors.name.message}</span>}
                    </div>
                </div>
            </div>

            <div css={styles.radioItem}>
                <label>参加者タイプ</label>
                <div css={styles.input}>
                    <div css={styles.radioOption}>
                        <input type="radio" {...register("participantType")} id="participantType_timeTraveler"
                               value="timeTraveler"/>
                        <label htmlFor="participantType_timeTraveler">時間旅行者 — Time Traveler</label>
                    </div>
                    <div css={styles.radioOption}>
                        <input type="radio" {...register("participantType")} id="participantType_alien" value="alien"/>
                        <label htmlFor="participantType_alien">エイリアン — Alien</label>
                    </div>
                    {/*<select {...register("participantType")}>*/}
                    {/*    <option value="timeTraveler">Time Traveler</option>*/}
                    {/*    <option value="alien">Alien</option>*/}
                    {/*</select>*/}
                </div>
            </div>

            {(participantType === "timeTraveler" || debugMode) && (
                <div css={styles.item}>
                    <label>西暦何年から来ましたか？</label>
                    <div css={styles.input}>
                        <input {...register("year")} />
                        <div css={styles.error}>
                            {errors.year && <span>{errors.year.message}</span>}
                        </div>
                    </div>
                </div>
            )}

            {(participantType === "alien" || debugMode) && (
                <div css={styles.item}>
                    <label>出身星の名前は？</label>
                    <div css={styles.input}>
                        <input {...register("planetName")} />
                        <div css={styles.error}>
                            {errors.planetName && <span>{errors.planetName.message}</span>}
                        </div>
                    </div>
                </div>
            )}

            <button type="submit" css={styles.button}>登録</button>
        </form>
    )
}

const styles = {
    form: css`
        display: flex;
        flex-direction: column;
        width: 300px;
    `,
    item: css`
        display: flex;
        flex-direction: column;
        justify-content: space-between;
    `,
    radioItem: css`
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        margin-bottom: 20px;
        margin-top: 10px;
    `,
    radioOption: css`
        display: flex;
        align-items: flex-start;
    `,
    input: css`
        display: flex;
        flex-direction: column;
    `,
    error: css`
        color: red;
        height: 20px;
        font-size: 12px;
    `,
    button: css`
        margin-top: 20px;
    `,
}

export {MyForm}