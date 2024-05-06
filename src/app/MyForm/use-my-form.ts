import {useForm} from "react-hook-form";
import * as yup from "yup";
import {yupResolver} from "@hookform/resolvers/yup";

const nameSchema = yup.string().required('お名前を入力してください。')
const participantTypeSchema = yup.string().oneOf(["timeTraveler", "alien"]).required()
const yearSchema = yup.number().required().min(2025, "2025 年以降を入力してください。")
const planetNameSchema = yup.string().required().matches(/星|座/, "星か星座の名前を入力してください。")

const myFormSchema = yup.object().shape({
    name: nameSchema,
    participantType: participantTypeSchema,
    year: yup.number().when("participantType", {
        is: (val: string) => val === "timeTraveler",
        then: () => yearSchema,
        otherwise: (schema) => schema.notRequired(),
    }),
    planetName: yup.string().when("participantType", {
        is: (val: string) => val === "alien",
        then: () => planetNameSchema,
        otherwise: (schema) => schema.notRequired(),
    }),
})


// const myFormSchema = yup.object().shape({
//     name: yup.string().required('お名前を入力してください。'),
//     participantType: yup.string().oneOf(["timeTraveler", "alien"]).required(),
//     year: yup.number().when("participantType", {
//         is: (val: string) => val === "timeTraveler",
//         then: (schema) => schema.required().min(2025, "2025 年以降を入力してください。"),
//         otherwise: (schema) => schema.notRequired(),
//     }),
//     planetName: yup.string().when("participantType", {
//         is: (val: string) => val === "alien",
//         then: (schema) => schema.required().matches(/星|座/, "星か星座の名前を入力してください。"),
//         otherwise: (schema) => schema.notRequired(),
//     }),
// });
type MyFormType = yup.InferType<typeof myFormSchema>;

const useMyForm = () => {
    const form = useForm<MyFormType>(
        {
            resolver: yupResolver(myFormSchema),
            defaultValues: {
                name: "",
                participantType: "timeTraveler",
                year: 2025,
                planetName: ""
            }
        }
    );

    return form
}

export type {MyFormType}
export {useMyForm, myFormSchema}