import { ForwardedRef, forwardRef, RefObject, useEffect, useRef } from "react"
import Dialog, { DialogCommand } from "../../../molecule/Dialog"
import Button from "../../../atom/Button"
import { useEmployeeCommands } from "../../../context/useEmployeeCommands"

export interface RegisterNewEmployeeDialogProps {
    title: string
}

export const RegisterNewEmployeeDialog = forwardRef<DialogCommand, RegisterNewEmployeeDialogProps>(({ title }: RegisterNewEmployeeDialogProps, ref: ForwardedRef<DialogCommand>) => {
    const inputFirstName = useRef<HTMLInputElement>(null)
    const inputLastName = useRef<HTMLInputElement>(null)
    const form = useRef<HTMLFormElement>(null)
    const { registerEmployee } = useEmployeeCommands()
    const closeDialog = (): void => {
        (ref as unknown as RefObject<DialogCommand>).current?.closeDialogFromOutside()
    }

    const onSubmitRegisterEmployeeForm = async (event: React.FormEvent<HTMLFormElement>): Promise<void> => {
        event.preventDefault();
        await registerEmployee((inputFirstName.current as HTMLInputElement).value, (inputLastName.current as HTMLInputElement).value);
        if (inputFirstName.current) {
            inputFirstName.current.value = '';
        }
        if (inputLastName.current) {
            inputLastName.current.value = '';
        }
        (inputLastName.current as HTMLInputElement).value = '';
        closeDialog();
    }

    useEffect(() => {
        form.current?.addEventListener('submit', async (e) => {
            e.preventDefault();
        })
    })

    return (
        <Dialog
            ref={ref}
            title={title}
        >
            <form
                id='employee-register-form'
                method='dialog'
                onSubmit={onSubmitRegisterEmployeeForm}
                aria-label={title}
                ref={form}
            >
                <div>
                    <label 
                        htmlFor="first-name-textbox"
                    >
                        Firstname
                    </label>
                    <input 
                        id="first-name-textbox"
                        type="text"
                        aria-required="true"
                        required={true}
                        ref={inputFirstName} />
                </div>
                <div>
                    <label 
                        htmlFor="last-name-textbox"
                    >
                        Lastname
                    </label>
                    <input 
                        id="last-name-textbox"
                        type="text"
                        aria-required="true"
                        required={true}
                        ref={inputLastName} />
                </div>
                <div>
                    <Button
                        title="Register"
                        text="Register"
                        type="submit"
                        classNames=""
                    />
                </div>
            </form>
        </Dialog>
    )
})
