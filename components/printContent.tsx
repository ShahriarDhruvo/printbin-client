import React from "react";
import dynamic from "next/dynamic";
const CodeEditor = dynamic(
    async () =>
        await import("@uiw/react-textarea-code-editor").then(
            (mod) => mod.default
        ),
    { ssr: false }
);

export const PrintContent = ({
    styles,
    content,
    setContent,
}: {
    styles?: object;
    content: string;
    setContent?: (params: string) => void;
}): JSX.Element => {
    return (
        <CodeEditor
            language="cpp"
            value={content}
            placeholder="Paste your code here"
            onChange={(evn) => {
                setContent?.(evn.target.value);
            }}
            style={
                styles !== undefined
                    ? styles
                    : {
                          fontSize: 17,
                          backgroundColor: "#f5f5f5",
                          fontFamily:
                              "ui-monospace, SFMono-Regular, SF Mono, Consolas, Liberation Mono, Menlo, monospace",
                      }
            }
        />
    );
};
