import { forwardRef, useId, useImperativeHandle, useRef } from "react";
import Button from "../atom/Button";

interface DialogProps {
    title: string
    label?: string
    children: React.ReactNode
    handleOnClose?: () => void
}

export interface DialogCommand {
    openDialogFromOutside: () => void
    closeDialogFromOutside: () => void
}

const Dialog = forwardRef<DialogCommand, DialogProps>(({ title, label, children, handleOnClose }: DialogProps, ref) => {
    const dialogRef = useRef<HTMLDialogElement | null>(null)
    const dialogId = useId()
    const titleId = useId()

    useImperativeHandle(ref, () => ({
        openDialogFromOutside(): void {
            dialogRef.current?.showModal()
        },
        closeDialogFromOutside(): void {
            closeDialog()
        }
    }))

    const closeDialog = (): void => {
        if (handleOnClose !== undefined) {
            handleOnClose()
        }
        dialogRef.current?.close()
    }

    const onClickOutside = (event: React.MouseEvent<HTMLElement>): void => {
        if (dialogRef.current === event.target) {
            closeDialog()
        }
    }

    return (
        <dialog
            id={dialogId}
            aria-labelledby={label != null ? undefined : titleId}
            aria-modal='true'
            role='dialog'
            onClose={closeDialog}
            onClick={onClickOutside}
            ref={dialogRef}
        >
            <div>
                <h1 id={titleId}>{title}</h1>
                <Button 
                    title={'Close dialog'}
                    aria-controls={dialogId}
                    callback={closeDialog}
                    text="Close"
                    classNames={""} />
            </div>
            <div>{children}</div>

        </dialog>
    )
})

Dialog.displayName = 'Dialog'

export default Dialog