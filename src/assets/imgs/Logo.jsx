import { useHistory } from 'react-router-dom'

export function Logo() {
  const history = useHistory()
  return (
    <div 
      className="flex items-center cursor-pointer transition-all duration-300 ease-in-out mr-2.5 hover:opacity-90 select-none" 
      onClick={() => history.push(`/`)}
    >
      <div className="flex items-center justify-center text-[28px] font-bold text-[#0073b1] bg-white w-[42px] h-[42px] rounded-lg shadow-[0_4px_12px_rgba(0,0,0,0.1)] hover:shadow-[0_6px_16px_rgba(0,0,0,0.15)] transition-shadow md:text-[24px] md:w-[36px] md:h-[36px]">
        <span className="flex items-center justify-center">T</span>
      </div>
      {/* Uncomment below for full logo with text */}
      {/* <span className="text-[22px] font-bold ml-2.5 text-[#333] md:text-[18px]">TravelsIn</span> */}
    </div>
  )
}
