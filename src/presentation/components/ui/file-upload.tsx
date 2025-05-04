import React, { useEffect } from 'react';
import { FormikValues, useFormikContext } from 'formik';
import {
  AlertCircleIcon,
  FileArchiveIcon,
  FileIcon,
  FileSpreadsheetIcon,
  FileTextIcon,
  HeadphonesIcon,
  ImageIcon,
  Trash2Icon,
  UploadIcon,
  VideoIcon,
  XIcon,
} from 'lucide-react';
import { formatBytes, useFileUpload } from '@hooks';
import { Button } from '@components';

const getFileIcon = (file: { file: File | { type: string; name: string } }) => {
  const fileType = file.file instanceof File ? file.file.type : file.file.type;
  const fileName = file.file instanceof File ? file.file.name : file.file.name;

  const iconMap = {
    pdf: {
      icon: FileTextIcon,
      conditions: (type: string, name: string) =>
        type.includes('pdf') ||
        name.endsWith('.pdf') ||
        type.includes('word') ||
        name.endsWith('.doc') ||
        name.endsWith('.docx'),
    },
    archive: {
      icon: FileArchiveIcon,
      conditions: (type: string, name: string) =>
        type.includes('zip') ||
        type.includes('archive') ||
        name.endsWith('.zip') ||
        name.endsWith('.rar'),
    },
    excel: {
      icon: FileSpreadsheetIcon,
      conditions: (type: string, name: string) =>
        type.includes('excel') ||
        name.endsWith('.xls') ||
        name.endsWith('.xlsx'),
    },
    video: {
      icon: VideoIcon,
      conditions: (type: string) => type.includes('video/'),
    },
    audio: {
      icon: HeadphonesIcon,
      conditions: (type: string) => type.includes('audio/'),
    },
    image: {
      icon: ImageIcon,
      conditions: (type: string) => type.startsWith('image/'),
    },
  };

  for (const { icon: Icon, conditions } of Object.values(iconMap)) {
    if (conditions(fileType, fileName)) {
      return <Icon className="size-5 opacity-60" />;
    }
  }

  return <FileIcon className="size-5 opacity-60" />;
};

const getFilePreview = (file: {
  file: File | { type: string; name: string; url?: string };
}) => {
  const fileType = file.file instanceof File ? file.file.type : file.file.type;
  const fileName = file.file instanceof File ? file.file.name : file.file.name;

  const renderImage = (src: string) => (
    <img
      src={src}
      alt={fileName}
      className="size-full rounded-t-[inherit] object-cover"
    />
  );

  return (
    <div className="bg-accent flex aspect-square items-center justify-center overflow-hidden rounded-t-[inherit]">
      {fileType.startsWith('image/') ? (
        file.file instanceof File ? (
          (() => {
            const previewUrl = URL.createObjectURL(file.file);
            return renderImage(previewUrl);
          })()
        ) : file.file.url ? (
          renderImage(file.file.url)
        ) : (
          <ImageIcon className="size-5 opacity-60" />
        )
      ) : (
        getFileIcon(file)
      )}
    </div>
  );
};

type Props = {
  maxSizeMB?: number;
  maxFiles?: number;
  name?: string;
  initialFiles?: { file: File | { type: string; name: string } }[];
  accept?: string;
};

