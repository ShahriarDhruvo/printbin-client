export const bnBDSL = {
    t: {
        // navbar
        admin: "Admin",
        name: "Printbin",
        record: "Record",
        sign_in: "Sign in",
        annotate: "Annotate",
        validate: "Validate",
        signing_in: "Signing in...",

        // home page
        title: "An open-source, sign language data crowdsourcing platform for AI enabled dialect-agnostic communication and domain study",
        home_description:
            "Even though most people now have better access to education because of technological advancements, 70 million people with hearing impairment still cannot use the majority of these tools. Our project aims to meet SDG goal 4 through minimizing this gap and ensuring inclusive and equitable quality education, thus promoting lifelong learning opportunities for all. Through our platform Bornil, we will enable creating video-based Sign Language dataset for all the 300+ low resource sign language dialects. This dataset will be used for Automated Sign Language Recognition (ASLR) for these dialects so that people using these dialects can communicate efficiently. Currently there are no standardized protocols for crowdsourcing sign language dataset construction, and data acquisition is highly expensive. To democratize the data collection process and expedite development of ASLR, we are offering this open source platform that will address multiple data collection process factors. We will consider explicit age and gender-based differentials as our platform will enable crowdsourcing of sign language recordings using readily available devices like phones and laptops, without the need of setting up recording studios. We will enable gathering data from a variety of sources, including the deaf community, hard of hearing persons, children of deaf parents, and siblings of deaf adults using an intuitive platform interface. To offer real-world representative data, voluntary data contributors will assist by adjusting camera resolution, background noise and other metadata. GDPR will be ensured throughout the process. Users will contribute to the datasets in three ways: by recording videos, validating recordings and metadata, and annotating videos. We will curate this data in such a way that artificial intelligence algorithms can be used for training ASLR systems. As a case study, we will use this platform for investigating statistical variety of the participants and regional variations in Bangladeshi Sign Language.",

        recording: "Recording",
        recording_description:
            "The recording section  provides users with an in-built video recorder. The users are given a text (one or more sentences or a topic) based on their selected language for which they will record a video in sign language. Users will also submit metadata related to the recordings.",

        annotation: "Annotation",
        annotation_description:
            "The annotation section is used for creating annotations for the recording. There are two types of supported annotations; sentence level and gloss level.",

        validation: "Validation",
        validation_description:
            "The validation section  is used for validating the recorded videos, their metadata and annotation. Metadata validation is similar to recording where a user watches the video to validate if the recording and the provided info is correct or not. As for annotation validation, users validate if the annotation matches the video. In both sections users are able to fix any errors.",

        people: "People",
        organizations: "Organizations",

        // user profile page
        edit: "Edit",
        signout: "Sign Out",

        select_language: "Select Language",

        signout_warning:
            "You will be signed out from this account and will be asked to authenticate by Google to sign back in!",

        // frequents
        help: "Help",
        cancel: "Cancel",
        reload: "Reload",
        seconds: "seconds",
        loading: "Loading...",
        uploading: "Uploading",
        confirm_again: "Yes, I confirm",
        redirecting_in: "Redirecting in",
        teleprompter_title: "Describe this",
        cancel_captions: "Cancel these captions",
        confirmation_body: "You sure want to do it?",
        error_generic: "Something went wrong! Please, try again later",

        // update profile & user registration
        Username: "Username",
        "Dialect Source": "Dialect Source",

        "Socioeconomic Status": "Socioeconomic Status",
        poor: "Poor",
        "Well Off": "Well Off",
        "Upper Middle Class": "Upper Middle Class",
        "Lower Middle Class": "Lower Middle Class",

        "Enter age": "Enter age",
        "Enter region": "Enter region",
        "Dialect Name": "Dialect Name",
        "Enter dialect": "Enter dialect",

        Age: "Age",
        Email: "Email",
        Region: "Region",
        "Regional Dialect": "Regional Dialect",

        Gender: "Gender",
        male: "male",
        other: "other",
        female: "female",

        Update: "Update",
        "Sign Up": "Sign Up",

        consent:
            "I consent to provide this website with my information and video",

        sign_up_title: "You are almost there...",
        update_profile_title: "Update profile details",
        sign_in_up_help:
            "Click G button from navbar to signup/signin from google first",

        // record page
        info: "Information",
        rerecord: "Rerecord",
        starting_in: "Starting in",
        wrapping_up: "Wrapping up...",
        recorder_title: "Press Record to Start recording",
        finish_recording_warning: "Finish recording within",
        minimum_duration_warning: "Recording must be of at least 1s",
        record_duration_warning_60s: "Recording must be finished within 60s",
        record_duration_warning_100s: "Recording must be finished within 100s",
        camera_error:
            "Unable to access your camera! Allow camera access from your browser's permission setting and then try again!",

        // metadata form
        Far: "Far",
        Side: "Side",
        Near: "Near",
        Front: "Front",
        Indoor: "Indoor",
        "End At": "End At",
        Lighting: "Lighting",
        Duration: "Duration",
        metadata: "Metadata",
        "Start At": "Start At",
        "Outdoor Day": "Outdoor Day",
        "Outdoor Night": "Outdoor Night",
        "Subject's View": "Subject's View",
        "Camera Distance": "Camera Distance",
        dialect_placeholder: "NGO/Parents/...",
        "Used Green Background": "Used Green Background",

        // validation page
        teleprompter_placeholder: "Write down what this video says...",

        // request forms
        request: "Request",
        request_video: "Request a video to annotate",
        request_content: "Request a content to record",
        request_validation: "Provide a validation type",

        "Gloss Level": "Gloss Level",
        "Sentence Level": "Sentence Level",
        annotation_type_question: "What level annotation do you want to do?",

        text: "Text",
        topic: "Topic",
        "Content Type": "Content Type",

        gloss: "Gloss",
        sentence: "Sentence",
        "Validation Type": "Validation Type",

        // annotation toolbox
        caption: "Caption",
        publish: "Publish",
        annotations: "Annotations",
        currentTime: "Current Time",
        publish_captions: "Publish captions",
        empty_annotation_error: "Empty annotation cannot be submitted!",
        publish_confirmation: "Do you really want to publish this annotation?",

        // Errors
        out_of_duration:
            "You cannot create a caption segment with a value greater than video duration",
        minimum_duration_diff:
            "You need at least half a second free to insert a new caption segment, adjust the timings of this segment or the segment after",
        startAt_greater_than_endAt_error:
            "Start time cannot be greater than or equals to end time",
        endAt_less_than_startAt_error:
            "End time cannot be less than or equals to start time",
        endAt_greater_than_duration_error:
            "End time cannot be greater than video duration",

        // record toolbox
        stop: "Stop",
        submit: "Submit",
        download: "Download",
        switch_camera: "Switch",
        start_recording: "Start",
        rerecord_confirmation: "You sure want to do it?",

        // caption box
        mark_noise: "Mark it as noise",
        add_caption_line: "Add caption line",
        write_caption: "Write the caption here...",
        delete_caption_line: "Remove caption line",
        update_by_current_time: "Update by current time",

        // others
        skip: "Skip",
        upload: "Upload",
        sentences: "Sentences",
        statistics: "Statistics",
        user_activities: "Activities",
        redirection_in: "Redirecting in ",
        empty_file: "Select a file first",
        your_activities: "Your Activities",
        sign_in_with_google: "Sign in with Google",
        auth_required_msg: "Sign in to access this content",
        skip_confirmation: "Do you really want to skip this sentence",
        csv_upload_warning:
            "Only a csv file under 10MB in size will be accepted",

        // ///////
        upload_text: "Upload Text",
    },
};
