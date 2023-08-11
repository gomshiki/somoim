export default function Layout(props){
    return(
        <div className="bg-white">
            <div className="flex flex-col items-center justify-center h-screen p-6">
                <div className='w-10/12 mx-auto md:w-96'>
                    {props.children}
                </div>
            </div>
        </div>
       
            
    )
}