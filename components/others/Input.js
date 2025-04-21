export default function Input({ defaultValue, labelColor, inputColor, type, label, name }) {
    return (
        <div className="mb-4">
            <label className={`text-${labelColor} block mb-1 font-semibold text-xl`} htmlFor={label}>{label}</label>
            <input
                className={`w-full py-2 px-3 rounded-lg outline-hidden border-2 text-xl border-gray-300 text-${inputColor}`}
                name={name}
                type={type}
                placeholder={label}
                defaultValue={defaultValue}
            />
        </div>
    )
}