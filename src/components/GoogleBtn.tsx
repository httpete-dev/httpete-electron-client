import { signIn } from "@/server/auth";
import { BitbucketIcon, GitHubIcon, GoogleIcon } from "./icons/bitbucket";
import { Button } from "./ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";
import { useState } from "react";
import Loading from "./Loading";



export const OAuthBtn = (props: { provider: string, text: string, icon: React.ReactNode, className?: string, disabled?: boolean, click: (provider: string) => void }, redirectingTxt?: string) => {
  const [isLoading, setLoading] = useState(false);

  return (
    <>
    { !isLoading 
    ? <>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            disabled={props.disabled}
            onClick={() => {
              if (props.disabled === true) {
                return;
              }
              setLoading(true);
              props.click(props.provider);
            }}
            className={("bg-white hover:bg-gray-600 text-white " + props.className)}
            >
            {props.icon}
            <span style={{ color: 'black' }} >{props.text}</span>
          </Button>
        </TooltipTrigger>
        {
          props.disabled && <TooltipContent
          side="right"
          align="center"
          style={{ maxWidth: '350px' }}
          >
        <h1 className='font-normal text-lg'>Coming soon!</h1>
      </TooltipContent>
      }
      </Tooltip>
        </>
      : <>
          <Loading text={redirectingTxt ?? "Redirecting..."} className="text-white border-2 p-2"/>
        </>}
      </>

  )
}

