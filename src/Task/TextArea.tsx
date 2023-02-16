import { createRef, ReactElement, RefObject, useEffect } from "react";

type TextAreaProp = {
    defaultValue: string,
    newDescription: string,
    setNewDescription: React.Dispatch<React.SetStateAction<string>>,
    onKeyUp(event: React.KeyboardEvent<HTMLTextAreaElement>): void
};

export function TextArea(props: TextAreaProp): ReactElement {
    const textAreaRef: RefObject<HTMLTextAreaElement> = createRef();

    useEffect(() => {
        if (textAreaRef.current !== null) {
            textAreaRef.current.style.height = "auto";
            textAreaRef.current.style.height = `${textAreaRef.current.scrollHeight}px`;
        }
    }, [textAreaRef])

    const handleTextAreaChange = (input: string): void => {
        props.setNewDescription(input);
    };

    return (
        <textarea 
            ref={textAreaRef}
            className="p-1 pl-2 w-full"
            defaultValue={props.defaultValue}
            onChange={(event) => handleTextAreaChange(event.target.value)}
            onKeyUp={props.onKeyUp}
        >
        </textarea>
    );
}

export type { TextAreaProp };