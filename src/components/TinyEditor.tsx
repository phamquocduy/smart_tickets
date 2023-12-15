import { useRef, useImperativeHandle, ForwardRefRenderFunction, forwardRef } from "react";
import { Editor } from "@tinymce/tinymce-react";

interface TinyEditorProps {
  initialValue?: string;
}

export interface TinyEditorMethods {
  getContent: () => void;
}

const TinyEditor: ForwardRefRenderFunction<TinyEditorMethods, TinyEditorProps> = (
  { initialValue }: TinyEditorProps,
  ref
) => {
  const editorRef = useRef(null);

  useImperativeHandle(ref, () => ({
    getContent: () => {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      return editorRef.current?.getContent();
    },
  }));

  return (
    <Editor
      apiKey="cu9g1kdn6iu37gkddi7b1wl9792eh1fqk88ehbbzci5fg4ge"
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      onInit={(evt, editor) => (editorRef.current = editor)}
      init={{
        height: 200,
        menubar: "edit view",
        toolbar: "blocks fontfamily fontsize bold italic underline strikethrough forecolor backcolor",
        resize: false,
      }}
      initialValue={initialValue}
    />
  );
};

const ForwardedTinyEditor = forwardRef<TinyEditorMethods, TinyEditorProps>(TinyEditor);
export default ForwardedTinyEditor;
