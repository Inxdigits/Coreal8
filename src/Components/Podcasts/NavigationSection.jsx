import React from "react";
import Image from "../../Assets/PodcastPageAssests/spotlight.png";
import arrow from "../../Assets/PodcastPageAssests/arrow.svg";
import play from "../../Assets/PodcastPageAssests/play.svg";
import Phone from "../../Assets/PodcastPageAssests/phone.png";
import longImage from "../../Assets/PodcastPageAssests/longImage.jpg";

export const NavigationSection = ()=>{
    const navigationItems = [
        {
            id:1,
            title: "Redefining Leadership in a Noisy World",
            subtitle: "A Deep Dive into Modern Leadership",
            description: "Nunc vulputate libero et velit interdum, ac aliquet odio mattis.",
            playIcon: play,
            arrowIcon: arrow,
            overlayOpacity: "rgba(0,0.0,0.2)",
            leftPosition: "left-[173px]",
        },
        {
            id:2,
            title: "From Survival to Strategy",
            subtitle: "A Journey of Personal Growth",
            description: "Nunc vulputate libero et velit interdum, ac aliquet odio mattis.",
            playIcon: play,
            arrowIcon: arrow,
            overlayOpacity: "rgba(0,0.0,0.2)",
            leftPosition: "left-[173px]",
        },
        {
            id:3,
            title: "How to Build a Legacy That Lives After You",
            subtitle: null,
            description: "Nunc vulputate libero et velit interdum, ac aliquet odio mattis.",
            playIcon: play,
            arrowIcon: arrow,
            overlayOpacity: "rgba(0,0.0,0.2)",
            leftPosition: "left-[173px]",
        },

    ];
    return(
        <section className="flex items-start gap-6 relative self-stretch w-full flex-[0_0_auto]"
        role="navigation"
        aria-label="Featured content navigation">
            {navigationItems.map((item) => (
                <article key={item.id} className="flex flex-col items-start gap-4 relative w-full flex-[0_0_auto]">
<div className="relative w-[410.67px] h-[450px] rounded-[5px] overflow-hidden"
style={{background: `linear-gradient(0deg, ${item.overlayOpacity} 0%, ${item.overlayOpacity} 100% )`}}
role="img"
aria-label={`Featured image for ${item.title}`}>
    <button className="absolute top-4 right-4 z-10">
        <div className="relative w-6 h-6">
            <img src={item.playIcon} alt="Play Icon" className="absolute w-5 h-5 top-px left-0.5" role="presentation" />
        </div>
        


    </button>
</div>
             <div className="flex flex-col items-start gap-4 relative self-stretch w-full flex-[0_0_auto]">
                {item.subtitle? (
                    <div className="flex flex-col items-start gap-2.5 relative self-stretch w-full">
                        <h3 className="relative self-stretch ">
                            {item.title}
                        </h3>
                        <div className="relative self-stretch">
                            {item.subtitle}
                        </div>
                    </div>
                ): (
                    <h3 className="relative self-stretch ">{item.title}</h3>
                )}
                <p className="relative self-stretch">
                    {item.description}</p>

             </div>
             <button className="relative w-6 h-6 rotate-90 hover:opacity-70 transition-opacity focus:outline-none focus:ring-[#0d0c12] focus:ring-opacity-50 rounded-sm"
             aria-label={`Navigate to ${item.title}`}
             type="button">
                <img className="w-6 h-3.5 -rotate-90 absolute left-0" alt="" src={item.arrowIcon} role="presentation"/>

             </button>
             
             
                </article>
            ))}

        </section>
    )
}