import { useUploadThing } from "@/hooks/useUploadThing";
import { cl } from "@/lib/utils/cl";
import { Loader2 } from "lucide-react";
import { useCallback, useState } from "react";
import { FileWithPath, useDropzone } from "react-dropzone";

const generateMimeTypes = (fileTypes: string[]) => {
    return fileTypes.map((type) => `${type}/*`);
};

const generateReactDropzoneAccept = (fileTypes: string[]) => {
    const mimeTypes = generateMimeTypes(fileTypes);
    return Object.fromEntries(mimeTypes.map((type) => [type, []]));
};

export const UploadComp = (props: {
    endpoint: string;
    onClientUploadComplete?: (
        res?: { fileUrl: string; fileKey: string }[]
    ) => void;
    onUploadError?: (error: Error) => void;
}) => {
    const { startUpload, isUploading, permittedFileInfo } =
        useUploadThing<string>({
            endpoint: props.endpoint as string,
            onClientUploadComplete: props.onClientUploadComplete,
            onUploadError: props.onUploadError,
        });

    const [files, setFiles] = useState<File[]>([]);
    const onDrop = useCallback((acceptedFiles: FileWithPath[]) => {
        setFiles(acceptedFiles);
    }, []);

    const { maxSize, fileTypes } = permittedFileInfo ?? {};

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: fileTypes ? generateReactDropzoneAccept(fileTypes) : undefined,
    });

    return (
        <div
            className={cl(
                "ut-mt-2 ut-flex ut-justify-center ut-rounded-lg ut-border ut-border-dashed ut-border-gray-900/25 ut-px-6 ut-py-10",
                isDragActive ? "ut-bg-blue-600/10" : ""
            )}
        >
            <div className="text-center" {...getRootProps()}>
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    className="ut-mx-auto ut-h-12 ut-w-12 ut-text-gray-400"
                >
                    <path
                        fill="currentColor"
                        fillRule="evenodd"
                        d="M5.5 17a4.5 4.5 0 0 1-1.44-8.765a4.5 4.5 0 0 1 8.302-3.046a3.5 3.5 0 0 1 4.504 4.272A4 4 0 0 1 15 17H5.5Zm3.75-2.75a.75.75 0 0 0 1.5 0V9.66l1.95 2.1a.75.75 0 1 0 1.1-1.02l-3.25-3.5a.75.75 0 0 0-1.1 0l-3.25 3.5a.75.75 0 1 0 1.1 1.02l1.95-2.1v4.59Z"
                        clipRule="evenodd"
                    ></path>
                </svg>
                <div className="ut-mt-4 ut-flex ut-text-sm ut-leading-6 ut-text-gray-600">
                    <label
                        htmlFor="file-upload"
                        className="ut-relative ut-cursor-pointer ut-font-semibold ut-text-blue-600 focus-within:ut-outline-none focus-within:ut-ring-2 focus-within:ut-ring-blue-600 focus-within:ut-ring-offset-2 hover:ut-text-blue-500"
                    >
                        {`Choose files`}
                        <input className="ut-sr-only" {...getInputProps()} />
                    </label>
                    <p className="ut-pl-1">{`or drag and drop`}</p>
                </div>
                <div className="ut-h-[1.25rem]">
                    {fileTypes && (
                        <p className="ut-text-xs ut-leading-5 ut-text-gray-600">
                            {`${fileTypes.join(", ")}`}{" "}
                            {maxSize && `up to ${maxSize}`}
                        </p>
                    )}
                </div>
                {files.length > 0 && (
                    <div className="ut-mt-4 ut-flex ut-items-center ut-justify-center">
                        <button
                            className="ut-bg-blue-600 ut-rounded-md ut-w-36 ut-h-10 ut-flex ut-items-center ut-justify-center"
                            onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();

                                startUpload(files);
                            }}
                        >
                            <span className="ut-px-3 ut-py-2 ut-text-white">
                                {isUploading ? (
                                    <Loader2 className="h-8 w-8 animate-spin" />
                                ) : (
                                    `Upload ${files.length} file${
                                        files.length === 1 ? "" : "s"
                                    }`
                                )}
                            </span>
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};
