interface Proptype{
    type:string,
    placeholder:string,
    className:string,
    onChange?:React.ChangeEventHandler

}

export function Input({type,placeholder,className}:Proptype){
    return<div className="pt-2 " >
        <input className="text-black p-2 w-full" placeholder={placeholder} />
    </div>
}