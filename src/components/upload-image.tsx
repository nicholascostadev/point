import { cl } from "@/lib/utils/cl";
import { useEditingStoreProjectData } from "@/stores/editingStore";
import Image from "next/image";
import { useCallback, useEffect } from "react";
import { FileWithPath, useDropzone } from "react-dropzone";
import { toast } from "react-hot-toast";

const generateMimeTypes = (fileTypes: string[]) => {
    return fileTypes.map((type) => `${type}/*`);
};

const generateReactDropzoneAccept = (fileTypes: string[]) => {
    const mimeTypes = generateMimeTypes(fileTypes);
    return Object.fromEntries(mimeTypes.map((type) => [type, []]));
};

type UploadImageProps = {
    permittedFileInfo:
        | {
              slug: string;
              maxSize: string;
              fileTypes: string[];
          }
        | undefined;
    files: File[];
    setFiles: React.Dispatch<React.SetStateAction<File[]>>;
    preview: string | undefined;
    setPreview: React.Dispatch<React.SetStateAction<string | undefined>>;
};

export function UploadImage({
    permittedFileInfo,
    files,
    setFiles,
    preview,
    setPreview,
}: UploadImageProps) {
    const onDrop = useCallback(
        (acceptedFiles: FileWithPath[]) => {
            setFiles(acceptedFiles);
        },
        [setFiles]
    );

    const { maxSize, fileTypes } = permittedFileInfo ?? {};
    const { image } = useEditingStoreProjectData();

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: fileTypes ? generateReactDropzoneAccept(fileTypes) : undefined,
        maxFiles: 1,
        multiple: false,
        onDropRejected: () => {
            toast.error("File type is not accepted, only images are allowed");
        },
    });

    useEffect(() => {
        if (!files[0]) {
            if (image) {
                setPreview(image);
                return;
            }
            setPreview(undefined);
            return;
        }

        const objectUrl = URL.createObjectURL(files[0]);
        setPreview(objectUrl);

        // free memory when ever this component is unmounted
        return () => URL.revokeObjectURL(objectUrl);
    }, [files[0]]);

    console.log({ preview });

    return (
        <fieldset>
            <label htmlFor="file-upload">Upload an example image</label>
            <div
                className={cl(
                    "mt-2 flex flex-col items-center justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10",
                    isDragActive ? "bg-blue-600/10" : ""
                )}
            >
                {preview && (
                    <div className="relative h-72 w-full">
                        <Image
                            src={preview}
                            alt=""
                            fill
                            className="object-contain"
                        />
                    </div>
                )}
                {!preview && (
                    <div className="text-center" {...getRootProps()}>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                            className="mx-auto h-12 w-12 text-gray-400"
                        >
                            <path
                                fill="currentColor"
                                fillRule="evenodd"
                                d="M5.5 17a4.5 4.5 0 0 1-1.44-8.765a4.5 4.5 0 0 1 8.302-3.046a3.5 3.5 0 0 1 4.504 4.272A4 4 0 0 1 15 17H5.5Zm3.75-2.75a.75.75 0 0 0 1.5 0V9.66l1.95 2.1a.75.75 0 1 0 1.1-1.02l-3.25-3.5a.75.75 0 0 0-1.1 0l-3.25 3.5a.75.75 0 1 0 1.1 1.02l1.95-2.1v4.59Z"
                                clipRule="evenodd"
                            ></path>
                        </svg>
                        <div className="mt-4 flex text-sm leading-6 text-gray-600">
                            <label
                                htmlFor="file-upload"
                                className="relative cursor-pointer font-semibold text-blue-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-blue-600 focus-within:ring-offset-2 hover:text-blue-500"
                            >
                                {`Choose files`}
                                <input
                                    id="file-upload"
                                    className="sr-only"
                                    {...getInputProps()}
                                />
                            </label>
                            <p className="pl-1">{`or drag and drop`}</p>
                        </div>
                        <div className="h-[1.25rem]">
                            {fileTypes && (
                                <p className="text-xs leading-5 text-gray-600">
                                    {`${fileTypes.join(", ")}`}{" "}
                                    {maxSize && `up to ${maxSize}`}
                                </p>
                            )}
                        </div>
                    </div>
                )}
                {preview && (
                    <div {...getRootProps()}>
                        <label
                            htmlFor="file-upload"
                            className="relative cursor-pointer font-semibold text-blue-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-blue-600 focus-within:ring-offset-2 hover:text-blue-500"
                        >
                            {`Choose another file`}
                            <input
                                className="sr-only"
                                id="file-upload"
                                {...getInputProps()}
                            />
                        </label>
                    </div>
                )}
            </div>
        </fieldset>
    );
}
