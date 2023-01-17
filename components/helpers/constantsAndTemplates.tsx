import { ToastT } from "./types";

export const MIN_DATE = "2023-01-01T00:00";
export const BASE_DURATION_FORMAT = "00:00.000";
export const CURRENT_DATE = new Date().toLocaleString("sv-SE", {
    day: "numeric",
    year: "numeric",
    hour: "2-digit",
    month: "numeric",
    minute: "2-digit",
});

export const EXAMPLE_CODE = `// Example C++ Program
#include <iostream>

int main() {
    std::cout << "Hello World!";
    return 0;
}`;

export const ToastDV: ToastT = {
    duration: 5000,
    isClosable: true,
    variant: "solid",
    status: "warning",
    position: "top-right",
    containerStyle: {
        fontWeight: "500",
    },
    description: "An error has occurred, try again later!",
};

export const TableStateDV = {
    page: 1,
    limit: 30,
    search: "",
    to: CURRENT_DATE,
    from: CURRENT_DATE,
};

export const API_ENDPOINTS = (locale?: string, currentPath?: string): any => {
    const ROOT = process.env.NEXT_PUBLIC_BACKEND_URL ?? "/error";

    const USER = ROOT + "/v1/user";
    const OAUTH = ROOT + "/v1/oauth";
    const ADMIN = ROOT + "/v1/admin";
    const RECORDING = ROOT + "/v1/recording";
    const ANNOTATION = ROOT + "/v1/annotation";
    const VALIDATION = ROOT + "/v1/validation";

    return {
        root: ROOT,
        oauth: {
            base: OAUTH,
            session: OAUTH + "/session",
            login:
                OAUTH +
                `/login?language=${locale ?? ""}&url=${currentPath ?? ""}`,
        },
        admin: {
            base: ADMIN,
            texts: ADMIN + "/texts",
            summary: ADMIN + "/summary",
            recording: ADMIN + "/recording",
        },
        user: {
            base: USER,
            summary: USER + "/summary",
            logout: ROOT + "/v1/logout",
            is_auth: ROOT + "/v1/isAuth",
        },
        recording: {
            base: RECORDING,
            submit: RECORDING + "/submit",
        },
        annotation: {
            base: ANNOTATION,
            reset: ANNOTATION + "/reset",
            update: ANNOTATION + "/update",
            submit: ANNOTATION + "/submit",
        },
        validation: {
            base: VALIDATION,
            reset: VALIDATION + "/reset",
            update: VALIDATION + "/update",
            submit_metadata: VALIDATION + "/metadata",
            submit_annotation: VALIDATION + "/annotation",
        },
    };
};

export const IMG_URLS = (): any => {
    const ROOT = "/img";
    const NAVBAR = ROOT + "/navbar/";
    const OTHERS = ROOT + "/others/";
    const PEOPLE = ROOT + "/people/";
    const SECTIONS = ROOT + "/sections/";
    const FEATURES = ROOT + "/features/";
    const ORGANIZATIONS = ROOT + "/organizations/";

    return {
        features: {
            record: FEATURES + "record.png",
            annotate: FEATURES + "annotate.png",
            validate: FEATURES + "validate.png",
            activity: FEATURES + "activity.png",
            upload_text: FEATURES + "upload_text.png", // //
            pending_files: FEATURES + "pending_files.png", // //
            completed_files: FEATURES + "completed_files.png", // //
        },
        navbar: {
            title: NAVBAR + "title.png",
            languages: NAVBAR + "languages.png",
        },
        others: {
            edit: OTHERS + "edit.png",
            skip: OTHERS + "skip.png",
            admin: OTHERS + "admin.png", // //
            sign_in: OTHERS + "sign_in.png", // //
            record: OTHERS + "record.png",
            cancel: OTHERS + "cancel.png",
            publish: OTHERS + "publish.png",
            download: OTHERS + "download.png",
            rerecord: OTHERS + "rerecord.png",
            metadata: OTHERS + "metadata.png",
            analytics: OTHERS + "analytics.png",
            statistics: OTHERS + "statistics.png",
            stop_record: OTHERS + "stop_record.png",
            add_caption: OTHERS + "add_caption.png",
            telepromter: OTHERS + "telepromter.png",
            information: OTHERS + "information.png",
            switch_camera: OTHERS + "switch_camera.png",
        },
        sections: {
            people: SECTIONS + "people.png",
            organization: SECTIONS + "organization.png",
        },
        organizations: {
            du: ORGANIZATIONS + "du.svg",
            sust: ORGANIZATIONS + "sust.png",
            bracu: ORGANIZATIONS + "bracu.svg",
            bengali_ai: ORGANIZATIONS + "bengali_ai.jpg",
        },
        people: {
            tashfi: PEOPLE + "tashfi.jpg",
            dhruvo: PEOPLE + "dhruvo.jpg",
            sabbir_ahmed: PEOPLE + "sabbir_ahmed.jpg",
            asif_sushmit: PEOPLE + "asif_sushmit.jpg",
            sazia_mehnaz: PEOPLE + "sazia_mehnaz.jpg",
            manash_mandal: PEOPLE + "manash_mandal.jpg",
            sayma_sultana: PEOPLE + "sayma_sultana.jpg",
            farig_sadeque: PEOPLE + "farig_sadeque.jpg",
            rezwana_sultana: PEOPLE + "rezwana_sultana.png",
        },
    };
};
