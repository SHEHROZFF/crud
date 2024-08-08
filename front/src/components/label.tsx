type Props = {
    labelText : string;
    inputValue: string;
    myplaceholder: string;
}
export default function MyLabel( {labelText , inputValue, myplaceholder}: Props ) {

    
    return (
        <div className='flex items-center gap-x-0 h-7 w-full'>
            <label className='w-1/2 text-center bg-[#D8D8D8] py-2 text-gray-500 capitalize'>{labelText}</label>
            <input className='w-1/2 text-center py-2 focus:outline-none text-blue-500 font-medium' value={inputValue} type="text" placeholder={myplaceholder} />
        </div>
    )
}
