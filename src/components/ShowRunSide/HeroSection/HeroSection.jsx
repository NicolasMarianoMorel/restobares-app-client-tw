import React from "react";
import {
    HeroContainer,
    HeroBg,
    HeroContent,
    VideoBg,
    HeroH1,
  } from "./HeroSectionElements.js";
import video from '../../../videosAndImages/video.mp4';
function HeroSection() {
    

    return (
        <HeroContainer>
            <HeroBg>
                <VideoBg autoPlay loop muted src={video} type='video/mp4'/>
            </HeroBg>
            <HeroContent>
                <HeroH1>
                    Welcome to your <br/>Digital Menus App
                </HeroH1>
                {/* <HeroP>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt, velit cum quam, voluptate error sequi odio repellendus vero ut incidunt temporibus autem pariatur corporis! Maxime sit assumenda excepturi modi et?
                </HeroP> */}
            </HeroContent>
        </HeroContainer>            
    )
}

export default HeroSection;
