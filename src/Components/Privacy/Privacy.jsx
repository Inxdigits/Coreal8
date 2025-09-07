
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import "./Privacy.css"
import React, {useState} from "react"


const Privacy = () =>{
    const [activeSection, setActiveSection] = useState("Information We Collect")
    
    const navigationItems = [
        {id:1, title:"1. Information We Collect", isActive:true},
        {id:2, title:"2. How We Use Your Information", isActive:false},
        {id:3, title:"3. Sharing Your Information", isActive:false},
        {id:4, title:"4. Your Rights and Choices", isActive: false},
        {id:5, title:"5. Data Security"},
        {id:6, title:"6. Changes to this policy", isActive:false},
        {id:7, title:"7. Contact Us", isActive:false}
    ];

    const contentSections= {
        "1. Information We Collect": {
            title: "Information We Collect",
            content:`We collect information to provide and improve our Services to you. The types of personal information we may collect include:


            • Personal Identifiable Information (PII): This includes your name, email address, phone number, and mailing address when you register for a course, sign up for a newsletter, or contact us.              
            • Account Information: Your username, password, and other information related to your account.
            • Payment Information: If you make a purchase, we collect payment details such as credit card numbers and billing addresses. This information is processed by our secure third-party payment processors. We do not store your full payment card details on our servers.
            • Usage Data: Information about how you use our Services, such as pages visited, time spent on the site, courses enrolled in, and interactions with our content. Device and Log Information: Information your browser or device automatically sends, including your IP address, browser type, operating system, and unique device identifiers.
            • User-Generated Content: Any content you create and share on our platform, such as comments, feedback, or forum posts.`
        },
        "2. How We Use Your Information":{
            title:"How We Use Your Information",
            content:`We use your personal information for various purposes, including to:
             • Process your transactions and manage your course enrollments.•	Communicate with you about your account, course updates, and promotional offers (if you have opted in).
             • Personalize your experience and recommend relevant content.•	Analyze and improve our Services, including our website functionality and course content.
             • Comply with legal obligations and enforce our Terms of Service.
             • Ensure the security of our Services and prevent fraud.
             • Provide, operate, and maintain our Services
           
           `
        },
        "3. Sharing Your Information":{
            title:"Sharing Your Information",
            content: `We do not sell your personal information. We may share your information with third parties in the following limited circumstances:
            • Service Providers: We work with third-party service providers to assist us in operating our business. These providers may have access to your personal information to perform tasks on our behalf (e.g., payment processing, hosting, analytics).
            • Legal Requirements: We may disclose your information if required by law or in response to a valid legal request, such as a court order or subpoena.
            • Business Transfers: In the event of a merger, acquisition, or sale of assets, your personal information may be transferred as part of the transaction. We will notify you of any such change.
            • With Your Consent: We may share your information with other third parties when you have given us explicit consent to do so.
`
        },
        "4. Your Rights and Choices":{
            title:"Your Rights and Choices",
            content:`Depending on your location and applicable law, you may have the following rights regarding your personal information:
            • Access and Correction: You can request to access the personal information we hold about you and ask for any inaccuracies to be corrected.
            • Deletion: You can request the deletion of your personal information, subject to certain legal requirements.
            • Opt-Out: You can opt out of receiving promotional emails from us by following the unsubscribe link in the email. You may not opt out of essential service-related communications.
`
        }
        
    }
    const handleNavClick = (title) =>{
        setActiveSection(title);
    }
    return(
        <>
           <Navbar/>
           <div className="page-content">
                  <section className=" flex-col items-center justify-center p-20 relative bg-[#80132314] services-header">
        <header className=" relative [font-family: 'Montserrat-Bold', sans-serif] font-bold text-[#801323] text-[40px] text-center tracking-[0] leading-[normal] gap-3 flex flex-col">
          Privacy Policy

          <p className="last-updated">Last Updated: July 31st, 2025</p>

           <p>
        This Privacy Policy describes how Coreal8 Limited ("Coreal8," "we," "us," or "our") collects, uses, and shares your personal information when you use our website, services, courses, and other offerings (collectively, the "Services").
        </p>
        </header>
        </section>


        <section className="flex flex-row policy justify-center">

           <nav className="inline-flex flex-col items-start gap-[50px] rounded"
           role="navigation"
           aria-label="Privacy policy sections">
            <ul className="inline-flex flex-col items-start gap-2.5">
                {navigationItems.map((item)=>(
                    <li key={item.id}
                    className={`${item.id ===3 || item.id===6 || item.id ===7 ? "inline-flex" : "flex"}   items-center gap-2.5 relative w-full p-2.5  rounded-2xl border border-solid ${item.title === activeSection? "border-[#801323]" : "border-[#e5e5ea]"
                    }`}>
                        <buttton
                        onClick={()=> handleNavClick(item.title)}
                        className= {`tab relative w-fit text-[#0d0c12] `}
                        aria-current ={item.title === activeSection? "page" : undefined}
                        >
                            {item.title}

                        </buttton>

                    </li>
                ))}

            </ul>


           </nav>
           <section className="flex info flex-col items-start gap-4 relative rounded-2xl"
           aria-labelledby="content-heaading">
            <h2 id="content-heading" className="w-fit relative font-bold heading">
                {contentSections[activeSection]?.title || activeSection}
            </h2>

            <div className="relative self-stretch">
                {contentSections[activeSection]?.content.split("\n").map((paragraph, index)=>(
                    <p key={index} className={index>0 ? "mt-4" : ""}>
                        {paragraph}
                    </p>
                ))
                }

            </div>

           </section>
        </section>
        </div>
      
        <Footer/>
        
        </>
     
    )
}
export default Privacy;