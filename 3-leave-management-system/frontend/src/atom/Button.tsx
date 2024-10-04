type ButtonType = 'submit' | 'button'

interface ButtonProps {
    classNames: string
    title?: string
    callback?: (() => void) | (() => Promise<void>)
    text?: string
    type?: ButtonType
}

const Button: React.FC<ButtonProps> = ({ classNames, title, callback, text, type, ...rest }: ButtonProps) => {
    return (
        <button
            className={classNames}
            title={title}
            onClick={callback}
            type={type}
            {...rest}
        >
            {text}
        </button>
    )
}
 export default Button