import {useForm} from "react-hook-form";
import * as yup from "yup";
import {yupResolver} from "@hookform/resolvers/yup";

const myFormSchema = yup.object().shape({
    name: yup.string().required('Name is required'),
    participantType: yup.string().oneOf(["timeTraveler", "alien"]).required(),
    year: yup.number().when("participantType", {
        is: (val: string) => val === "timeTraveler",
        then: (schema) => schema.required().min(2025, "Please enter a year 2025 or later"),
        otherwise: (schema) => schema.notRequired(),
    }),
    planetName: yup.string().when("participantType", {
        is: (val: string) => val === "alien",
        then: (schema) => schema.required(),
        otherwise: (schema) => schema.notRequired(),
    }),
});
type MyFormType = yup.InferType<typeof myFormSchema>;

const useMyForm = () => {
    const form = useForm<MyFormType>(
        {
            resolver: yupResolver(myFormSchema),
            defaultValues: {
                name: "",
                participantType: "timeTraveler",
                year: 2025,
                planetName: "star"
            }
        }
    );

    return {
        ...form,
    }
}

export { useMyForm}