export const AppRoutesUI = {
    Root: "/",
    HOME: () => AppRoutesUI.Root,
    RECORD: () => AppRoutesUI.Root + "record",
    LOGIN: () => AppRoutesUI.USER() + "/login",
    VALIDATE: () => AppRoutesUI.Root + "validate",
    ANNOTATE: () => AppRoutesUI.Root + "annotate",
    TEXT: () => AppRoutesUI.ADMIN() + "/sentences",
    USER_UPDATE: () => AppRoutesUI.USER() + "/update",
    REGISTRATION: () => AppRoutesUI.USER() + "/registration",
    USER_ACTIVITIES: () => AppRoutesUI.ADMIN() + "/user/activities",
    USER_RECORDINGS: () => AppRoutesUI.USER_ACTIVITIES() + "/recordings",

    // ///////
    UPLOAD_TEXT: () => AppRoutesUI.Root,
    USER: () => AppRoutesUI.Root + "user",
    ADMIN: () => AppRoutesUI.Root + "admin",
    SIGN_IN: () => AppRoutesUI.Root + "signin",
    UPLOAD_CRED: () => AppRoutesUI.ADMIN() + "/upload",
    COMPLETE: () => AppRoutesUI.ADMIN() + "/completed",
};
