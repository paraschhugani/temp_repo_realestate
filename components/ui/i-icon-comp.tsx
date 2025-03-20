
export default function IIcon({text}: {text: string}){
    return (
        <div className="relative flex items-center group cursor-pointer">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16" 
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-gray-400 hover:text-gray-600 transition-colors"
        >
          <circle cx="12" cy="12" r="10"/>
          <path d="M12 16v-4"/>
          <path d="M12 8h.01"/>
        </svg>
        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-48 p-2 bg-gray-800 text-xs text-white rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
          {text}
        </div>
      </div>
    )
}