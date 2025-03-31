export default function AlertMessage(props) {
    return (
        <div role="alert"
            class={`text-white p-4 mb-2 rounded w-lg text-xl
        ${props.type === "error" ? "bg-green-600" : "bg-red-600"}`}>
            {props.message}
        </div>
        
    );
}