export const FileUpload: React.FC<Props> = ({
  maxFiles,
  maxSizeMB,
  name,
  accept,
}) => {
  const maxSize = (maxSizeMB ?? 5) * 1024 * 1024;
  const { setFieldValue } = useFormikContext<FormikValues>();
  const [
    { files, isDragging, errors },
    {
      handleDragEnter,
      handleDragLeave,
      handleDragOver,
      handleDrop,
      openFileDialog,
      removeFile,
      clearFiles,
      getInputProps,
    },
  ] = useFileUpload({
    multiple: (maxFiles ?? 1) > 1,
    maxFiles: maxFiles ?? 1,
    maxSize,
    accept: accept ?? '',
  });
  useEffect(() => {
    setFieldValue(name ?? 'files', files);
  }, [files, name, setFieldValue]);

  if ((maxFiles ?? 1) === 1) {
    const previewUrl = files[0]?.preview || null;

    return (
      <div className="flex flex-col gap-2">
        <div className="relative">
          <div
            onDragEnter={handleDragEnter}
            onDragLeave={handleDragLeave}
            onDragOver={handleDragOver}
            onDrop={handleDrop}
            data-dragging={isDragging || undefined}
            className="border-input data-[dragging=true]:bg-accent/50 has-[input:focus]:border-ring has-[input:focus]:ring-ring/50 relative flex min-h-52 flex-col items-center justify-center overflow-hidden rounded-xl border border-dashed p-4 transition-colors has-[input:focus]:ring-[3px]"
          >
            <input
              {...getInputProps()}
              className="sr-only"
              aria-label="Upload image file"
            />
            {previewUrl ? (
              <div className="absolute inset-0 flex items-center justify-center p-4">
                <img
                  src={previewUrl}
                  alt={files[0]?.file?.name || 'Uploaded image'}
                  className="mx-auto max-h-full rounded object-contain"
                />
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center px-4 py-3 text-center">
                <div
                  className="bg-background mb-2 flex size-11 shrink-0 items-center justify-center rounded-full border"
                  aria-hidden="true"
                >
                  <ImageIcon className="size-4 opacity-60" />
                </div>
                <p className="mb-1.5 text-sm font-medium">
                  Suelta tu imagen aquí
                </p>
                <p className="text-muted-foreground text-xs">
                  {` ${accept ? `(${accept === 'image/*' ? 'PNG, JPEG, WEBP' : 'File'})` : ''} (max. ${maxSizeMB}MB)`}
                </p>
                <Button
                  variant="outline"
                  className="mt-4"
                  type="button"
                  onClick={openFileDialog}
                >
                  <UploadIcon
                    className="-ms-1 size-4 opacity-60"
                    aria-hidden="true"
                  />
                  Select image
                </Button>
              </div>
            )}
          </div>
          {previewUrl && (
            <div className="absolute top-4 right-4">
              <button
                type="button"
                className="focus-visible:border-ring focus-visible:ring-ring/50 z-50 flex size-8 cursor-pointer items-center justify-center rounded-full bg-black/60 text-white transition-[color,box-shadow] outline-none hover:bg-black/80 focus-visible:ring-[3px]"
                onClick={() => removeFile(files[0]?.id)}
                aria-label="Remove image"
              >
                <XIcon className="size-4" aria-hidden="true" />
              </button>
            </div>
          )}
        </div>
        {errors.length > 0 && (
          <div
            className="text-destructive flex items-center gap-1 text-xs"
            role="alert"
          >
            <AlertCircleIcon className="size-3 shrink-0" />
            <span>{errors[0]}</span>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-2">
      {/* Drop area */}
      <div
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        data-dragging={isDragging || undefined}
        data-files={files.length > 0 || undefined}
        className="border-input data-[dragging=true]:bg-accent/50 has-[input:focus]:border-ring has-[input:focus]:ring-ring/50 relative flex min-h-52 flex-col items-center overflow-hidden rounded-xl border border-dashed p-4 transition-colors not-data-[files]:justify-center has-[input:focus]:ring-[3px]"
      >
        <input
          {...getInputProps()}
          className="sr-only"
          aria-label="Upload image file"
        />
        {files.length > 0 ? (
          <div className="flex w-full flex-col gap-3">
            <div className="flex items-center justify-between gap-2">
              <h3 className="truncate text-sm font-medium">
                Files ({files.length})
              </h3>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={openFileDialog}
                  type="button"
                >
                  <UploadIcon
                    className="-ms-0.5 size-3.5 opacity-60"
                    aria-hidden="true"
                  />
                  Add files
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={clearFiles}
                  type="button"
                >
                  <Trash2Icon
                    className="-ms-0.5 size-3.5 opacity-60"
                    aria-hidden="true"
                  />
                  Remove all
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
              {files.map((file) => (
                <div
                  key={file.id}
                  className="bg-background relative flex flex-col rounded-md border"
                >
                  {getFilePreview(file)}
                  <Button
                    onClick={() => removeFile(file.id)}
                    size="icon"
                    type="button"
                    className="border-background focus-visible:border-background absolute -top-2 -right-2 size-6 rounded-full border-2 shadow-none"
                    aria-label="Remove image"
                  >
                    <XIcon className="size-3.5" />
                  </Button>
                  <div className="flex min-w-0 flex-col gap-0.5 border-t p-3">
                    <p className="truncate text-[13px] font-medium">
                      {file.file.name}
                    </p>
                    <p className="text-muted-foreground truncate text-xs">
                      {formatBytes(file.file.size)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center px-4 py-3 text-center">
            <div
              className="bg-background mb-2 flex size-11 shrink-0 items-center justify-center rounded-full border"
              aria-hidden="true"
            >
              <ImageIcon className="size-4 opacity-60" />
            </div>
            <p className="mb-1.5 text-sm font-medium">Drop your files here</p>
            <p className="text-muted-foreground text-xs">
              Max {maxFiles} files ∙ Up to {maxSizeMB}MB
            </p>
            <Button
              variant="outline"
              className="mt-4"
              type="button"
              onClick={openFileDialog}
            >
              <UploadIcon className="-ms-1 opacity-60" aria-hidden="true" />
              Select images
            </Button>
          </div>
        )}
      </div>

      {errors.length > 0 && (
        <div
          className="text-destructive flex items-center gap-1 text-xs"
          role="alert"
        >
          <AlertCircleIcon className="size-3 shrink-0" />
          <span>{errors[0]}</span>
        </div>
      )}

      <p
        aria-live="polite"
        role="region"
        className="text-muted-foreground mt-2 text-center text-xs"
      >
        Mixed content w/ card ∙{' '}
        <a
          href="https://github.com/origin-space/originui/tree/main/docs/use-file-upload.md"
          className="hover:text-foreground underline"
        >
          API
        </a>
      </p>
    </div>
  );
};
