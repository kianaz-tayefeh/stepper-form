import { z, ZodType } from "zod";
import { AcceptEnum, GENDER_OPTIONS, LanguageEnum } from "./options";

const phoneRegExp: RegExp =
  /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

type Gender = typeof GENDER_OPTIONS[number]["value"];
const Gender_Values: [Gender, ...Gender[]] = [
  GENDER_OPTIONS[0].value,
  ...GENDER_OPTIONS.slice(1).map((p) => p.value),
];

export const schema_step1 = z.object({
  name: z.string().min(4, { message: "Name cannot be less than 4 characters" }),
  email: z.string().email(),
  phone: z
    .string()
    .regex(phoneRegExp, { message: "The phone number is not correct" }),
  gender: z.enum(Gender_Values),
});
export const schema_step2 = z.object({
  birthdate: z.string(),
  address: z.string(),
  height: z
    .number()
    .gte(100, { message: "height cannot be less than 100 centimetres" })
    .lte(230, { message: "height cannot exceed 230 centimetres" }),
  weight: z
    .number()
    .gte(45, { message: "weight cannot be less than 45 kilograms" })
    .lte(250, { message: "weight cannot exceed 250 kilograms" }),
  languages: z.array(z.nativeEnum(LanguageEnum)),
});
export const schema_step3 = z.object({
  accept: z.nativeEnum(AcceptEnum),
});

export type UserType = z.infer<typeof schema_step1>;
export type UserDetailsType = z.infer<typeof schema_step2>;
export type ConfirmType = z.infer<typeof schema_step3>;
