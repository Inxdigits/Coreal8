import React from "react";
// import image from "./image.svg";
// import vector2 from "./vector-2.svg";
// import vector3 from "./vector-3.svg";
// import vector4 from "./vector-4.svg";
// import vector5 from "./vector-5.svg";
// import vector6 from "./vector-6.svg";

import course1 from '../../HomePage/Assets/first-course.png';
import course2 from '../../HomePage/Assets/second-course.png';
import course3 from '../../HomePage/Assets/third-course.png';

export const FeaturedCoursesSection = () => {
  const coursesData = [
    {
      id: 1,
      title: "The Visionary Leader's Blueprint",
      description:
        "Learn how to lead with clarity, courage, and conviction in today's dynamic world.",
      price: "N45,000",
      icon: course1,
    },
    {
      id: 2,
      title: "The Visionary Leader's Blueprint",
      description:
        "Learn how to lead with clarity, courage, and conviction in today's dynamic world.",
      price: "N45,000",
      icon: course2,
    },
    {
      id: 3,
      title: "The Visionary Leader's Blueprint",
      description:
        "Learn how to lead with clarity, courage, and conviction in today's dynamic world.",
      price: "N45,000",
      icon: course3,
    },
    {
      id: 4,
      title: "The Visionary Leader's Blueprint",
      description:
        "Learn how to lead with clarity, courage, and conviction in today's dynamic world.",
      price: "N45,000",
      icon: course1,
    },
    {
      id: 5,
      title: "The Visionary Leader's Blueprint",
      description:
        "Learn how to lead with clarity, courage, and conviction in today's dynamic world.",
      price: "N45,000",
      icon: course2,
    },
    {
      id: 6,
      title: "The Visionary Leader's Blueprint",
      description:
        "Learn how to lead with clarity, courage, and conviction in today's dynamic world.",
      price: "N45,000",
      icon: course3,
    },
  ];

  const CourseCard = ({ course }) => (
    <article className="inline-flex flex-col items-center gap-6 p-5 relative flex-[0_0_auto] bg-white rounded-[5px] overflow-hidden border-t [border-top-style:solid] shadow-[0px_10px_50px_#0000001a] border-[none] before:content-[''] before:absolute before:inset-0 before:p-px before:rounded-[5px] before:[background:linear-gradient(90deg,rgba(128,19,35,1)_0%,rgba(255,219,88,1)_100%)] before:[-webkit-mask:linear-gradient(#fff_0_0)_content-box,linear-gradient(#fff_0_0)] before:[-webkit-mask-composite:xor] before:[mask-composite:exclude] before:z-[1] before:pointer-events-none">
      <div
        className="relative w-[370px] h-[250px] rounded-[5px] bg-[linear-gradient(0deg,rgba(0,0,0,0.1)_0%,rgba(0,0,0,0.1)_100%)]"
        role="img"
        aria-label="Course thumbnail"
      />

      <div className="flex flex-col h-[84px] items-start justify-center gap-[13px] relative self-stretch w-full">
        <h3 className="relative w-fit mt-[-1.00px] [font-family:'Schibsted_Grotesk-Medium',Helvetica] font-medium text-[#0d0c12] text-xl text-center tracking-[0] leading-[normal]">
          {course.title}
        </h3>

        <p className="relative flex-1 self-stretch [font-family:'Schibsted_Grotesk-Regular',Helvetica] font-normal text-[#0d0c12] text-base tracking-[0] leading-[normal]">
          {course.description}
        </p>
      </div>

      <div className="flex items-center justify-between relative self-stretch w-full flex-[0_0_auto]">
        <div className="relative w-fit mt-[-1.00px] [font-family:'Open_Sans-Bold',Helvetica] font-bold text-[#0d0c12] text-2xl text-center tracking-[0] leading-[normal]">
          {course.price}
        </div>

        <button
          className="inline-flex items-center justify-center gap-2.5 relative flex-[0_0_auto] rounded-[5px] overflow-hidden bg-transparent border-none cursor-pointer"
          aria-label={`View ${course.title} course`}
        >
          <span className="relative w-fit mt-[-1.00px] [font-family:'Open_Sans-SemiBold',Helvetica] font-semibold text-[#801323] text-base tracking-[0] leading-[normal]">
            View Course
          </span>

          <div className="relative w-5 h-5">
            <img
              className="absolute w-[15px] h-[15px] top-0.5 left-0.5"
              alt=""
              src={course.icon}
            />
          </div>
        </button>
      </div>
    </article>
  );

  return (
    <section className="flex flex-col items-start gap-6 relative self-stretch w-full flex-[0_0_auto]">
      <h2 className="relative w-fit mt-[-1.00px] [font-family:'Montserrat-SemiBold',Helvetica] font-semibold text-[#0d0c12] text-xl tracking-[0] leading-[normal] whitespace-nowrap">
        Featured Courses
      </h2>

      <div className="flex items-start gap-6 relative self-stretch w-full flex-[0_0_auto]">
        {coursesData.slice(0, 3).map((course) => (
          <CourseCard key={course.id} course={course} />
        ))}
      </div>

      <div className="flex items-start gap-6 relative self-stretch w-full flex-[0_0_auto]">
        {coursesData.slice(3, 6).map((course) => (
          <CourseCard key={course.id} course={course} />
        ))}
      </div>
    </section>
  );
};
