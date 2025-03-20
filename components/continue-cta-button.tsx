import { ArrowRight, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function ContinueCtaButton({text, onClick, disabled, isLoading,loadingText}: {text: string, onClick: () => void, disabled: boolean, isLoading?: boolean,loadingText?: string}){
    return (
        <Button onClick={onClick} disabled={disabled}
        className={`text-sm ${isLoading ? "bg-gray-300 hover:bg-gray-300 cursor-not-allowed" : "bg-black hover:bg-gray-800 cursor-pointer"} text-white rounded group transition-all duration-300 ease-in-out`} 
        >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
               {loadingText}
              </>
            ) : ( 
              <>
                 <span className="">{text}</span>
                <ArrowRight className="ml-2 h-4 w-4 transform transition-transform group-hover:translate-x-1" />
              </>
            )}
        </Button>
    )
}
