import { enASL } from "./en_ASL";
import { bnBDSL } from "./bn_BDSL";
import { useRouter } from "next/router";

export const useTranslation = (): any => {
    const { locale } = useRouter();
    return locale === "en-ASL" ? enASL : bnBDSL;
};
