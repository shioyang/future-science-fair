'use client'
/** @jsxImportSource @emotion/react */

import {useMyForm} from "@/app/MyForm/use-my-form";
import {css} from "@emotion/react";

const MyForm = () => {
    const { register, handleSubmit, formState: {errors}, watch } = useMyForm();

    const participantType = watch("participantType");

    return (
        <form onSubmit={handleSubmit((data) => console.log(data))} css={styles.form}>
            <div css={styles.item}>
              <label>Name:</label>
              <div css={styles.input}>
                <input {...register("name")} />
                <div css={styles.error}>
                  {errors.name && <span>{errors.name.message}</span>}
                </div>
              </div>
            </div>

            <div css={styles.radioItem}>
              <label>Participant Type:</label>
                <div css={styles.input}>
                    <div css={styles.radioOption}>
                      <input type="radio" {...register("participantType")} id="participantType_timeTraveler" value="timeTraveler"/>
                      <label htmlFor="participantType_timeTraveler">Time Traveler</label>
                    </div>
                    <div css={styles.radioOption}>
                        <input type="radio" {...register("participantType")} id="participantType_alien" value="alien"/>
                        <label htmlFor="participantType_alien">Alien</label>
                    </div>
                    {/*<select {...register("participantType")}>*/}
                    {/*    <option value="timeTraveler">Time Traveler</option>*/}
                    {/*    <option value="alien">Alien</option>*/}
                    {/*</select>*/}
                </div>
            </div>

            {participantType === "timeTraveler" && (
                <div css={styles.item}>
                <label>Year:</label>
                <div css={styles.input}>
                  <input {...register("year")} />
                  <div css={styles.error}>
                  {errors.year && <span>{errors.year.message}</span>}
                  </div>
                </div>
              </div>
            )}

            {participantType === "alien" && (
              <div css={styles.item}>
                <label>Planet Name:</label>
                <div css={styles.input}>
                  <input {...register("planetName")} />
                  <div css={styles.error}>
                  {errors.planetName && <span>{errors.planetName.message}</span>}
                  </div>
                </div>
              </div>
            )}

            <button type="submit">Register</button>
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
    `,
    radioOption: css`
        display: flex;
        align-items: center;
    `,
    input: css`
        display: flex;
        flex-direction: column;
    `,
    error: css`
        color: red;
        height: 20px;
    `
}

export { MyForm}