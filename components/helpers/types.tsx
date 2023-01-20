import { ToastPosition } from "@chakra-ui/react";
import { IconType } from "react-icons";

export interface FilesT {
    id: string;
    url?: string;
    time: string;
    status?: string;
    team_name?: string;
    room_number?: number;
}
export interface ErrorT {
    help?: string;
    status?: number;
    message: string;
}

export interface AuthInfoT {
    role: number;
    username: string;
    team_name: string;
    room_number: string;
}

export interface TableStateT {
    page: number;
    limit: number;
    search: string;
}

export interface LanguageSummaryT {
    language: string;
    total_texts: number;
    total_topics: number;
    recorded_texts: number;
    recorded_topics: number;
    annotated_gloss: number;
    recorded_duration: number;
    validated_metadata: number;
    annotated_sentence: number;
    validated_gloss_annotation: number;
    validated_sentence_annotation: number;
}

interface DurationCount {
    count: number;
    duration: number;
}

export interface RecordedTextT {
    id: number;
    content: string;
    language: string;
    recorded_at: string;
    content_type: string;
}

export interface UserActivityT {
    email: string;
    username: string;
    total: DurationCount;
    recording: DurationCount;
    gloss_annotation: DurationCount;
    gloss_validation: DurationCount;
    sentence_annotation: DurationCount;
    metadata_validation: DurationCount;
    sentence_validation: DurationCount;
}

export interface AuthContextT {
    currentPath: string;
    authInfo: AuthInfoT | undefined;
    handleLogout: () => Promise<void>;
    setAuthInfo: (params: AuthInfoT) => void;
}

interface FixedAnnotationT {
    video_path: string;
    metadata: MetadataT;
    text_content: string;
    content_type: string;
    annotation_id: number;
    annotation: CaptionT[];
}

type AnnotationValidationT = FixedAnnotationT & {
    validation_id: number;
    validation_type: string;
};

export type OnlyAnnotationT = FixedAnnotationT & {
    annotation_type: string;
};

export type AnnotationT = OnlyAnnotationT | AnnotationValidationT;

export const isOnlyAnnotation = (data: any): data is OnlyAnnotationT => {
    return data?.annotation_type;
};

export interface TextT {
    text_id: number;
    text_content: string;
    content_type: string;
}

export type RequestT = "recording" | "validation" | "annotation";
export type StatusT = ErrorT | "loading" | "progress" | undefined;

export interface Time {
    h: number;
    m: number;
    s: number;
}

export interface TitleProps {
    mt?: number;
    title?: string;
    icon?: IconType;
}

export interface CaptionT {
    id: string;
    end: number;
    begin: number;
    text: string | null;
}

export interface FormFieldProps {
    name: string;
    type?: string;
    label: string;
    width?: object;
    placeholder: string;
    isRequired?: boolean;
}

export interface ToastT {
    status: string;
    variant: string;
    duration: number;
    description: string;
    isClosable: boolean;
    position: ToastPosition;
    containerStyle: {
        fontWeight: string;
    };
}

export interface MetadataT {
    view: string;
    end_at: number;
    duration: number;
    lighting: string;
    start_at: number;
    camera_distance: string;
    is_green_background: boolean;
}

export interface MetadataProps {
    metadata: MetadataT;
    setMetadata: (params: any) => void;
}

export interface ValidationT {
    video_path: string;
    metadata: MetadataT;
    content_type: string;
    text_content: string;
    validation_id: number;
    validation_type: string;
}

export interface UserInfoT {
    age: string;
    email: string;
    region: string;
    gender: string;
    username: string;
    photo_url: string;
    dialect_source: string;
    regional_dialect: string;
    socioeconomic_status: string;
}

export interface NavLinksT {
    imgUrl: any;
    href: string;
    title: string;
}

export interface PeopleT {
    name: string;
    photoUrl: string;
    profileUrl: string;
    description: string;
}
