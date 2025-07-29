import React from "react";

const coachingPrograms =[
    {
        id: 1,
        title:"Executive & Leadership Coaching",
        description:"Designed for current and aspiring leaders, this program focuses on enhancing leadership presence, strategic thinking, team management, decision-making, and fostering a high-performance culture",
    },
    {
        id:2,
        title:"Career & Professional Development Mentorship",
        description:"Ideal for individuals navigating career transitions, seeking advancement, or looking to develop specific professional skills. We provide guidance on goal setting, skill enhancement, networking, and strategic career planning.",

    },
    {
        id:3,
        title: "Personal Brand Coaching",
        description:"This program empowers you to articulate your unique value, craft a compelling narrative, and strategically build your authentic personal brand across various platforms, enhancing your visibility and influence."
    } 
    
]

const additionalPrograms = [
    {
        id:4,
        title:"Life & Personal Growth Coaching",
        description:"Focused on personal development, this program helps individuals set and achieve personal goals, improve self-awareness, and develop skills for better life balance and fulfillment.",
    }
    ,
    {
        id:5,
        title:"Team & Organizational Coaching",
        description:"Aimed at teams and organizations, this program enhances team dynamics, communication, and collaboration, fostering a culture of continuous improvement and high performance.",
    },
    {
        id:6,
        title:"Specialized Coaching",
        description:"Tailored programs for specific needs such as stress management, work-life balance, or conflict resolution, providing targeted strategies and support.",
    }
]

const workshopPrograms = {
    id:7,
    title:"Workshops & Group Coaching",
    description:"Interactive workshops and group coaching sessions that focus on specific skills or topics, providing a collaborative learning environment.",
}

export const Pathways = () => {
    return(
       <main className="flex flex-col items-center justify-center gap-[50px] p-10 relative pathways">
        <header className="flex-col h-[102px] items-center justify-center gap-3 self-stretch w-full flex relative header">
            <h1 className="relative self-stretch mt-[-1.00px] font-bold text-[#0d0c12] text-center text-2xl tracking-[0] leading-[normal]">
Tailored Pathways to Your Sucess
            </h1>
            <p className="relative w-[750px] font-normal text-[#0d0c12] text-center text-base tracking-[0] leading-[normal] text-base text-center tracking-[0] leading-[normal]">
                Whether you're seeking to sharpen leadership skills, navigate
career transitions, enhance personal impact, or refine your
professional brand, our programs are designed to meet you where you
are and guide you to where you want to be.

            </p>

        </header>
        <section className="flex coaching flex-col items-start gap-6 w-full self-stretch flex-[0_0_auto] relative">
            <div className=" article-grid">
                {coachingPrograms.map((program) => (
                    <article key={program.id} className="article">
                        <h2 className="font-bold text-[#0d0c12] text-lg tracking-[0] leading-[normal]">
                            {program.title}
                        </h2>
                        <p className="font-normal text-[#0d0c12] text-base tracking-[0] leading-[normal]">
                            {program.description}
                        </p>
                    </article>
                ))}

            </div>
            <div className="article-grid">
                {additionalPrograms.map((program) => (
                    <article key={program.id} className="article">
                        <h2 className="font-bold text-[#0d0c12] text-lg tracking-[0] leading-[normal]">
                            {program.title}
                        </h2>
                        <p className="font-normal text-[#0d0c12] text-base tracking-[0] leading-[normal]">
                            {program.description}
                        </p>
                    </article>
                ))}
                </div>

            <div className="article-grid">
                <article className="article">
                     <h2 className="font-bold text-[#0d0c12] text-lg tracking-[0] leading-[normal]">
                            {workshopPrograms.title}
                        </h2>
                        <p className="font-normal text-[#0d0c12] text-base tracking-[0] leading-[normal]">
                            {workshopPrograms.description}
                        </p>

                </article>

            </div>

        </section>

       </main> 
    )
}